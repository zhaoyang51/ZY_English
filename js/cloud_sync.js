/**
 * Cloud Sync Module: Supabase Auth + Automatic Two-Way Cross-Device Sync
 * Uses ONLY the public Publishable Key protected by Supabase Row Level Security (RLS).
 */
(function() {
  const SUPABASE_URL = 'https://pwjxiygwoqvklnkuqvzn.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_tCA4qx0caaXzIqV_kFmaTQ_FTeB42VZ';
  const SESSION_KEY = 'KAOYAN_CLOUD_SESSION_V1';
  const SYNC_META_KEY = 'KAOYAN_CLOUD_SYNC_META_V1';
  const TABLE_NAME = 'user_sync_data';

  let syncState = {
    status: 'idle', // 'idle' | 'syncing' | 'synced' | 'error' | 'offline'
    lastSyncAt: 0,
    lastMessage: '',
    isApplyingRemote: false,
    pendingPushTimer: null,
    pendingOffline: false,
    lastPullAttemptAt: 0,
    activePromise: null
  };

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJson(key, val) {
    try {
      if (val === null || val === undefined) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  function loadMeta() {
    const meta = readJson(SYNC_META_KEY, {});
    if (meta && meta.lastSyncAt) syncState.lastSyncAt = Number(meta.lastSyncAt) || 0;
    return meta || {};
  }

  function saveMeta(patch) {
    const cur = Object.assign(loadMeta(), patch || {});
    writeJson(SYNC_META_KEY, cur);
  }

  function translateError(rawMsg, code) {
    const msg = String(rawMsg || '').toLowerCase();
    const c = String(code || '').toLowerCase();
    if (c === 'pgrst205' || msg.includes('could not find the table')) {
      return '云端数据库表 user_sync_data 尚未创建，请先在 Supabase SQL Editor 运行建表 SQL。';
    }
    if (msg.includes('invalid login credentials') || c === 'invalid_credentials') {
      return '邮箱或密码错误，请检查后重试（若尚未注册请切换「注册新账号」）。';
    }
    if (msg.includes('user already registered') || c === 'user_already_exists') {
      return '该邮箱已经注册过啦，请直接切换「账号登录」进行登录！';
    }
    if (msg.includes('email not confirmed') || c === 'email_not_confirmed') {
      return '该账号尚未完成邮箱验证（请在 Supabase Authentication → Providers → Email 中关闭 Confirm email）。';
    }
    if (msg.includes('password should be at least') || c === 'weak_password') {
      return '密码长度至少需要 6 位字符。';
    }
    if (msg.includes('unable to validate email') || msg.includes('invalid format')) {
      return '请输入有效的邮箱地址格式（如 name@example.com）。';
    }
    if (msg.includes('rate limit') || c === 'over_email_send_rate_limit') {
      return '操作过于频繁，请稍等一分钟再试。';
    }
    if (msg.includes('failed to fetch') || msg.includes('networkerror')) {
      return '网络连接失败，请检查网络后再试（离线背词进度已保存在本地）。';
    }
    return rawMsg || '请求失败，请稍后重试。';
  }

  async function apiFetch(path, options = {}) {
    const headers = Object.assign({
      'apikey': SUPABASE_KEY,
      'Content-Type': 'application/json'
    }, options.headers || {});

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 15000) : null;

    try {
      const resp = await fetch(`${SUPABASE_URL}${path}`, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller ? controller.signal : undefined
      });
      if (timer) clearTimeout(timer);
      const text = await resp.text();
      let data = null;
      try { data = text ? JSON.parse(text) : null; } catch (e) { data = { message: text }; }
      if (!resp.ok) {
        const errMsg = (data && (data.msg || data.error_description || data.message || data.error)) || `HTTP ${resp.status}`;
        const errCode = (data && (data.error_code || data.code)) || '';
        const err = new Error(translateError(errMsg, errCode));
        err.status = resp.status;
        err.code = errCode;
        throw err;
      }
      return data;
    } catch (err) {
      if (timer) clearTimeout(timer);
      if (err && err.name === 'AbortError') {
        throw new Error('云端连接超时，请检查网络状况后重试。');
      }
      if (err && err.status) throw err;
      throw new Error(translateError(err && err.message));
    }
  }

  function formatTime(ts) {
    if (!ts) return '尚未同步';
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${d.getMonth() + 1}/${d.getDate()} ${hh}:${mm}:${ss}`;
  }

  const CloudSyncModule = {
    getSession() {
      const sess = readJson(SESSION_KEY, null);
      if (!sess || !sess.access_token || !sess.user || !sess.user.id) return null;
      return sess;
    },

    saveSession(authPayload) {
      if (!authPayload || !authPayload.access_token || !authPayload.user) return null;
      const expiresIn = Number(authPayload.expires_in) || 3600;
      const session = {
        access_token: authPayload.access_token,
        refresh_token: authPayload.refresh_token || '',
        expires_at: Date.now() + expiresIn * 1000,
        user: {
          id: authPayload.user.id,
          email: authPayload.user.email || ''
        }
      };
      writeJson(SESSION_KEY, session);
      this.refreshUI();
      return session;
    },

    clearSession() {
      writeJson(SESSION_KEY, null);
      syncState.status = 'idle';
      syncState.lastMessage = '';
      this.refreshUI();
    },

    async ensureValidSession() {
      const sess = this.getSession();
      if (!sess) return null;
      if (Date.now() < (sess.expires_at - 60000)) {
        return sess;
      }
      if (!sess.refresh_token) {
        this.clearSession();
        return null;
      }
      try {
        const refreshed = await apiFetch('/auth/v1/token?grant_type=refresh_token', {
          method: 'POST',
          body: { refresh_token: sess.refresh_token }
        });
        return this.saveSession(refreshed);
      } catch (err) {
        if (err && (err.status === 400 || err.status === 401 || err.status === 403)) {
          this.clearSession();
        }
        return null;
      }
    },

    async signUp(email, password) {
      const cleanEmail = String(email || '').trim();
      if (!cleanEmail || !password || password.length < 6) {
        throw new Error('请输入有效邮箱，且密码至少 6 位字符。');
      }
      const data = await apiFetch('/auth/v1/signup', {
        method: 'POST',
        body: { email: cleanEmail, password }
      });
      if (!data || !data.access_token) {
        throw new Error('注册成功，请先到邮箱查收验证邮件后再登录（或在 Supabase 关闭 Confirm email 后重试）。');
      }
      this.saveSession(data);
      await this.syncNow({ reason: 'signup' });
      return data;
    },

    async signIn(email, password) {
      const cleanEmail = String(email || '').trim();
      if (!cleanEmail || !password) {
        throw new Error('请输入邮箱和密码。');
      }
      const data = await apiFetch('/auth/v1/token?grant_type=password', {
        method: 'POST',
        body: { email: cleanEmail, password }
      });
      this.saveSession(data);
      await this.syncNow({ reason: 'login' });
      return data;
    },

    async signOut() {
      const sess = this.getSession();
      if (sess && sess.access_token) {
        apiFetch('/auth/v1/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${sess.access_token}` }
        }).catch(() => {});
      }
      if (syncState.pendingPushTimer) {
        clearTimeout(syncState.pendingPushTimer);
        syncState.pendingPushTimer = null;
      }
      syncState.pendingOffline = false;
      this.clearSession();
    },

    buildLocalSnapshot() {
      const study = (window.VocabModule && typeof window.VocabModule.exportStudyProgress === 'function')
        ? window.VocabModule.exportStudyProgress({ includeVocabBook: true })
        : {};
      const appProgress = (window.StorageModule && typeof window.StorageModule.loadProgress === 'function')
        ? window.StorageModule.loadProgress()
        : null;

      return {
        vocab_book: Array.isArray(study.vocabBook) ? study.vocabBook : (window.StorageModule ? window.StorageModule.getVocabBook() : []),
        progress: study.progress || {},
        last_position: study.lastPosition || null,
        daily_log: study.dailyLog || null,
        user_notes: study.userNotes || {},
        settings: study.settings || null,
        app_progress: appProgress,
        updated_at: new Date().toISOString()
      };
    },

    applyCloudSnapshot(cloudRow, mode = 'merge') {
      if (!cloudRow || typeof cloudRow !== 'object') return false;
      syncState.isApplyingRemote = true;
      try {
        if (window.VocabModule && typeof window.VocabModule.importStudyProgress === 'function') {
          window.VocabModule.importStudyProgress({
            type: 'kaoyan_vocab_progress',
            version: 1,
            progress: cloudRow.progress || {},
            lastPosition: cloudRow.last_position || null,
            dailyLog: cloudRow.daily_log || null,
            userNotes: cloudRow.user_notes || {},
            settings: cloudRow.settings || null,
            vocabBook: Array.isArray(cloudRow.vocab_book) ? cloudRow.vocab_book : []
          }, { mode, includeVocabBook: true });
        } else if (window.StorageModule && Array.isArray(cloudRow.vocab_book)) {
          window.StorageModule.importVocabBookData(cloudRow.vocab_book, { mode });
        }

        if (cloudRow.app_progress && window.StorageModule && typeof window.StorageModule.saveProgress === 'function') {
          const curApp = window.StorageModule.loadProgress();
          if (mode === 'replace' || !curApp) {
            window.StorageModule.saveProgress(cloudRow.app_progress);
          }
        }

        if (typeof window.renderVocabBookModal === 'function') {
          const vbModal = document.getElementById('vocabBookModal');
          if (vbModal && vbModal.classList.contains('show')) {
            window.renderVocabBookModal();
          }
        }
        return true;
      } finally {
        syncState.isApplyingRemote = false;
      }
    },

    async fetchCloudRow(session) {
      const uid = encodeURIComponent(session.user.id);
      const rows = await apiFetch(`/rest/v1/${TABLE_NAME}?user_id=eq.${uid}&select=*`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    },

    async upsertCloudRow(session, snapshot) {
      const payload = Object.assign({ user_id: session.user.id }, snapshot);
      const res = await apiFetch(`/rest/v1/${TABLE_NAME}?on_conflict=user_id`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Prefer': 'resolution=merge-duplicates,return=representation'
        },
        body: payload
      });
      return Array.isArray(res) && res.length > 0 ? res[0] : payload;
    },

    async syncNow(options = {}) {
      if (syncState.activePromise) return syncState.activePromise;

      const run = async () => {
        if (typeof navigator !== 'undefined' && navigator.onLine === false) {
          syncState.status = 'offline';
          syncState.pendingOffline = true;
          syncState.lastMessage = '当前处于离线状态，已记录到本地，联网后自动同步。';
          this.refreshUI();
          return { ok: false, offline: true, message: syncState.lastMessage };
        }

        const session = await this.ensureValidSession();
        if (!session) {
          return { ok: false, unauthenticated: true, message: '尚未登录云同步账号。' };
        }

        syncState.status = 'syncing';
        syncState.lastMessage = '正在云端同步...';
        this.refreshUI();

        try {
          const reason = options.reason || 'manual';
          const overwriteFromCloud = options.overwriteFromCloud === true;

          // 1. Fetch cloud record
          const cloudRow = await this.fetchCloudRow(session);

          if (overwriteFromCloud) {
            if (!cloudRow) {
              throw new Error('云端暂无备份记录，无法覆盖本机。');
            }
            this.applyCloudSnapshot(cloudRow, 'replace');
            syncState.status = 'synced';
            syncState.lastSyncAt = Date.now();
            syncState.lastMessage = '已用云端记录恢复本机数据';
            saveMeta({ lastSyncAt: syncState.lastSyncAt });
            this.refreshUI();
            return { ok: true, action: 'restored_from_cloud' };
          }

          if (cloudRow && reason !== 'autoPushOnly') {
            // Pull & smart-merge cloud into local first, preserving both devices' newest progress
            this.applyCloudSnapshot(cloudRow, 'merge');
          }

          // 2. Push local (or newly merged) snapshot up to cloud if needed
          const mergedSnapshot = this.buildLocalSnapshot();
          const hasAnyLocalData =
            (mergedSnapshot.vocab_book && mergedSnapshot.vocab_book.length > 0) ||
            (mergedSnapshot.progress && Object.keys(mergedSnapshot.progress).length > 0) ||
            (mergedSnapshot.user_notes && Object.keys(mergedSnapshot.user_notes).length > 0) ||
            !!mergedSnapshot.last_position;

          if (!cloudRow || reason === 'push' || reason === 'autoPushOnly' || reason === 'login' || reason === 'manual' || hasAnyLocalData) {
            // Avoid pushing completely empty initial device over non-empty cloud if merge already synced
            const shouldPush = !cloudRow
              ? hasAnyLocalData
              : (reason === 'push' || reason === 'autoPushOnly' || JSON.stringify(mergedSnapshot.progress) !== JSON.stringify(cloudRow.progress || {}) || JSON.stringify(mergedSnapshot.vocab_book) !== JSON.stringify(cloudRow.vocab_book || []) || JSON.stringify(mergedSnapshot.user_notes) !== JSON.stringify(cloudRow.user_notes || {}) || JSON.stringify(mergedSnapshot.daily_log) !== JSON.stringify(cloudRow.daily_log || null));

            if (shouldPush) {
              await this.upsertCloudRow(session, mergedSnapshot);
            }
          }

          syncState.status = 'synced';
          syncState.lastSyncAt = Date.now();
          syncState.pendingOffline = false;
          syncState.lastMessage = `已同步 (${formatTime(syncState.lastSyncAt)})`;
          saveMeta({ lastSyncAt: syncState.lastSyncAt });
          this.refreshUI();
          return { ok: true };
        } catch (err) {
          syncState.status = 'error';
          syncState.lastMessage = err && err.message ? err.message : '同步失败，请稍后重试。';
          this.refreshUI();
          return { ok: false, message: syncState.lastMessage };
        }
      };

      syncState.activePromise = run().finally(() => {
        syncState.activePromise = null;
      });
      return syncState.activePromise;
    },

    scheduleAutoPush(reason = 'change') {
      if (syncState.isApplyingRemote) return;
      if (!this.getSession()) return;

      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        syncState.pendingOffline = true;
        syncState.status = 'offline';
        this.refreshUI();
        return;
      }

      if (syncState.pendingPushTimer) {
        clearTimeout(syncState.pendingPushTimer);
      }
      syncState.pendingPushTimer = setTimeout(() => {
        syncState.pendingPushTimer = null;
        this.syncNow({ reason: 'push' });
      }, 2500);
    },

    ensureModal() {
      let overlay = document.getElementById('cloudSyncAccountModal');
      if (overlay) return overlay;

      overlay = document.createElement('div');
      overlay.id = 'cloudSyncAccountModal';
      overlay.className = 'modal-overlay';
      overlay.style.zIndex = '360';
      overlay.innerHTML = `
        <div class="modal-dialog" style="width:440px;max-width:94vw;display:flex;flex-direction:column">
          <div class="modal-header" style="padding:14px 20px">
            <span style="font-weight:800;font-size:1.08em;color:var(--mode-color,#047857)">☁️ 账号自动云同步中心</span>
            <button type="button" class="toolbar-btn" id="cloudSyncCloseBtn" style="padding:4px 10px">✕ 关闭</button>
          </div>
          <div class="modal-body" style="padding:18px 20px;display:flex;flex-direction:column;gap:14px">
            <!-- Logged Out Form -->
            <div id="cloudAuthFormPanel" style="display:flex;flex-direction:column;gap:12px">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <button type="button" class="btn active" id="cloudTabLogin" style="padding:8px;font-weight:700">🔑 账号登录</button>
                <button type="button" class="btn" id="cloudTabSignup" style="padding:8px;font-weight:700">✨ 注册新账号</button>
              </div>
              <p id="cloudAuthHint" style="margin:0;font-size:12.5px;line-height:1.55;color:var(--muted,#64748b)">
                同一邮箱账号在电脑和手机登录后，<strong>生词本、背诵记忆曲线与助记笔记</strong>将全自动云端双向同步。
              </p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <input type="email" id="cloudEmailInput" placeholder="输入邮箱（如 yourname@qq.com）" autocomplete="email" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid var(--border,rgba(0,0,0,0.18));font-size:14px;background:var(--bg,#fff);color:var(--ink,#1e293b)">
                <input type="password" id="cloudPasswordInput" placeholder="输入密码（至少 6 位）" autocomplete="current-password" style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:10px;border:1px solid var(--border,rgba(0,0,0,0.18));font-size:14px;background:var(--bg,#fff);color:var(--ink,#1e293b)">
              </div>
              <button type="button" class="btn" id="cloudAuthSubmitBtn" style="background:var(--primary,#047857);color:#fff;font-weight:700;padding:10px 16px;font-size:14.5px">登录并立即云同步</button>
            </div>

            <!-- Logged In Status Panel -->
            <div id="cloudAccountPanel" style="display:none;flex-direction:column;gap:12px">
              <div style="padding:12px 14px;border-radius:12px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);display:flex;flex-direction:column;gap:6px">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
                  <span style="font-weight:800;color:#047857;font-size:14px" id="cloudAccountEmail">-</span>
                  <span id="cloudAccountBadge" style="font-size:12px;font-weight:700;padding:2px 8px;border-radius:999px;background:#047857;color:#fff">自动同步开启</span>
                </div>
                <div style="font-size:12.5px;color:var(--muted,#64748b)" id="cloudLastSyncText">上次同步：尚未同步</div>
                <div style="font-size:12.5px;color:var(--ink,#334155)" id="cloudDataStatsText"></div>
              </div>

              <button type="button" class="btn" id="cloudBtnManualSync" style="background:var(--primary,#047857);color:#fff;font-weight:700;padding:10px 16px">🔄 立即双向同步</button>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                <button type="button" class="btn" id="cloudBtnOverwriteLocal" style="border:1px solid var(--border,rgba(0,0,0,0.16));font-size:12.5px;padding:8px">⬇️ 云端覆盖本机</button>
                <button type="button" class="btn" id="cloudBtnLogout" style="border:1px solid rgba(239,68,68,0.35);color:#dc2626;font-size:12.5px;padding:8px">🚪 退出当前账号</button>
              </div>
            </div>

            <div id="cloudModalFeedback" style="display:none;padding:9px 12px;border-radius:8px;font-size:12.5px;font-weight:600;line-height:1.45"></div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      this.bindModalEvents(overlay);
      return overlay;
    },

    bindModalEvents(overlay) {
      let authMode = 'login'; // 'login' | 'signup'

      const close = () => this.closeModal();
      overlay.querySelector('#cloudSyncCloseBtn').onclick = close;
      overlay.addEventListener('click', e => {
        if (e.target === overlay) close();
      });

      const tabLogin = overlay.querySelector('#cloudTabLogin');
      const tabSignup = overlay.querySelector('#cloudTabSignup');
      const submitBtn = overlay.querySelector('#cloudAuthSubmitBtn');
      const passInput = overlay.querySelector('#cloudPasswordInput');

      const updateAuthTab = () => {
        tabLogin.classList.toggle('active', authMode === 'login');
        tabSignup.classList.toggle('active', authMode === 'signup');
        submitBtn.textContent = authMode === 'login' ? '🔑 登录并立即云同步' : '✨ 注册账号并立即启用同步';
        passInput.setAttribute('autocomplete', authMode === 'login' ? 'current-password' : 'new-password');
      };

      tabLogin.onclick = () => { authMode = 'login'; updateAuthTab(); this.hideModalFeedback(); };
      tabSignup.onclick = () => { authMode = 'signup'; updateAuthTab(); this.hideModalFeedback(); };

      const handleSubmit = async () => {
        const email = overlay.querySelector('#cloudEmailInput').value.trim();
        const password = passInput.value;
        submitBtn.disabled = true;
        const prevText = submitBtn.textContent;
        submitBtn.textContent = authMode === 'login' ? '正在登录...' : '正在注册...';
        this.hideModalFeedback();
        try {
          if (authMode === 'login') {
            await this.signIn(email, password);
            this.showModalFeedback('✅ 登录成功！已开启自动双向同步，数据已保持最新。', 'success');
          } else {
            await this.signUp(email, password);
            this.showModalFeedback('✅ 注册并登录成功！已将当前数据自动备份到云端。', 'success');
          }
          passInput.value = '';
          this.refreshModalContent();
        } catch (err) {
          this.showModalFeedback(err && err.message ? err.message : '操作失败，请重试。', 'error');
        } finally {
          submitBtn.disabled = false;
          if (!this.getSession()) submitBtn.textContent = prevText;
        }
      };

      submitBtn.onclick = handleSubmit;
      passInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleSubmit();
      });

      overlay.querySelector('#cloudBtnManualSync').onclick = async () => {
        const btn = overlay.querySelector('#cloudBtnManualSync');
        btn.disabled = true;
        btn.textContent = '🔄 正在双向同步...';
        const res = await this.syncNow({ reason: 'manual' });
        btn.disabled = false;
        btn.textContent = '🔄 立即双向同步';
        this.refreshModalContent();
        if (res.ok) {
          this.showModalFeedback('✅ 双向同步完成！本地与云端已合并为最新数据。', 'success');
        } else {
          this.showModalFeedback(res.message || '同步失败', 'error');
        }
      };

      overlay.querySelector('#cloudBtnOverwriteLocal').onclick = async () => {
        if (!confirm('确定要用云端数据完全覆盖当前设备的本地记录吗？')) return;
        const res = await this.syncNow({ reason: 'manual', overwriteFromCloud: true });
        this.refreshModalContent();
        if (res.ok) {
          this.showModalFeedback('✅ 已用云端备份完全恢复当前设备数据！', 'success');
        } else {
          this.showModalFeedback(res.message || '恢复失败', 'error');
        }
      };

      overlay.querySelector('#cloudBtnLogout').onclick = async () => {
        await this.signOut();
        this.refreshModalContent();
        this.showModalFeedback('已退出云同步账号（本地背词记录仍保留在本机）。', 'info');
      };
    },

    showModalFeedback(msg, tone = 'info') {
      const overlay = document.getElementById('cloudSyncAccountModal');
      if (!overlay) return;
      const fb = overlay.querySelector('#cloudModalFeedback');
      if (!fb) return;
      fb.style.display = 'block';
      fb.textContent = msg;
      if (tone === 'success') {
        fb.style.background = 'rgba(16,185,129,0.12)';
        fb.style.color = '#047857';
        fb.style.border = '1px solid rgba(16,185,129,0.3)';
      } else if (tone === 'error') {
        fb.style.background = 'rgba(239,68,68,0.1)';
        fb.style.color = '#b91c1c';
        fb.style.border = '1px solid rgba(239,68,68,0.3)';
      } else {
        fb.style.background = 'rgba(59,130,246,0.1)';
        fb.style.color = '#1d4ed8';
        fb.style.border = '1px solid rgba(59,130,246,0.25)';
      }
    },

    hideModalFeedback() {
      const fb = document.getElementById('cloudModalFeedback');
      if (fb) fb.style.display = 'none';
    },

    refreshModalContent() {
      const overlay = document.getElementById('cloudSyncAccountModal');
      if (!overlay) return;
      const sess = this.getSession();
      const formPanel = overlay.querySelector('#cloudAuthFormPanel');
      const accPanel = overlay.querySelector('#cloudAccountPanel');

      if (sess) {
        formPanel.style.display = 'none';
        accPanel.style.display = 'flex';
        overlay.querySelector('#cloudAccountEmail').textContent = `👤 ${sess.user.email}`;
        overlay.querySelector('#cloudLastSyncText').textContent = `上次同步：${formatTime(syncState.lastSyncAt)}${syncState.status === 'error' ? `（⚠️ ${syncState.lastMessage}）` : ''}`;
        const snap = this.buildLocalSnapshot();
        const progCount = Object.keys(snap.progress || {}).length;
        const bookCount = (snap.vocab_book || []).length;
        const notesCount = Object.keys(snap.user_notes || {}).length;
        overlay.querySelector('#cloudDataStatsText').textContent = `本地/云端融合数据：已背 ${progCount} 词 · 生词本 ${bookCount} 词 · 助记笔记 ${notesCount} 条`;
      } else {
        formPanel.style.display = 'flex';
        accPanel.style.display = 'none';
      }
    },

    openModal() {
      const overlay = this.ensureModal();
      this.hideModalFeedback();
      this.refreshModalContent();
      overlay.classList.add('show');
    },

    closeModal() {
      const overlay = document.getElementById('cloudSyncAccountModal');
      if (overlay) overlay.classList.remove('show');
    },

    refreshUI() {
      const sess = this.getSession();
      const topBtn = document.getElementById('cloudSyncBtn');
      const pillBtn = document.getElementById('vocabCloudSyncPill');
      const pillText = document.getElementById('vocabCloudSyncPillText');
      const settingsBtn = document.getElementById('vocabBtnCloudAccount');

      if (!sess) {
        if (topBtn) topBtn.textContent = '☁️ 云同步';
        if (pillText) pillText.textContent = '登录同步';
        if (pillBtn) pillBtn.style.color = '';
        if (settingsBtn) settingsBtn.textContent = '☁️ 登录云账号自动同步（未登录）';
      } else {
        const badge = syncState.status === 'syncing'
          ? '🔄 同步中...'
          : (syncState.status === 'error' ? '⚠️ 同步异常' : (syncState.status === 'offline' ? '📴 待联网同步' : '✅ 已云同步'));
        if (topBtn) topBtn.textContent = badge;
        if (pillText) pillText.textContent = syncState.status === 'syncing' ? '同步中' : (syncState.status === 'error' ? '同步重试' : '已同步');
        if (pillBtn) pillBtn.style.color = syncState.status === 'error' ? '#dc2626' : '#047857';
        if (settingsBtn) settingsBtn.textContent = `☁️ 云账号：${sess.user.email} (${badge})`;
      }
    },

    initAutoSync() {
      loadMeta();
      this.refreshUI();

      window.addEventListener('vocabBookUpdated', () => this.scheduleAutoPush('vocabBook'));
      window.addEventListener('kaoyanVocabDataChanged', () => this.scheduleAutoPush('vocabData'));

      window.addEventListener('online', () => {
        if (this.getSession() && (syncState.pendingOffline || syncState.status === 'error')) {
          this.syncNow({ reason: 'online' });
        }
      });

      if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden && this.getSession()) {
            const now = Date.now();
            if (now - syncState.lastPullAttemptAt > 30000) {
              syncState.lastPullAttemptAt = now;
              this.syncNow({ reason: 'resume' });
            }
          }
        });
      }

      // Background non-blocking initial sync ~1s after startup
      if (this.getSession()) {
        setTimeout(() => {
          syncState.lastPullAttemptAt = Date.now();
          this.syncNow({ reason: 'startup' });
        }, 1000);
      }
    }
  };

  window.CloudSyncModule = CloudSyncModule;

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('DOMContentLoaded', () => CloudSyncModule.initAutoSync());
  }
})();

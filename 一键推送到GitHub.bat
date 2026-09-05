@echo off
chcp 65001 >nul
echo ====================================================
echo 正在推送 ZY_English 项目到 GitHub...
echo ====================================================
cd /d "%~dp0"
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo ====================================================
if %errorlevel% equ 0 (
    echo 推送成功！GitHub Pages 将在 1-2 分钟内自动部署完成：
    echo https://zhaoyang51.github.io/ZY_English/
) else (
    echo 推送遇到问题，请检查登录授权或 Token 权限设置。
)
echo ====================================================
pause

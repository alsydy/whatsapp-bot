@echo off
echo ====================================
echo Bundle node_modules للتطبيق
echo ====================================
echo.

set TARGET_DIR=E:\whatsapp-bot\android\app\src\main\assets

echo [1/3] تثبيت ncc...
call npm install -g @vercel/ncc
if errorlevel 1 (
    echo ❌ فشل تثبيت ncc
    echo.
    echo الخيار البديل: نسخ node_modules يدوياً
    pause
    exit /b 1
)

echo.
echo [2/3] Bundle server.js...
call ncc build server.js -o dist-server
if errorlevel 1 (
    echo ❌ فشل bundle
    pause
    exit /b 1
)

echo.
echo [3/3] نسخ إلى assets...
if exist "%TARGET_DIR%\dist-server" rmdir /s /q "%TARGET_DIR%\dist-server"
xcopy /E /I /Y dist-server "%TARGET_DIR%\dist-server" >nul
if errorlevel 1 (
    echo ❌ فشل النسخ
    pause
    exit /b 1
)

echo.
echo ====================================
echo ✅ تم بنجاح!
echo ====================================
echo.
echo تم bundle server.js ونسخه إلى assets
echo يمكنك الآن بناء التطبيق في Android Studio
echo.
pause


@echo off
echo ====================================
echo نسخ node_modules (بسيط)
echo ====================================
echo.

set SOURCE_DIR=E:\whatsapp-bot\node_modules
set TARGET_DIR=E:\whatsapp-bot\android\app\src\main\assets\node_modules

echo ⚠️  هذا سينسخ node_modules كاملة (حجم كبير ~200MB)
echo.
set /p confirm="هل تريد المتابعة؟ (y/n): "
if /i not "%confirm%"=="y" (
    echo تم الإلغاء
    pause
    exit /b 0
)

echo.
echo [1/2] نسخ node_modules...
if exist "%TARGET_DIR%" rmdir /s /q "%TARGET_DIR%"
xcopy /E /I /Y "%SOURCE_DIR%" "%TARGET_DIR%" >nul
if errorlevel 1 (
    echo ❌ فشل النسخ
    pause
    exit /b 1
)

echo.
echo [2/2] نسخ المكتبات الأساسية فقط...
echo ✅ تم نسخ node_modules
echo.
echo ⚠️  حجم كبير! يُفضل استخدام bundle بدلاً من ذلك
echo.
pause


@echo off
echo ====================================
echo بناء APK للتطبيق
echo ====================================
echo.

cd /d E:\whatsapp-bot

echo [1/4] مزامنة Capacitor...
call npx cap sync android
if errorlevel 1 (
    echo ❌ فشل مزامنة Capacitor
    pause
    exit /b 1
)

echo.
echo [2/4] الانتقال إلى مجلد Android...
cd android

echo.
echo [3/4] بناء APK Debug...
call gradlew.bat assembleDebug
if errorlevel 1 (
    echo ❌ فشل بناء APK
    echo.
    echo ⚠️  قد تحتاج إلى:
    echo 1. فتح Android Studio
    echo 2. Build > Build Bundle(s) / APK(s) > Build APK(s)
    pause
    exit /b 1
)

echo.
echo [4/4] البحث عن APK...
set APK_PATH=app\build\outputs\apk\debug\app-debug.apk
if exist "%APK_PATH%" (
    echo.
    echo ====================================
    echo ✅ تم بناء APK بنجاح!
    echo ====================================
    echo.
    echo 📱 مسار APK:
    echo %CD%\%APK_PATH%
    echo.
    echo 📏 حجم APK:
    for %%A in ("%APK_PATH%") do echo    %%~zA bytes
    echo.
    echo 📋 الخطوات التالية:
    echo 1. انسخ APK إلى هاتفك الأندرويد
    echo 2. فعّل "مصادر غير معروفة" في الإعدادات
    echo 3. ثبّت APK
    echo.
) else (
    echo ❌ لم يتم العثور على APK
    echo يرجى التحقق من مسار البناء
)

echo.
pause


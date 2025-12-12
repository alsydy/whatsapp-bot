@echo off
echo ====================================
echo بناء تطبيق واتساب بوت للأندرويد
echo ====================================
echo.

echo [1/4] تثبيت التبعيات...
call npm install
if errorlevel 1 (
    echo خطأ في تثبيت التبعيات!
    pause
    exit /b 1
)

echo.
echo [2/4] بناء الواجهة...
call npm run build
if errorlevel 1 (
    echo خطأ في بناء الواجهة!
    pause
    exit /b 1
)

echo.
echo [3/4] مزامنة Capacitor...
call npx cap sync android
if errorlevel 1 (
    echo خطأ في مزامنة Capacitor!
    pause
    exit /b 1
)

echo.
echo [4/4] فتح Android Studio...
call npx cap open android
if errorlevel 1 (
    echo خطأ في فتح Android Studio!
    echo يرجى التأكد من تثبيت Android Studio
    pause
    exit /b 1
)

echo.
echo ====================================
echo تم بنجاح! Android Studio مفتوح الآن
echo ====================================
echo.
echo الخطوات التالية:
echo 1. انتظر حتى يكتمل تحميل المشروع في Android Studio
echo 2. اضغط Shift+F10 أو زر Run
echo 3. اختر جهاز أندرويد أو محاكي
echo.
pause


@echo off
echo ====================================
echo نسخ ملفات Node.js Mobile
echo ====================================
echo.

set SOURCE_DIR=C:\Users\alsyd\Downloads\nodejs-mobile-v0.3.3-android
set TARGET_DIR=E:\whatsapp-bot\android\app\src\main\assets\nodejs

echo المصدر: %SOURCE_DIR%
echo الهدف: %TARGET_DIR%
echo.

REM التحقق من وجود المجلد المصدر
if not exist "%SOURCE_DIR%" (
    echo ❌ المجلد المصدر غير موجود: %SOURCE_DIR%
    echo يرجى التحقق من المسار
    pause
    exit /b 1
)

REM إنشاء المجلدات الهدف
if not exist "%TARGET_DIR%\bin" mkdir "%TARGET_DIR%\bin"
if not exist "%TARGET_DIR%\lib\arm64-v8a" mkdir "%TARGET_DIR%\lib\arm64-v8a"
if not exist "%TARGET_DIR%\lib\armeabi-v7a" mkdir "%TARGET_DIR%\lib\armeabi-v7a"
if not exist "%TARGET_DIR%\lib\x86" mkdir "%TARGET_DIR%\lib\x86"
if not exist "%TARGET_DIR%\lib\x86_64" mkdir "%TARGET_DIR%\lib\x86_64"

echo [1/4] البحث عن ملفات Node.js...
echo.

REM البحث عن node binary
set NODE_BINARY=
if exist "%SOURCE_DIR%\bin\node" (
    set NODE_BINARY=%SOURCE_DIR%\bin\node
) else if exist "%SOURCE_DIR%\node" (
    set NODE_BINARY=%SOURCE_DIR%\node
) else (
    echo ⚠️  لم يتم العثور على node binary
    echo يرجى التحقق من وجوده في: %SOURCE_DIR%
)

REM نسخ node binary
if defined NODE_BINARY (
    echo [2/4] نسخ node binary...
    copy "%NODE_BINARY%" "%TARGET_DIR%\bin\node" >nul
    if %errorlevel% equ 0 (
        echo ✅ تم نسخ node binary بنجاح
    ) else (
        echo ❌ فشل نسخ node binary
    )
) else (
    echo ❌ لم يتم العثور على node binary
)

echo.

REM البحث عن libnode.so للأركيتكشرات المختلفة
echo [3/4] نسخ libnode.so للأركيتكشرات...

REM arm64-v8a
if exist "%SOURCE_DIR%\lib\arm64-v8a\libnode.so" (
    copy "%SOURCE_DIR%\lib\arm64-v8a\libnode.so" "%TARGET_DIR%\lib\arm64-v8a\" >nul
    echo ✅ تم نسخ libnode.so لـ arm64-v8a
) else if exist "%SOURCE_DIR%\libnode-arm64-v8a.so" (
    copy "%SOURCE_DIR%\libnode-arm64-v8a.so" "%TARGET_DIR%\lib\arm64-v8a\libnode.so" >nul
    echo ✅ تم نسخ libnode.so لـ arm64-v8a
) else (
    echo ⚠️  لم يتم العثور على libnode.so لـ arm64-v8a
)

REM armeabi-v7a
if exist "%SOURCE_DIR%\lib\armeabi-v7a\libnode.so" (
    copy "%SOURCE_DIR%\lib\armeabi-v7a\libnode.so" "%TARGET_DIR%\lib\armeabi-v7a\" >nul
    echo ✅ تم نسخ libnode.so لـ armeabi-v7a
) else if exist "%SOURCE_DIR%\libnode-armeabi-v7a.so" (
    copy "%SOURCE_DIR%\libnode-armeabi-v7a.so" "%TARGET_DIR%\lib\armeabi-v7a\libnode.so" >nul
    echo ✅ تم نسخ libnode.so لـ armeabi-v7a
) else (
    echo ⚠️  لم يتم العثور على libnode.so لـ armeabi-v7a
)

REM x86
if exist "%SOURCE_DIR%\lib\x86\libnode.so" (
    copy "%SOURCE_DIR%\lib\x86\libnode.so" "%TARGET_DIR%\lib\x86\" >nul
    echo ✅ تم نسخ libnode.so لـ x86
) else if exist "%SOURCE_DIR%\libnode-x86.so" (
    copy "%SOURCE_DIR%\libnode-x86.so" "%TARGET_DIR%\lib\x86\libnode.so" >nul
    echo ✅ تم نسخ libnode.so لـ x86
)

REM x86_64
if exist "%SOURCE_DIR%\lib\x86_64\libnode.so" (
    copy "%SOURCE_DIR%\lib\x86_64\libnode.so" "%TARGET_DIR%\lib\x86_64\" >nul
    echo ✅ تم نسخ libnode.so لـ x86_64
) else if exist "%SOURCE_DIR%\libnode-x86_64.so" (
    copy "%SOURCE_DIR%\libnode-x86_64.so" "%TARGET_DIR%\lib\x86_64\libnode.so" >nul
    echo ✅ تم نسخ libnode.so لـ x86_64
)

echo.
echo [4/4] التحقق من الملفات المنسوخة...
echo.

if exist "%TARGET_DIR%\bin\node" (
    echo ✅ node binary موجود
) else (
    echo ❌ node binary غير موجود
)

if exist "%TARGET_DIR%\lib\arm64-v8a\libnode.so" (
    echo ✅ libnode.so (arm64-v8a) موجود
) else (
    echo ⚠️  libnode.so (arm64-v8a) غير موجود
)

if exist "%TARGET_DIR%\lib\armeabi-v7a\libnode.so" (
    echo ✅ libnode.so (armeabi-v7a) موجود
) else (
    echo ⚠️  libnode.so (armeabi-v7a) غير موجود
)

echo.
echo ====================================
echo تم الانتهاء!
echo ====================================
echo.
echo إذا كانت بعض الملفات مفقودة، يرجى التحقق من:
echo 1. هيكل المجلد المحمّل
echo 2. أسماء الملفات
echo.
echo يمكنك تعديل المسارات في هذا الملف إذا لزم الأمر
echo.
pause


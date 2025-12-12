@echo off
echo ====================================
echo نسخ ملفات Node.js Mobile v0.3.3
echo ====================================
echo.

set SOURCE_DIR=C:\Users\alsyd\Downloads\nodejs-mobile-v0.3.3-android
set TARGET_DIR=E:\whatsapp-bot\android\app\src\main\assets\nodejs

echo المصدر: %SOURCE_DIR%
echo الهدف: %TARGET_DIR%
echo.

REM إنشاء المجلدات الهدف
if not exist "%TARGET_DIR%\bin" mkdir "%TARGET_DIR%\bin"
if not exist "%TARGET_DIR%\lib\arm64-v8a" mkdir "%TARGET_DIR%\lib\arm64-v8a"
if not exist "%TARGET_DIR%\lib\armeabi-v7a" mkdir "%TARGET_DIR%\lib\armeabi-v7a"
if not exist "%TARGET_DIR%\lib\x86" mkdir "%TARGET_DIR%\lib\x86"
if not exist "%TARGET_DIR%\lib\x86_64" mkdir "%TARGET_DIR%\lib\x86_64"

echo [1/3] نسخ libnode.so للأركيتكشرات...
echo.

REM نسخ libnode.so من bin/ إلى lib/
if exist "%SOURCE_DIR%\bin\arm64-v8a\libnode.so" (
    copy "%SOURCE_DIR%\bin\arm64-v8a\libnode.so" "%TARGET_DIR%\lib\arm64-v8a\" >nul
    echo ✅ تم نسخ libnode.so لـ arm64-v8a
) else (
    echo ❌ لم يتم العثور على libnode.so لـ arm64-v8a
)

if exist "%SOURCE_DIR%\bin\armeabi-v7a\libnode.so" (
    copy "%SOURCE_DIR%\bin\armeabi-v7a\libnode.so" "%TARGET_DIR%\lib\armeabi-v7a\" >nul
    echo ✅ تم نسخ libnode.so لـ armeabi-v7a
) else (
    echo ❌ لم يتم العثور على libnode.so لـ armeabi-v7a
)

if exist "%SOURCE_DIR%\bin\x86\libnode.so" (
    copy "%SOURCE_DIR%\bin\x86\libnode.so" "%TARGET_DIR%\lib\x86\" >nul
    echo ✅ تم نسخ libnode.so لـ x86
)

if exist "%SOURCE_DIR%\bin\x86_64\libnode.so" (
    copy "%SOURCE_DIR%\bin\x86_64\libnode.so" "%TARGET_DIR%\lib\x86_64\" >nul
    echo ✅ تم نسخ libnode.so لـ x86_64
)

echo.
echo [2/3] البحث عن node binary...
echo.

REM في nodejs-mobile v0.3.3، libnode.so هو نفسه node binary
REM سنستخدم libnode.so كـ node binary
if exist "%SOURCE_DIR%\bin\arm64-v8a\libnode.so" (
    copy "%SOURCE_DIR%\bin\arm64-v8a\libnode.so" "%TARGET_DIR%\bin\node" >nul
    echo ✅ تم نسخ node binary (من arm64-v8a)
) else (
    echo ⚠️  لم يتم العثور على node binary
    echo ملاحظة: في nodejs-mobile v0.3.3، libnode.so يعمل كـ node binary
)

echo.
echo [3/3] التحقق من الملفات المنسوخة...
echo.

if exist "%TARGET_DIR%\lib\arm64-v8a\libnode.so" (
    echo ✅ libnode.so (arm64-v8a) موجود
) else (
    echo ❌ libnode.so (arm64-v8a) غير موجود
)

if exist "%TARGET_DIR%\lib\armeabi-v7a\libnode.so" (
    echo ✅ libnode.so (armeabi-v7a) موجود
) else (
    echo ❌ libnode.so (armeabi-v7a) غير موجود
)

if exist "%TARGET_DIR%\bin\node" (
    echo ✅ node binary موجود
) else (
    echo ❌ node binary غير موجود
)

echo.
echo ====================================
echo تم الانتهاء!
echo ====================================
echo.
echo ملاحظة: في nodejs-mobile v0.3.3، libnode.so يعمل كـ node binary
echo قد نحتاج لتعديل NodeJsService.java لاستخدام libnode.so مباشرة
echo.
pause


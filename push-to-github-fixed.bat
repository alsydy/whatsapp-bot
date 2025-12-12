@echo off
echo ====================================
echo رفع المشروع إلى GitHub
echo ====================================
echo.

REM استخدام Git من المسار المحدد إذا كان موجوداً
set GIT_PATH=C:\Users\alsyd\Downloads\PortableGit\bin\git.exe
if exist "%GIT_PATH%" (
    set "GIT_CMD=%GIT_PATH%"
    echo ✅ تم العثور على Git في: %GIT_PATH%
) else (
    REM البحث عن Git في PATH
    where git >nul 2>&1
    if errorlevel 1 (
        echo ❌ Git غير موجود
        echo.
        echo يرجى التأكد من:
        echo 1. تثبيت Git من: https://git-scm.com/downloads
        echo 2. أو تحديد مسار Git الصحيح في هذا الملف
        pause
        exit /b 1
    )
    set "GIT_CMD=git"
    echo ✅ تم العثور على Git في PATH
)

echo.
cd /d E:\whatsapp-bot
if errorlevel 1 (
    echo ❌ لا يمكن الوصول إلى مجلد المشروع
    pause
    exit /b 1
)

echo [1/6] تهيئة Git...
"%GIT_CMD%" init
echo ✅ تم تهيئة Git
echo.

echo [2/6] إضافة الملفات...
"%GIT_CMD%" add .
echo ✅ تمت إضافة الملفات
echo.

echo [3/6] Commit...
"%GIT_CMD%" commit -m "Initial commit - WhatsApp Bot with embedded Node.js"
if errorlevel 1 (
    echo ⚠️  لا توجد تغييرات جديدة أو تم Commit بالفعل
)
echo.

echo [4/6] إضافة Remote...
"%GIT_CMD%" remote remove origin 2>nul
"%GIT_CMD%" remote add origin https://github.com/alsydy/whatsapp-bot.git
echo ✅ تم إضافة Remote
echo.

echo [5/6] تعيين الفرع الرئيسي...
"%GIT_CMD%" branch -M main
echo ✅ تم تعيين الفرع إلى main
echo.

echo [6/6] رفع الملفات إلى GitHub...
echo.
echo ⚠️  سيطلب منك تسجيل الدخول إلى GitHub
echo ⚠️  حجم الرفع: ~600 MB (قد يستغرق 10-15 دقيقة)
echo.
"%GIT_CMD%" push -u origin main
if errorlevel 1 (
    echo.
    echo ❌ فشل الرفع
    echo.
    echo قد تحتاج إلى:
    echo 1. تسجيل الدخول إلى GitHub
    echo 2. التحقق من اسم المستخدم وكلمة المرور
    echo 3. أو استخدام Personal Access Token
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo ✅ تم رفع المشروع بنجاح!
echo ====================================
echo.
echo 📋 الخطوات التالية:
echo 1. اذهب إلى: https://github.com/alsydy/whatsapp-bot
echo 2. اضغط على تبويب Actions
echo 3. اضغط "I understand my workflows, enable them" (إذا ظهرت)
echo 4. انتظر 15-20 دقيقة حتى يكتمل البناء
echo 5. Actions > آخر workflow > Artifacts > whatsapp-bot-apk > Download
echo.
pause


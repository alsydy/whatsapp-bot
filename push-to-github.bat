@echo off
echo ====================================
echo رفع المشروع إلى GitHub
echo ====================================
echo.

cd /d E:\whatsapp-bot

echo [1/6] تهيئة Git...
git init
if errorlevel 1 (
    echo ❌ Git غير مثبت أو غير موجود في PATH
    echo.
    echo يرجى تثبيت Git من: https://git-scm.com/downloads
    echo وأعد تشغيل PowerShell/CMD بعد التثبيت
    pause
    exit /b 1
)

echo ✅ تم تهيئة Git
echo.

echo [2/6] إضافة الملفات...
git add .
echo ✅ تمت إضافة الملفات
echo.

echo [3/6] Commit...
git commit -m "Initial commit - WhatsApp Bot with embedded Node.js"
if errorlevel 1 (
    echo ⚠️  لا توجد تغييرات جديدة أو تم Commit بالفعل
)
echo.

echo [4/6] إضافة Remote...
git remote remove origin 2>nul
git remote add origin https://github.com/alsydy/whatsapp-bot.git
if errorlevel 1 (
    echo ⚠️  Remote موجود بالفعل
)
echo ✅ تم إضافة Remote
echo.

echo [5/6] تعيين الفرع الرئيسي...
git branch -M main
echo ✅ تم تعيين الفرع إلى main
echo.

echo [6/6] رفع الملفات إلى GitHub...
echo.
echo ⚠️  سيطلب منك تسجيل الدخول إلى GitHub
echo ⚠️  حجم الرفع: ~600 MB (قد يستغرق 10-15 دقيقة)
echo.
git push -u origin main
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

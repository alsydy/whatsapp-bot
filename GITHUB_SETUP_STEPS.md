# 📤 خطوات رفع المشروع إلى GitHub

## 🚀 الخطوات السريعة:

### 1. إنشاء مستودع GitHub

1. اذهب إلى: **https://github.com/new**
2. اسم المستودع: `whatsapp-bot`
3. **اختر:** Private (للمشاريع الشخصية) أو Public
4. **لا** تضع README أو .gitignore
5. اضغط **Create repository**

### 2. رفع المشروع

افتح PowerShell أو CMD في مجلد المشروع:

```bash
cd E:\whatsapp-bot

# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# Commit
git commit -m "Initial commit - WhatsApp Bot with embedded Node.js"

# إضافة remote (استبدل YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/whatsapp-bot.git

# رفع الملفات
git branch -M main
git push -u origin main
```

**ملاحظة:** قد يطلب منك تسجيل الدخول إلى GitHub

### 3. تفعيل Actions

1. اذهب إلى مستودعك على GitHub
2. اضغط على تبويب **Actions**
3. إذا ظهرت رسالة، اضغط **I understand my workflows, enable them**

### 4. بناء APK

**تلقائياً:**
- البناء سيبدأ تلقائياً بعد الرفع
- انتظر 15-20 دقيقة

**يدوياً:**
- Actions > Build Android APK > Run workflow > Run workflow

### 5. تحميل APK

بعد اكتمال البناء:
- Actions > آخر workflow > Artifacts > whatsapp-bot-apk > Download

---

## ⚠️ ملاحظات:

1. **حجم المشروع:** ~600 MB (بسبب node_modules في assets)
2. **وقت الرفع:** قد يستغرق 10-15 دقيقة
3. **وقت البناء:** 15-20 دقيقة

---

## ✅ بعد التحميل:

1. انسخ APK إلى هاتفك
2. فعّل "مصادر غير معروفة"
3. ثبّت APK
4. افتح التطبيق!

---

**جاهز للرفع!** 🚀


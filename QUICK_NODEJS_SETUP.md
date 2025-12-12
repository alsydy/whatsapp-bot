# ⚡ إعداد سريع - Node.js المضمن

## 🎯 الهدف:
تضمين Node.js مباشرة في APK ليعمل بدون أي تثبيتات إضافية.

---

## 📋 الخطوات السريعة:

### 1️⃣ تحميل Node.js Binaries

```bash
# اذهب إلى:
https://github.com/JaneaSystems/nodejs-mobile/releases

# حمّل أحدث إصدار (Node.js v18 أو v20)
```

### 2️⃣ استخراج ووضع الملفات

```
android/app/src/main/assets/nodejs/
├── bin/node
└── lib/
    ├── arm64-v8a/libnode.so
    └── armeabi-v7a/libnode.so
```

### 3️⃣ نسخ server.js (تم بالفعل ✅)

```bash
# تم نسخه تلقائياً بواسطة setup-nodejs-mobile.bat
```

### 4️⃣ Bundle node_modules (مهم!)

```bash
# تثبيت ncc
npm install -g @vercel/ncc

# Bundle server.js
ncc build server.js -o dist-server

# نسخ dist-server إلى assets
cp -r dist-server/* android/app/src/main/assets/
```

### 5️⃣ بناء التطبيق

```bash
npm run build
npx cap sync android
npx cap open android
```

---

## ⚠️ ملاحظات:

- **حجم APK:** سيكون ~80-150 MB (بدون node_modules كاملة)
- **الأركيتكشرات:** `arm64-v8a` و `armeabi-v7a` كافية لمعظم الأجهزة
- **node_modules:** استخدم bundle بدلاً من النسخ الكامل

---

## ✅ النتيجة:

بعد إكمال الخطوات، التطبيق سيعمل مباشرة بعد التثبيت بدون أي تثبيتات إضافية! 🎉


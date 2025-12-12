# 📥 تحميل Node.js Binaries للأندرويد

## الخطوات:

### 1. تحميل Node.js Mobile Binaries

قم بتحميل Node.js binaries من:
- https://github.com/JaneaSystems/nodejs-mobile/releases

أو استخدم الإصدار المحدد:
- Node.js v18.x أو v20.x (موصى به)

### 2. استخراج الملفات

ستحتاج:
- `libnode.so` للأركيتكشرات المختلفة:
  - `armeabi-v7a/libnode.so`
  - `arm64-v8a/libnode.so`
  - `x86/libnode.so`
  - `x86_64/libnode.so`
- `node` binary

### 3. وضع الملفات في المشروع

أنشئ المجلدات التالية:
```
android/app/src/main/assets/
├── nodejs/
│   ├── bin/
│   │   └── node
│   └── lib/
│       ├── armeabi-v7a/
│       │   └── libnode.so
│       ├── arm64-v8a/
│       │   └── libnode.so
│       ├── x86/
│       │   └── libnode.so
│       └── x86_64/
│           └── libnode.so
└── server.js
```

### 4. نسخ server.js و node_modules

- نسخ `server.js` إلى `assets/`
- نسخ `node_modules` (أو bundle) إلى `assets/`

---

## ⚠️ ملاحظة مهمة:

**حجم الملفات كبير (~50-70 MB)** - سيؤثر على حجم APK.

**بديل:** يمكن استخدام nodejs-mobile Gradle plugin الذي يقوم بتحميل الملفات تلقائياً.


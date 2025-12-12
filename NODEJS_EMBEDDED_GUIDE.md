# 🚀 دليل تضمين Node.js في APK - خطوة بخطوة

## ✅ ما تم إنجازه:

1. ✅ إضافة NodeJsService.java - خدمة لتشغيل Node.js المضمن
2. ✅ تحديث BackgroundService.java - يستخدم NodeJsService أولاً
3. ✅ تحديث build.gradle - إعدادات للأركيتكشرات المختلفة
4. ✅ إنشاء مجلدات assets - جاهزة لملفات Node.js
5. ✅ نسخ server.js و package.json - إلى assets

---

## 📥 الخطوات المتبقية:

### الخطوة 1: تحميل Node.js Binaries

#### الطريقة أ: من nodejs-mobile (موصى به)

1. اذهب إلى: https://github.com/JaneaSystems/nodejs-mobile/releases
2. حمّل أحدث إصدار (Node.js v18 أو v20)
3. استخرج الملفات

#### الطريقة ب: بناء من المصدر

```bash
git clone https://github.com/JaneaSystems/nodejs-mobile.git
cd nodejs-mobile
# اتبع التعليمات في README
```

---

### الخطوة 2: وضع الملفات في المشروع

أنشئ البنية التالية:

```
android/app/src/main/assets/
├── nodejs/
│   ├── bin/
│   │   └── node          (Node.js binary)
│   └── lib/
│       ├── armeabi-v7a/
│       │   └── libnode.so
│       ├── arm64-v8a/
│       │   └── libnode.so
│       ├── x86/
│       │   └── libnode.so
│       └── x86_64/
│           └── libnode.so
├── server.js
└── package.json
```

**ملاحظة:** يمكنك نسخ `libnode.so` للأركيتكشرات التي تحتاجها فقط (عادة `arm64-v8a` و `armeabi-v7a`)

---

### الخطوة 3: نسخ node_modules (مهم!)

لديك خياران:

#### الخيار أ: نسخ node_modules كاملة

```bash
# نسخ node_modules إلى assets
cp -r node_modules android/app/src/main/assets/
```

**⚠️ المشكلة:** حجم كبير جداً (~200-300 MB)

#### الخيار ب: استخدام bundle (موصى به)

1. استخدم `webpack` أو `esbuild` لـ bundle الكود
2. أو استخدم `pkg` لإنشاء executable واحد
3. أو استخدم `ncc` من Vercel:

```bash
npm install -g @vercel/ncc
ncc build server.js -o dist-server
# ثم نسخ dist-server إلى assets
```

---

### الخطوة 4: بناء التطبيق

```bash
npm run build
npx cap sync android
npx cap open android
```

في Android Studio:
- Build > Build Bundle(s) / APK(s) > Build APK(s)

---

## 🔧 حل بديل: استخدام Gradle Plugin

بدلاً من نسخ الملفات يدوياً، يمكن استخدام plugin:

### إضافة إلى build.gradle:

```gradle
plugins {
    id 'com.android.application'
    id 'io.github.janeasystems.nodejs-mobile-gradle' version '0.2.0'
}

nodejs {
    nodeVersion = "18.17.0"
    architectures = ["armeabi-v7a", "arm64-v8a"]
}
```

هذا سيقوم بتحميل ونسخ الملفات تلقائياً!

---

## ⚠️ ملاحظات مهمة:

### 1. حجم APK:
- Node.js binaries: ~30-50 MB
- node_modules: ~50-200 MB (حسب الحل المستخدم)
- **إجمالي:** ~80-250 MB

### 2. الأركيتكشرات:
- `arm64-v8a` - معظم الأجهزة الحديثة
- `armeabi-v7a` - الأجهزة القديمة
- `x86` و `x86_64` - للمحاكيات فقط (اختياري)

### 3. node_modules:
- **لا تنسخ كاملة** - حجم كبير جداً
- استخدم bundle أو اختر المكتبات الأساسية فقط

---

## 🧪 اختبار:

بعد بناء التطبيق:

1. ثبّت APK على الجهاز
2. افتح التطبيق
3. تحقق من Logcat:
   ```bash
   adb logcat | grep NodeJsService
   ```
4. يجب أن ترى: "Node.js started successfully"

---

## 🐛 استكشاف الأخطاء:

### المشكلة: "Node.js binary not found"
- تحقق من وجود `node` في `assets/nodejs/bin/`
- تحقق من الصلاحيات (chmod +x)

### المشكلة: "libnode.so not found"
- تحقق من وجود `libnode.so` في `assets/nodejs/lib/[arch]/`
- تأكد من الأركيتكشر الصحيح

### المشكلة: "Cannot find module"
- تحقق من نسخ `node_modules` أو bundle
- تحقق من `NODE_PATH` في الكود

---

## ✅ النتيجة النهائية:

بعد إكمال الخطوات:
- ✅ التطبيق يعمل بدون تثبيت Node.js
- ✅ لا يحتاج Termux
- ✅ يعمل مباشرة بعد التثبيت
- ⚠️ حجم APK أكبر

---

## 📚 موارد إضافية:

- [nodejs-mobile GitHub](https://github.com/JaneaSystems/nodejs-mobile)
- [Node.js Mobile Documentation](https://code.janeasystems.com/nodejs-mobile)
- [Vercel NCC](https://github.com/vercel/ncc)


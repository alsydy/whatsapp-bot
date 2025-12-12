# 🔍 استكشاف أخطاء GitHub Actions

## 📋 كيفية التحقق من الأخطاء:

1. **اذهب إلى تبويب Actions:**
   - https://github.com/alsydy/whatsapp-bot/actions

2. **اضغط على آخر workflow run (الأحمر)**

3. **اضغط على الخطوة التي فشلت** لرؤية السجلات

4. **ابحث عن رسائل الخطأ** في السجلات

---

## 🔧 الأخطاء الشائعة والحلول:

### 1. خطأ: "Gradle wrapper not found"
**الحل:** ✅ تم إصلاحه - ملفات gradlew موجودة الآن

### 2. خطأ: "Android SDK not found"
**الحل:** 
- تأكد من أن `android-actions/setup-android@v2` يعمل
- تحقق من متغير `ANDROID_SDK_ROOT`

### 3. خطأ: "Build failed" في خطوة Build APK
**الحل:**
- تحقق من `android/app/build.gradle`
- تحقق من أن جميع التبعيات متاحة
- تحقق من أن Capacitor sync نجح

### 4. خطأ: "npm install failed"
**الحل:**
- تحقق من `package.json`
- قد تحتاج إلى `--legacy-peer-deps` ✅ (موجود)

### 5. خطأ: "Capacitor sync failed"
**الحل:**
- تحقق من أن `npm run build` نجح
- تحقق من `capacitor.config.ts`

---

## 📝 الخطوات الحالية في Workflow:

1. ✅ Checkout code
2. ✅ Set up JDK 11
3. ✅ Setup Node.js
4. ✅ Install dependencies
5. ✅ Build frontend
6. ✅ Setup Capacitor
7. ✅ Setup Android SDK
8. ✅ Accept Android Licenses
9. ⏳ Build APK ← **عادة ما يفشل هنا**
10. ⏳ Upload APK artifact
11. ⏳ Create Release

---

## 🎯 إذا استمر الفشل:

### الخطوة 1: تحقق من السجلات
- افتح آخر workflow run
- ابحث عن رسالة الخطأ الدقيقة

### الخطوة 2: اختبر محلياً (إذا أمكن)
```bash
cd android
./gradlew assembleDebug --stacktrace
```

### الخطوة 3: تحقق من الملفات
- ✅ `android/gradlew` موجود
- ✅ `android/gradle/wrapper/gradle-wrapper.jar` موجود
- ✅ `android/app/build.gradle` صحيح
- ✅ `android/build.gradle` صحيح

---

## 💡 نصيحة:

**إذا كان الخطأ في خطوة "Build APK":**
- افتح السجلات
- ابحث عن السطر الذي يبدأ بـ `FAILURE:` أو `ERROR:`
- انسخ رسالة الخطأ الكاملة
- شاركها هنا لإصلاحها

---

**آخر تحديث:** بعد إضافة Gradle wrapper files


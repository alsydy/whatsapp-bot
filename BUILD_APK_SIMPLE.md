# 📱 بناء APK بدون Android Studio - دليل بسيط

## ⚠️ المتطلبات الأساسية:

### 1. Java JDK 11+ (مطلوب)
- **تحميل:** https://www.oracle.com/java/technologies/downloads/
- **أو OpenJDK:** https://adoptium.net/
- بعد التثبيت، أضف Java إلى PATH

### 2. Android SDK (مطلوب)
- **تحميل Command Line Tools:** https://developer.android.com/studio#command-tools
- أضف ANDROID_HOME إلى متغيرات البيئة

### 3. Gradle Wrapper (سيتم تحميله تلقائياً)

---

## 🚀 الخطوات:

### الخطوة 1: تثبيت Java

1. حمّل Java JDK 11+ من Oracle أو Adoptium
2. ثبّته
3. أضف إلى PATH:
   - Windows: إعدادات > متغيرات البيئة > Path > إضافة `C:\Program Files\Java\jdk-XX\bin`
   - أضف JAVA_HOME: `C:\Program Files\Java\jdk-XX`

### الخطوة 2: تثبيت Android SDK

1. حمّل Android SDK Command Line Tools
2. استخرج الملفات
3. أضف ANDROID_HOME إلى متغيرات البيئة

### الخطوة 3: بناء APK

```bash
cd E:\whatsapp-bot\android

# إذا كان gradlew.bat موجود
gradlew.bat assembleDebug

# أو إذا كان Gradle مثبت
gradle assembleDebug
```

---

## 📦 إذا لم يكن لديك Java أو Android SDK:

### الحل البديل: استخدام GitHub Actions

يمكنك رفع المشروع إلى GitHub واستخدام GitHub Actions لبناء APK تلقائياً.

---

## 💡 نصيحة:

**أسهل طريقة:** استخدم Android Studio (حتى لو لم تكن تريد استخدامه للبرمجة)
- فقط افتح المشروع
- Build > Build APK
- انسخ APK

---

## ✅ بعد البناء:

APK سيكون في:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

انسخه للهاتف وثبّته!

---

**للبدء، ثبّت Java و Android SDK أولاً** 🔧


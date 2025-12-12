# 🔧 بناء APK بدون Android Studio

## ⚠️ المتطلبات:

1. **Java JDK 11+** - [تحميل](https://www.oracle.com/java/technologies/downloads/)
2. **Android SDK** - [تحميل](https://developer.android.com/studio#command-tools)
3. **Gradle** (اختياري - يمكن استخدام wrapper)

---

## 🚀 الطريقة 1: استخدام Gradle Wrapper (موصى به)

### الخطوة 1: إنشاء Gradle Wrapper

```bash
cd E:\whatsapp-bot\android
gradle wrapper
```

إذا لم يكن Gradle مثبت، حمّل Gradle Wrapper من:
- https://github.com/gradle/gradle/releases

### الخطوة 2: بناء APK

```bash
cd E:\whatsapp-bot\android
gradlew.bat assembleDebug
```

APK سيكون في: `app/build/outputs/apk/debug/app-debug.apk`

---

## 🚀 الطريقة 2: استخدام Gradle مباشرة

### إذا كان Gradle مثبت:

```bash
cd E:\whatsapp-bot\android
gradle assembleDebug
```

---

## 🚀 الطريقة 3: استخدام السكريبت

```bash
.\build-apk-direct.bat
```

---

## 📦 تثبيت APK

### باستخدام ADB:

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### يدوياً:

1. انسخ APK إلى الهاتف
2. فعّل "مصادر غير معروفة"
3. ثبّت APK

---

## ⚠️ إذا واجهت مشاكل:

### المشكلة: Gradle غير موجود

**الحل:**
1. حمّل Gradle من: https://gradle.org/releases/
2. أضف Gradle إلى PATH
3. أو استخدم wrapper

### المشكلة: Java غير موجود

**الحل:**
1. حمّل Java JDK 11+ من Oracle
2. أضف JAVA_HOME إلى متغيرات البيئة

### المشكلة: Android SDK غير موجود

**الحل:**
1. حمّل Android SDK Command Line Tools
2. أضف ANDROID_HOME إلى متغيرات البيئة

---

## 💡 نصيحة:

إذا كان لديك مشاكل في الإعداد، يمكنك:
1. استخدام Android Studio (أسهل)
2. أو استخدام خدمة بناء سحابية

---

**جاهز للبناء!** 🚀


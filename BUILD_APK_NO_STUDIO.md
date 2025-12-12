# 🔧 بناء APK بدون Android Studio - دليل كامل

## ⚠️ المتطلبات الأساسية:

### 1. Java JDK 11 أو أحدث
- **تحميل:** https://www.oracle.com/java/technologies/downloads/
- **أو:** OpenJDK من https://adoptium.net/
- **التحقق:** `java -version`

### 2. Android SDK (Command Line Tools)
- **تحميل:** https://developer.android.com/studio#command-tools
- **أو:** استخدم Android SDK فقط بدون Studio

### 3. Gradle (اختياري - يمكن استخدام wrapper)

---

## 🚀 الطريقة السريعة:

### الخطوة 1: تثبيت Java

1. حمّل Java JDK 11+ من Oracle أو Adoptium
2. ثبّته
3. أضف إلى PATH:
   ```
   C:\Program Files\Java\jdk-XX\bin
   ```
4. أضف متغير JAVA_HOME:
   ```
   JAVA_HOME=C:\Program Files\Java\jdk-XX
   ```

### الخطوة 2: تحميل Gradle Wrapper

```bash
# الطريقة 1: تحميل مباشر
# اذهب إلى: https://github.com/gradle/gradle/releases
# حمّل gradle-wrapper.jar
# ضعه في: android/gradle/wrapper/gradle-wrapper.jar

# الطريقة 2: استخدام السكريبت
.\setup-gradle-wrapper.ps1
```

### الخطوة 3: إنشاء gradlew.bat

```bash
.\create-gradlew.bat
```

### الخطوة 4: بناء APK

```bash
cd android
gradlew.bat assembleDebug
```

APK سيكون في: `app/build/outputs/apk/debug/app-debug.apk`

---

## 🚀 الطريقة البديلة: استخدام Gradle مباشرة

إذا كان Gradle مثبت:

```bash
cd android
gradle assembleDebug
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

## ⚠️ استكشاف الأخطاء:

### المشكلة: "java is not recognized"

**الحل:**
- ثبّت Java JDK
- أضف Java إلى PATH
- أعد تشغيل PowerShell/CMD

### المشكلة: "gradlew.bat is not recognized"

**الحل:**
- شغّل `.\create-gradlew.bat`
- أو حمّل gradle-wrapper.jar يدوياً

### المشكلة: "Android SDK not found"

**الحل:**
- حمّل Android SDK Command Line Tools
- أضف ANDROID_HOME إلى متغيرات البيئة

---

## 💡 حل بديل: استخدام خدمة بناء سحابية

إذا كان الإعداد معقداً، يمكنك استخدام:
- **GitHub Actions** - بناء تلقائي
- **Bitrise** - خدمة CI/CD
- **AppCenter** - بناء سحابي

---

## ✅ بعد البناء:

1. APK سيكون في: `android/app/build/outputs/apk/debug/app-debug.apk`
2. انسخه للهاتف
3. ثبّته
4. افتح التطبيق وابدأ الاستخدام!

---

**جاهز للبناء!** 🚀


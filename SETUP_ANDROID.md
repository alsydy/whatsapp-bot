# 📱 دليل إعداد تطبيق أندرويد

## المتطلبات الأساسية

### 1. تثبيت Node.js على الأندرويد

هناك عدة طرق لتثبيت Node.js على الأندرويد:

#### الطريقة الأولى: استخدام Termux (موصى بها)

```bash
# تثبيت Termux من Google Play Store
# ثم في Termux:

pkg update && pkg upgrade
pkg install nodejs
pkg install git

# التحقق من التثبيت
node -v
npm -v
```

#### الطريقة الثانية: استخدام Node.js Runtime للأندرويد

1. قم بتحميل Node.js runtime من:
   - https://github.com/nodejs/nodejs-mobile
   
2. أضف المكتبة إلى مشروع Android Studio

#### الطريقة الثالثة: تضمين Node.js في التطبيق

يمكنك تضمين Node.js مباشرة في APK باستخدام:
- `nodejs-mobile-react-native` (لـ React Native)
- أو بناء Node.js كـ native library

## إعداد Android Studio

### 1. تثبيت Android Studio

- قم بتحميل Android Studio من: https://developer.android.com/studio
- تثبيت Android SDK
- تثبيت Java JDK 11 أو أحدث

### 2. إعداد المشروع

```bash
# في مجلد المشروع
npm install
npm run build
npx cap sync android
npx cap open android
```

### 3. تعديل إعدادات التطبيق

في `android/app/build.gradle`:

```gradle
android {
    compileSdkVersion 33
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 33
        ...
    }
    ...
}
```

## إعداد خدمة الخلفية

### 1. تعديل BackgroundService.java

إذا كنت تستخدم Termux، عدّل المسار في `BackgroundService.java`:

```java
private void startServer() {
    try {
        // مسار Node.js من Termux
        String nodePath = "/data/data/com.termux/files/usr/bin/node";
        String serverPath = getApplicationInfo().dataDir + "/files/server.js";
        
        ProcessBuilder pb = new ProcessBuilder(nodePath, serverPath);
        pb.directory(new File(getApplicationInfo().dataDir + "/files"));
        serverProcess = pb.start();
        
    } catch (Exception e) {
        Log.e(TAG, "Error starting server", e);
    }
}
```

### 2. نسخ ملفات الخادم

أضف سكريبت لنسخ ملفات Node.js إلى مجلد التطبيق:

```java
private void copyServerFiles() {
    try {
        File filesDir = new File(getApplicationInfo().dataDir + "/files");
        if (!filesDir.exists()) {
            filesDir.mkdirs();
        }
        
        // نسخ server.js
        InputStream is = getAssets().open("server.js");
        FileOutputStream fos = new FileOutputStream(
            new File(filesDir, "server.js")
        );
        
        byte[] buffer = new byte[1024];
        int length;
        while ((length = is.read(buffer)) > 0) {
            fos.write(buffer, 0, length);
        }
        
        is.close();
        fos.close();
        
    } catch (Exception e) {
        Log.e(TAG, "Error copying files", e);
    }
}
```

## إعدادات الأذونات

### في AndroidManifest.xml

تأكد من وجود جميع الأذونات المطلوبة:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

### تفعيل عدم تحسين البطارية

يجب على المستخدم تفعيل "عدم تحسين البطارية" للتطبيق:
- الإعدادات > البطارية > تحسين البطارية
- ابحث عن التطبيق واختر "عدم التحسين"

## بناء APK

### 1. بناء Debug APK

في Android Studio:
- Build > Build Bundle(s) / APK(s) > Build APK(s)

### 2. بناء Release APK

1. أنشئ keystore:
```bash
keytool -genkey -v -keystore whatsapp-bot.keystore -alias whatsapp-bot -keyalg RSA -keysize 2048 -validity 10000
```

2. أضف معلومات keystore في `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file('whatsapp-bot.keystore')
            storePassword 'your-password'
            keyAlias 'whatsapp-bot'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. Build > Generate Signed Bundle / APK

## اختبار التطبيق

### 1. على محاكي Android

```bash
# إنشاء AVD في Android Studio
# ثم Run > Run 'app'
```

### 2. على جهاز حقيقي

1. فعّل "وضع المطور" على الهاتف
2. فعّل "تصحيح USB"
3. وصّل الهاتف بالكمبيوتر
4. في Android Studio: Run > Run 'app'

## استكشاف الأخطاء

### المشكلة: التطبيق لا يبدأ الخادم

- تحقق من وجود Node.js على الجهاز
- تحقق من مسار Node.js في الكود
- راجع Logcat في Android Studio

### المشكلة: الخادم لا يعمل في الخلفية

- تأكد من تفعيل "عدم تحسين البطارية"
- تحقق من إعدادات الأذونات
- راجع `BackgroundService.java`

### المشكلة: لا يمكن الوصول للخادم من خارج الجهاز

- الخادم يعمل على `localhost` فقط
- للوصول من خارج الجهاز، استخدم:
  - `adb port forwarding`
  - أو عدّل الكود لاستخدام `0.0.0.0`

## نصائح إضافية

1. **استخدام WebView بدلاً من Node.js**: يمكن استخدام WebView لتشغيل JavaScript مباشرة
2. **استخدام React Native**: بدلاً من Capacitor، يمكن استخدام React Native
3. **استخدام Cloud Functions**: تشغيل الخادم على السحابة والاتصال به من التطبيق

## موارد إضافية

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Node.js Mobile](https://github.com/nodejs/nodejs-mobile)
- [Termux](https://termux.com/)


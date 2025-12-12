#!/bin/bash

echo "===================================="
echo "بناء تطبيق واتساب بوت للأندرويد"
echo "===================================="
echo ""

echo "[1/4] تثبيت التبعيات..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ خطأ في تثبيت التبعيات!"
    exit 1
fi

echo ""
echo "[2/4] بناء الواجهة..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ خطأ في بناء الواجهة!"
    exit 1
fi

echo ""
echo "[3/4] مزامنة Capacitor..."
npx cap sync android
if [ $? -ne 0 ]; then
    echo "❌ خطأ في مزامنة Capacitor!"
    exit 1
fi

echo ""
echo "[4/4] فتح Android Studio..."
npx cap open android
if [ $? -ne 0 ]; then
    echo "❌ خطأ في فتح Android Studio!"
    echo "يرجى التأكد من تثبيت Android Studio"
    exit 1
fi

echo ""
echo "===================================="
echo "✅ تم بنجاح! Android Studio مفتوح الآن"
echo "===================================="
echo ""
echo "الخطوات التالية:"
echo "1. انتظر حتى يكتمل تحميل المشروع في Android Studio"
echo "2. اضغط Shift+F10 أو زر Run"
echo "3. اختر جهاز أندرويد أو محاكي"
echo ""


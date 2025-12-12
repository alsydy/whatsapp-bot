#!/bin/bash

# سكريبت بناء تطبيق الأندرويد

echo "🔨 Building Android App..."

# بناء الواجهة
echo "📦 Building frontend..."
npm run build

# مزامنة Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync android

# فتح Android Studio
echo "🚀 Opening Android Studio..."
npx cap open android

echo "✅ Done! Build your app in Android Studio"


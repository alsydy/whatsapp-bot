#!/bin/bash

# سكريبت لإعداد nodejs-mobile

echo "🔧 Setting up nodejs-mobile..."

# إنشاء مجلدات assets
mkdir -p android/app/src/main/assets/nodejs/bin
mkdir -p android/app/src/main/assets/nodejs/lib/armeabi-v7a
mkdir -p android/app/src/main/assets/nodejs/lib/arm64-v8a
mkdir -p android/app/src/main/assets/nodejs/lib/x86
mkdir -p android/app/src/main/assets/nodejs/lib/x86_64

echo "📁 Created asset directories"

# نسخ server.js
if [ -f "server.js" ]; then
    cp server.js android/app/src/main/assets/
    echo "✅ Copied server.js"
else
    echo "❌ server.js not found!"
fi

# نسخ package.json
if [ -f "package.json" ]; then
    cp package.json android/app/src/main/assets/
    echo "✅ Copied package.json"
fi

echo ""
echo "📥 Next steps:"
echo "1. Download Node.js binaries from: https://github.com/JaneaSystems/nodejs-mobile/releases"
echo "2. Extract libnode.so for each architecture"
echo "3. Place them in: android/app/src/main/assets/nodejs/lib/[arch]/"
echo "4. Extract node binary and place in: android/app/src/main/assets/nodejs/bin/"
echo ""
echo "Or use the Gradle plugin method (recommended)"


@echo off
echo Setting up nodejs-mobile...

REM إنشاء مجلدات assets
if not exist "android\app\src\main\assets\nodejs\bin" mkdir "android\app\src\main\assets\nodejs\bin"
if not exist "android\app\src\main\assets\nodejs\lib\armeabi-v7a" mkdir "android\app\src\main\assets\nodejs\lib\armeabi-v7a"
if not exist "android\app\src\main\assets\nodejs\lib\arm64-v8a" mkdir "android\app\src\main\assets\nodejs\lib\arm64-v8a"
if not exist "android\app\src\main\assets\nodejs\lib\x86" mkdir "android\app\src\main\assets\nodejs\lib\x86"
if not exist "android\app\src\main\assets\nodejs\lib\x86_64" mkdir "android\app\src\main\assets\nodejs\lib\x86_64"

echo Created asset directories

REM نسخ server.js
if exist "server.js" (
    copy "server.js" "android\app\src\main\assets\" >nul
    echo Copied server.js
) else (
    echo server.js not found!
)

REM نسخ package.json
if exist "package.json" (
    copy "package.json" "android\app\src\main\assets\" >nul
    echo Copied package.json
)

echo.
echo Next steps:
echo 1. Download Node.js binaries from: https://github.com/JaneaSystems/nodejs-mobile/releases
echo 2. Extract libnode.so for each architecture
echo 3. Place them in: android\app\src\main\assets\nodejs\lib\[arch]\
echo 4. Extract node binary and place in: android\app\src\main\assets\nodejs\bin\
echo.
echo Or use the Gradle plugin method (recommended)
pause


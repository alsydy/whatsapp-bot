# سكريبت PowerShell لتحميل Gradle Wrapper

$gradleWrapperUrl = "https://raw.githubusercontent.com/gradle/gradle/v8.0.0/gradle/wrapper/gradle-wrapper.jar"
$gradleWrapperPath = "E:\whatsapp-bot\android\gradle\wrapper\gradle-wrapper.jar"

Write-Host "تحميل gradle-wrapper.jar..."

# إنشاء المجلد إذا لم يكن موجوداً
$wrapperDir = Split-Path -Parent $gradleWrapperPath
if (-not (Test-Path $wrapperDir)) {
    New-Item -ItemType Directory -Path $wrapperDir -Force | Out-Null
}

# تحميل الملف
try {
    Invoke-WebRequest -Uri $gradleWrapperUrl -OutFile $gradleWrapperPath
    Write-Host "✅ تم تحميل gradle-wrapper.jar بنجاح"
} catch {
    Write-Host "❌ فشل التحميل: $_"
    Write-Host ""
    Write-Host "يمكنك تحميله يدوياً من:"
    Write-Host "https://github.com/gradle/gradle/releases"
    Write-Host "وضعه في: $gradleWrapperPath"
}


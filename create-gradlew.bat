@echo off
echo ====================================
echo إنشاء Gradle Wrapper
echo ====================================
echo.

cd /d E:\whatsapp-bot\android

REM إنشاء gradlew.bat
(
echo @echo off
echo set DIRNAME=%%~dp0
echo if "%%DIRNAME%%" == "" set DIRNAME=.
echo set APP_BASE_NAME=%%~n0
echo set APP_HOME=%%DIRNAME%%
echo.
echo @rem Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
echo set DEFAULT_JVM_OPTS=
echo.
echo @rem Find java.exe
echo if defined JAVA_HOME goto findJavaFromJavaHome
echo.
echo set JAVA_EXE=java.exe
echo %%%%JAVA_EXE%%%% -version ^>nul 2^>^&1
echo if "%%%%ERRORLEVEL%%%%" == "0" goto execute
echo.
echo echo.
echo echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo echo.
echo echo Please set the JAVA_HOME variable in your environment to match the
echo echo location of your Java installation.
echo.
echo goto fail
echo.
echo :findJavaFromJavaHome
echo set JAVA_HOME=%%%%JAVA_HOME:"=%%%%
echo set JAVA_EXE=%%%%JAVA_HOME%%%%\bin\java.exe
echo.
echo if exist "%%%%JAVA_EXE%%%%" goto execute
echo.
echo echo.
echo echo ERROR: JAVA_HOME is set to an invalid directory: %%%%JAVA_HOME%%%%
echo echo.
echo echo Please set the JAVA_HOME variable in your environment to match the
echo echo location of your Java installation.
echo.
echo goto fail
echo.
echo :execute
echo @rem Setup the command line
echo.
echo set CLASSPATH=%%%%APP_HOME%%%%\gradle\wrapper\gradle-wrapper.jar
echo.
echo @rem Execute Gradle
echo "%%%%JAVA_EXE%%%%" %%%%DEFAULT_JVM_OPTS%%%% %%%%JAVA_OPTS%%%% %%%%GRADLE_OPTS%%%% -classpath "%%%%CLASSPATH%%%%" org.gradle.wrapper.GradleWrapperMain %%%%*
echo.
echo :end
echo @rem End local scope for the variables with windows NT shell
echo if %%%%ERRORLEVEL%%%% equ 0 goto mainEnd
echo.
echo :fail
echo rem Set variable GRADLE_EXIT_CONSOLE if you need the _script_ return code instead of
echo rem the _cmd.exe /c_ return code!
echo if not "" == "%%%%GRADLE_EXIT_CONSOLE%%%%" exit 1
echo exit /b 1
echo.
echo :mainEnd
echo if "%%%%OS%%%%" == "Windows_NT" endlocal
echo.
echo :omega
) > gradlew.bat

REM إنشاء gradlew (لـ Unix)
(
echo #!/bin/sh
echo.
echo ##############################################################################
echo ##
echo ##  Gradle start up script for UN*X
echo ##
echo ##############################################################################
echo.
echo # Attempt to set APP_HOME
echo.
echo # Resolve links: $0 may be a link
echo PRG="$0"
echo # Need this for relative symlinks.
echo while [ -h "$PRG" ] ; do
echo     ls=`ls -ld "$PRG"`
echo     link=`expr "$ls" : '.*-> \(.*\)$'`
echo     if expr "$link" : '/.*' ^> /dev/null; then
echo         PRG="$link"
echo     else
echo         PRG=`dirname "$PRG"`"/$link"
echo     fi
echo done
echo SAVED="`pwd`"
echo cd "`dirname \"$PRG\"`/" ^> /dev/null
echo APP_HOME="`pwd -P`"
echo cd "$SAVED" ^> /dev/null
echo.
echo APP_NAME="Gradle"
echo APP_BASE_NAME=`basename "$0"`
echo.
echo # Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
echo DEFAULT_JVM_OPTS='""'
echo.
echo # Use the maximum available, or set MAX_FD != -1 to use that value.
echo MAX_FD="maximum"
echo.
echo warn ^(^) {
echo     echo "$*"
echo }
echo.
echo die ^(^) {
echo     echo
echo     echo "$*"
echo     echo
echo     exit 1
echo }
echo.
echo # OS specific support ^(must be 'true' or 'false'^).
echo cygwin=false
echo msys=false
echo darwin=false
echo nonstop=false
echo case "`uname`" in
echo   CYGWIN^*^)
echo     cygwin=true
echo     ;;
echo   Darwin^*^)
echo     darwin=true
echo     ;;
echo   MINGW^*^)
echo     msys=true
echo     ;;
echo   NONSTOP^*^)
echo     nonstop=true
echo     ;;
echo esac
echo.
echo CLASSPATH=$APP_HOME/gradle/wrapper/gradle-wrapper.jar
echo.
echo exec "$JAVACMD" "$@"
) > gradlew

echo ✅ تم إنشاء gradlew.bat و gradlew
echo.
echo الخطوة التالية: تحميل gradle-wrapper.jar
echo.

pause


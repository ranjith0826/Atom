@echo off
set "SCRIPT_DIR=%~dp0"
set "JAVA_HOME=%SCRIPT_DIR%..\tools\jdk-21"
if not exist "%JAVA_HOME%\bin\java.exe" set "JAVA_HOME=%SCRIPT_DIR%tools\jdk-21"
set "MAVEN_HOME=%SCRIPT_DIR%..\tools\maven"
if not exist "%MAVEN_HOME%\bin\mvn.cmd" set "MAVEN_HOME=%SCRIPT_DIR%tools\maven"
set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"
"%MAVEN_HOME%\bin\mvn.cmd" %*

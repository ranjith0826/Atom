@echo off
set "SCRIPT_DIR=%~dp0"
set "JAVA_HOME=%SCRIPT_DIR%tools\jdk-21"
set "MAVEN_HOME=%SCRIPT_DIR%tools\maven"
set "PATH=%JAVA_HOME%\bin;%MAVEN_HOME%\bin;%PATH%"
"%MAVEN_HOME%\bin\mvn.cmd" -f "%SCRIPT_DIR%backend\pom.xml" %*

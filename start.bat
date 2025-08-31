@echo off
cls
cd /d %~dp0
npx ncu -u
npm install
cls
if not exist ".\src\config.json" copy ".\config.json" ".\src\config.json"
npx tsc
xcopy ".\node_modules" ".\dist\node_modules" /E /I /Y
copy /Y ".\package.json" ".\dist\package.json"
cd .\dist
npm run aurelia

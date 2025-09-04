@echo off
cls
cd /d %~dp0
npm install
cls
npx ncu -u
cls
copy /Y ".\config.json" ".\src\config.json"
npx tsc
xcopy ".\node_modules" ".\dist\node_modules" /E /I /Y
copy /Y ".\package.json" ".\dist\package.json"
cd .\dist
npm run aurelia

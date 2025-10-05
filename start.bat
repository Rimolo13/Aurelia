@echo off
cd /d %~dp0
npm install
copy /Y ".\config.json" ".\src\config.json"
npx tsc
copy /Y ".\package.json" ".\dist\package.json"
cd .\dist
npm install
npm run aurelia

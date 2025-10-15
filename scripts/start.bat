@echo off
cd ../
npm install
copy /Y ".\configuration/config.json" ".\src\config.json"
npx tsc
copy /Y ".\package.json" ".\dist\package.json"
cd .\dist
npm install
npm run aurelia

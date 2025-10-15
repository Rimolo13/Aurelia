@echo off
cd ../
npm install
npx tsc
copy /Y ".\package.json" ".\dist\package.json"
cd .\dist
npm install
npm run aurelia

@echo off
copy /Y ./config.json ./src
git reset --hard HEAD
git pull
copy /Y ./src/config.json .
npx ncu -u
npm install
cls
echo "Updated successfully!"
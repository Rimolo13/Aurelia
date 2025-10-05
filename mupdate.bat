@echo off
npx ncu -u
npm install
copy /Y ./config.json ./src
git reset --hard HEAD
git pull
copy /Y ./src/config.json .
cls
echo "Updated successfully!"
@echo off
cd ../
copy /Y ./configuration ./temp
git reset --hard HEAD
git pull
copy /Y ../temp ../configuration
npx ncu -u
npm install
cls
echo "Updated successfully!"
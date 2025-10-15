#!/bin/bash
cd ../
cp -r ./configuration ./temp
git reset --hard HEAD
git pull
cp -r ../temp ../configuration 
npx ncu -u
npm install
clear
echo "Updated successfully!"
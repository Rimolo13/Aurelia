#!/bin/bash
cd ../
cp ./config.json ./src
git reset --hard HEAD
git pull
cp ./src/config.json .
npx ncu -u
npm install
clear
echo "Updated successfully!"
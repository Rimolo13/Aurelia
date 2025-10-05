#!/bin/bash
npx ncu -u
npm install
cp ./config.json ./src
git reset --hard HEAD
git pull
cp ./src/config.json .
clear
echo "Updated successfully!"
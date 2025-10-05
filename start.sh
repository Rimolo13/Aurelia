#!/bin/bash
cd ./
npm install
npx ncu -u
npm install
cp ./config.json ./src
npx tsc
cp ./package.json ./dist
cd ./dist
npm install
npm run aurelia

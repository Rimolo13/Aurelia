#!/bin/bash
cd ../
npm install
npx tsc
cp ./package.json ./dist
cd ./dist
npm install
npm run aurelia

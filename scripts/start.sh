#!/bin/bash
cd ../
npm install
cp ./configuration/config.json ./src
npx tsc
cp ./package.json ./dist
cd ./dist
npm install
npm run aurelia

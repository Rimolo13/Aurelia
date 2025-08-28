#!/bin/bash

clear
cd ./
npm install
clear
cp ./config.json ./src
npx tsc
cp -r ./node_modules ./dist
cp ./package.json ./dist
cd ./dist
npm run dev

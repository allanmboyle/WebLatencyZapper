#!/usr/bin/bash

mkdir build
cp -R deployments/AzureDeployment build
cp -R public 		build/AzureDeployment/WebRole1
cp -R node_modules 	build/AzureDeployment/WebRole1
cp -R *.js 			build/AzureDeployment/WebRole1

echo Build complete
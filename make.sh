#!/usr/bin/bash

mkdir build
cp -R deployments/AzureDeployment build
cp -R public 		build/AzureDeployment/WebLatencyZapperWebRole
cp -R node_modules 	build/AzureDeployment/WebLatencyZapperWebRole
cp -R *.js 			build/AzureDeployment/WebLatencyZapperWebRole

echo Build complete
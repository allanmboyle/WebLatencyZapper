stop-azureemulator
rd build -recurse -force
bash make.sh
cd .\build\AzureDeployment\webrole1
copy web.cloud.sing.config web.cloud.config
remove-azuredeployment -servicename "weblatencyzappersing" -slot production -force
publish-azureserviceproject -servicename "weblatencyzappersing" -location "Southeast Asia" -slot production

cd ..\..\..
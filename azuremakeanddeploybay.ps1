stop-azureemulator
rd build -recurse -force
bash make.sh
cd .\build\AzureDeployment\webrole1
copy web.cloud.bay.config web.cloud.config
remove-azuredeployment -servicename "weblatencyzapperbay" -slot production -force
publish-azureserviceproject -servicename "weblatencyzapperbay" -location "West US" -slot production

cd ..\..\..
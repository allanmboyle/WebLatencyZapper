stop-azureemulator
rd build -recurse -force
bash make.sh
cd .\build\AzureDeployment\webrole1
copy web.cloud.bay.config web.cloud.config
start-azureemulator
remove-azuredeployment -servicename "myobweblatencyzapperbay" -slot production -force
publish-azureserviceproject -servicename "myobweblatencyzapperbay" -location "West US" -slot production
stop-azureemulator
del web.cloud.config
copy web.cloud.sing.config web.cloud.config
start-azureemulator
remove-azuredeployment -servicename "myobweblatencyzappersing" -slot production -force
publish-azureserviceproject -servicename "myobweblatencyzappersing" -location "Southeast Asia" -slot production

cd ..\..\..
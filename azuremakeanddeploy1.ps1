stop-azureemulator

rd build -recurse -force
bash make.sh
cd .\build\AzureDeployment\webrole1
start-azureemulator -launch

cd ..\..\..
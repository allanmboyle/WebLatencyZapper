<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="AzureDeployment" generation="1" functional="0" release="0" Id="2cd37d22-4ac8-4a21-81d6-f58cac35d81d" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="AzureDeploymentGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="WebLatencyZapperWebRole:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/AzureDeployment/AzureDeploymentGroup/LB:WebLatencyZapperWebRole:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="WebLatencyZapperWebRoleInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/AzureDeployment/AzureDeploymentGroup/MapWebLatencyZapperWebRoleInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:WebLatencyZapperWebRole:Endpoint1">
          <toPorts>
            <inPortMoniker name="/AzureDeployment/AzureDeploymentGroup/WebLatencyZapperWebRole/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapWebLatencyZapperWebRoleInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/AzureDeployment/AzureDeploymentGroup/WebLatencyZapperWebRoleInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="WebLatencyZapperWebRole" generation="1" functional="0" release="0" software="C:\Users\VIRTUAL\Documents\GitHub\WebLatencyZapper\AzureDeployment\local_package.csx\roles\WebLatencyZapperWebRole" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaIISHost.exe " memIndex="1792" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="80" />
            </componentports>
            <settings>
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;WebLatencyZapperWebRole&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;WebLatencyZapperWebRole&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/AzureDeployment/AzureDeploymentGroup/WebLatencyZapperWebRoleInstances" />
            <sCSPolicyFaultDomainMoniker name="/AzureDeployment/AzureDeploymentGroup/WebLatencyZapperWebRoleFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyFaultDomain name="WebLatencyZapperWebRoleFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="WebLatencyZapperWebRoleInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="2d9fbe5b-f78f-4766-bfb4-c0b9899df910" ref="Microsoft.RedDog.Contract\ServiceContract\AzureDeploymentContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="6070d296-f396-4f4c-9086-85d16e4e0ee4" ref="Microsoft.RedDog.Contract\Interface\WebLatencyZapperWebRole:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/AzureDeployment/AzureDeploymentGroup/WebLatencyZapperWebRole:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>
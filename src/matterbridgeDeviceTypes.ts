/**
 * This file contains the class MatterbridgeDevice.
 *
 * @file matterbridgeDeviceTypes.ts
 * @author Luca Liguori
 * @date 2024-11-08
 * @version 1.0.0
 *
 * Copyright 2024, 2025, 2026 Luca Liguori.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. *
 */

// @matter
import {
  AirQuality,
  BooleanState,
  BooleanStateConfiguration,
  BridgedDeviceBasicInformation,
  CarbonDioxideConcentrationMeasurement,
  CarbonMonoxideConcentrationMeasurement,
  ColorControl,
  DeviceEnergyManagement,
  DeviceEnergyManagementMode,
  DoorLock,
  ElectricalEnergyMeasurement,
  ElectricalPowerMeasurement,
  EnergyPreference,
  FanControl,
  FlowMeasurement,
  FormaldehydeConcentrationMeasurement,
  Groups,
  Identify,
  IlluminanceMeasurement,
  LevelControl,
  ModeSelect,
  NitrogenDioxideConcentrationMeasurement,
  OccupancySensing,
  OnOff,
  OzoneConcentrationMeasurement,
  Pm10ConcentrationMeasurement,
  Pm1ConcentrationMeasurement,
  Pm25ConcentrationMeasurement,
  PowerSource,
  PowerTopology,
  PressureMeasurement,
  RadonConcentrationMeasurement,
  RelativeHumidityMeasurement,
  SmokeCoAlarm,
  SwitchCluster,
  TemperatureMeasurement,
  Thermostat,
  ThermostatUserInterfaceConfiguration,
  TimeSynchronization,
  TotalVolatileOrganicCompoundsConcentrationMeasurement,
  WindowCovering,
  ValveConfigurationAndControl,
  HepaFilterMonitoring,
  ActivatedCarbonFilterMonitoring,
  Actions,
  FixedLabel,
  RvcRunMode,
  RvcOperationalState,
  RvcCleanMode,
} from '@matter/main/clusters';

// @project-chip
import { DeviceClasses, DeviceTypeDefinition } from '@project-chip/matter.js/device';

// Matter 1.0 and 1.1 device types

export const bridge = DeviceTypeDefinition({
  name: 'MA-aggregator',
  code: 0x000e,
  deviceClass: DeviceClasses.Dynamic,
  revision: 1,
  optionalServerClusters: [Identify.Cluster.id, Actions.Cluster.id],
});

export const powerSource = DeviceTypeDefinition({
  name: 'MA-powerSource',
  code: 0x0011,
  deviceClass: DeviceClasses.Utility,
  revision: 1,
  requiredServerClusters: [PowerSource.Cluster.id],
  optionalServerClusters: [],
});

export const bridgedNode = DeviceTypeDefinition({
  name: 'MA-bridgedNode',
  code: 0x0013,
  deviceClass: DeviceClasses.Utility,
  revision: 2,
  requiredServerClusters: [BridgedDeviceBasicInformation.Cluster.id],
  optionalServerClusters: [PowerSource.Cluster.id],
});

export const genericSwitch = DeviceTypeDefinition({
  name: 'MA-genericswitch',
  code: 0x000f,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [Identify.Cluster.id, SwitchCluster.id],
  optionalServerClusters: [FixedLabel.Cluster.id],
});

export const onOffLight = DeviceTypeDefinition({
  name: 'MA-onofflight',
  code: 0x0100,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, Groups.Cluster.id, /* Scenes.Cluster.id,*/ OnOff.Cluster.id],
  optionalServerClusters: [LevelControl.Cluster.id, ColorControl.Cluster.id],
});

export const dimmableLight = DeviceTypeDefinition({
  name: 'MA-dimmablelight',
  code: 0x0101,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, Groups.Cluster.id, /* Scenes.Cluster.id,*/ OnOff.Cluster.id, LevelControl.Cluster.id],
  optionalServerClusters: [ColorControl.Cluster.id],
});

export const colorTemperatureLight = DeviceTypeDefinition({
  name: 'MA-colortemperaturelight',
  code: 0x010c,
  deviceClass: DeviceClasses.Simple,
  revision: 4,
  requiredServerClusters: [Identify.Cluster.id, Groups.Cluster.id, /* Scenes.Cluster.id,*/ OnOff.Cluster.id, LevelControl.Cluster.id, ColorControl.Cluster.id],
  optionalServerClusters: [],
});

export const onOffOutlet = DeviceTypeDefinition({
  name: 'MA-onoffpluginunit',
  code: 0x010a,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, Groups.Cluster.id, /* Scenes.Cluster.id,*/ OnOff.Cluster.id],
  optionalServerClusters: [LevelControl.Cluster.id],
});

export const dimmableOutlet = DeviceTypeDefinition({
  name: 'MA-dimmablepluginunit',
  code: 0x010b,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, Groups.Cluster.id, /* Scenes.Cluster.id,*/ OnOff.Cluster.id, LevelControl.Cluster.id],
  optionalServerClusters: [],
});

export const doorLockDevice = DeviceTypeDefinition({
  name: 'MA-doorLock',
  code: 0xa,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, DoorLock.Cluster.id],
  optionalServerClusters: [Groups.Cluster.id /* , Scenes.Cluster.id,*/],
});

export const coverDevice = DeviceTypeDefinition({
  name: 'MA-windowCovering',
  code: 0x202,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, WindowCovering.Cluster.id],
  optionalServerClusters: [Groups.Cluster.id /* , Scenes.Cluster.id,*/],
});

export const fanDevice = DeviceTypeDefinition({
  name: 'MA-fan',
  code: 0x2b,
  deviceClass: DeviceClasses.Simple,
  revision: 2,
  requiredServerClusters: [Identify.Cluster.id, FanControl.Cluster.id],
  optionalServerClusters: [Groups.Cluster.id /* , Scenes.Cluster.id,*/],
});

export const thermostatDevice = DeviceTypeDefinition({
  name: 'MA-thermostat',
  code: 0x301,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, Thermostat.Cluster.id],
  optionalServerClusters: [Groups.Cluster.id /* , Scenes.Cluster.id,*/, ThermostatUserInterfaceConfiguration.Cluster.id, EnergyPreference.Cluster.id, TimeSynchronization.Cluster.id],
});

export const contactSensor = DeviceTypeDefinition({
  name: 'MA-contactsensor',
  code: 0x0015,
  deviceClass: DeviceClasses.Simple,
  revision: 2,
  requiredServerClusters: [Identify.Cluster.id, BooleanState.Cluster.id],
});

export const lightSensor = DeviceTypeDefinition({
  name: 'MA-lightsensor',
  code: 0x0106,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, IlluminanceMeasurement.Cluster.id],
  optionalClientClusters: [Groups.Cluster.id],
});

export const occupanceySensor = DeviceTypeDefinition({
  name: 'MA-occupancysensor',
  code: 0x0107,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, OccupancySensing.Cluster.id],
});

export const temperatureSensor = DeviceTypeDefinition({
  name: 'MA-tempsensor',
  code: 0x0302,
  deviceClass: DeviceClasses.Simple,
  revision: 2,
  requiredServerClusters: [Identify.Cluster.id, TemperatureMeasurement.Cluster.id],
});

export const pressureSensor = DeviceTypeDefinition({
  name: 'MA-pressuresensor',
  code: 0x0305,
  deviceClass: DeviceClasses.Simple,
  revision: 2,
  requiredServerClusters: [Identify.Cluster.id, PressureMeasurement.Cluster.id],
});

export const flowSensor = DeviceTypeDefinition({
  name: 'MA-flowsensor',
  code: 0x0306,
  deviceClass: DeviceClasses.Simple,
  revision: 2,
  requiredServerClusters: [Identify.Cluster.id, FlowMeasurement.Cluster.id],
});

export const humiditySensor = DeviceTypeDefinition({
  name: 'MA-humiditysensor',
  code: 0x0307,
  deviceClass: DeviceClasses.Simple,
  revision: 2,
  requiredServerClusters: [Identify.Cluster.id, RelativeHumidityMeasurement.Cluster.id],
});

export const modeSelect = DeviceTypeDefinition({
  name: 'MA-modeselect',
  code: 0x27,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [ModeSelect.Cluster.id],
});

export const roboticVacuumCleaner = DeviceTypeDefinition({
  name: 'MA-roboticvacuumcleaner',
  code: 0x74,
  deviceClass: DeviceClasses.Simple,
  revision: 2,
  requiredServerClusters: [Identify.Cluster.id, RvcRunMode.Cluster.id, RvcOperationalState.Cluster.id],
  optionalServerClusters: [RvcCleanMode.Cluster.id],
});

// Custom device types without ClientClusters

export const onOffSwitch = DeviceTypeDefinition({
  name: 'MA-onoffswitch',
  code: 0x0103,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, Groups.Cluster.id, /* Scenes.Cluster.id,*/ OnOff.Cluster.id],
  optionalServerClusters: [LevelControl.Cluster.id, ColorControl.Cluster.id],
});

export const dimmableSwitch = DeviceTypeDefinition({
  name: 'MA-dimmableswitch',
  code: 0x0104,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, Groups.Cluster.id, /* Scenes.Cluster.id,*/ OnOff.Cluster.id, LevelControl.Cluster.id],
  optionalServerClusters: [ColorControl.Cluster.id],
});

export const colorTemperatureSwitch = DeviceTypeDefinition({
  name: 'MA-colortemperatureswitch',
  code: 0x0105,
  deviceClass: DeviceClasses.Simple,
  revision: 3,
  requiredServerClusters: [Identify.Cluster.id, Groups.Cluster.id, /* Scenes.Cluster.id,*/ OnOff.Cluster.id, LevelControl.Cluster.id, ColorControl.Cluster.id],
  optionalServerClusters: [],
});

// Matter 1.2 and 1.3 device types

export const airQualitySensor = DeviceTypeDefinition({
  name: 'MA-airQualitySensor',
  code: 0x002c,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [Identify.Cluster.id, AirQuality.Cluster.id],
  optionalServerClusters: [
    TemperatureMeasurement.Cluster.id,
    RelativeHumidityMeasurement.Cluster.id,
    CarbonMonoxideConcentrationMeasurement.Cluster.id,
    CarbonDioxideConcentrationMeasurement.Cluster.id,
    NitrogenDioxideConcentrationMeasurement.Cluster.id,
    OzoneConcentrationMeasurement.Cluster.id,
    FormaldehydeConcentrationMeasurement.Cluster.id,
    Pm1ConcentrationMeasurement.Cluster.id,
    Pm25ConcentrationMeasurement.Cluster.id,
    Pm10ConcentrationMeasurement.Cluster.id,
    RadonConcentrationMeasurement.Cluster.id,
    TotalVolatileOrganicCompoundsConcentrationMeasurement.Cluster.id,
  ],
});

export const waterFreezeDetector = DeviceTypeDefinition({
  name: 'MA-waterFreezeDetector',
  code: 0x0041,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [Identify.Cluster.id, BooleanState.Cluster.id],
  optionalServerClusters: [BooleanStateConfiguration.Cluster.id],
});

export const waterLeakDetector = DeviceTypeDefinition({
  name: 'MA-waterLeakDetector',
  code: 0x0043,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [Identify.Cluster.id, BooleanState.Cluster.id],
  optionalServerClusters: [BooleanStateConfiguration.Cluster.id],
});

export const rainSensor = DeviceTypeDefinition({
  name: 'MA-rainSensor',
  code: 0x0044,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [Identify.Cluster.id, BooleanState.Cluster.id],
  optionalServerClusters: [BooleanStateConfiguration.Cluster.id],
});

// Remark:  A Smoke CO Alarm device type SHALL support an instance of a Power Source device type on some endpoint.
export const smokeCoAlarm = DeviceTypeDefinition({
  name: 'MA-smokeCoAlarm',
  code: 0x0076,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [Identify.Cluster.id, SmokeCoAlarm.Cluster.id],
  optionalServerClusters: [Groups.Cluster.id, TemperatureMeasurement.Cluster.id, RelativeHumidityMeasurement.Cluster.id, CarbonMonoxideConcentrationMeasurement.Cluster.id],
});

export const waterValve = DeviceTypeDefinition({
  name: 'MA-waterValve',
  code: 0x42,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [Identify.Cluster.id, ValveConfigurationAndControl.Cluster.id],
  optionalServerClusters: [FlowMeasurement.Cluster.id],
});

export const airPurifier = DeviceTypeDefinition({
  name: 'MA-airPurifier',
  code: 0x2d,
  deviceClass: DeviceClasses.Simple,
  revision: 1,
  requiredServerClusters: [Identify.Cluster.id, FanControl.Cluster.id],
  optionalServerClusters: [Groups.Cluster.id, HepaFilterMonitoring.Cluster.id, ActivatedCarbonFilterMonitoring.Cluster.id],
});

export const electricalSensor = DeviceTypeDefinition({
  name: 'MA-electricalSensor',
  code: 0x0510,
  deviceClass: DeviceClasses.Utility,
  revision: 1,
  requiredServerClusters: [PowerTopology.Cluster.id],
  optionalServerClusters: [ElectricalPowerMeasurement.Cluster.id, ElectricalEnergyMeasurement.Cluster.id],
});

export const deviceEnergyManagement = DeviceTypeDefinition({
  name: 'MA-deviceEnergyManagement',
  code: 0x050d,
  deviceClass: DeviceClasses.Utility,
  revision: 1,
  requiredServerClusters: [DeviceEnergyManagement.Cluster.id, DeviceEnergyManagementMode.Cluster.id],
  optionalServerClusters: [],
});

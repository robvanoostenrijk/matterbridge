/**
 * This file contains the class MatterbridgeAccessoryPlatform.
 *
 * @file matterbridgePlatform.ts
 * @author Luca Liguori
 * @date 2024-03-21
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

// Matterbridge
import { Matterbridge } from './matterbridge.js';
import { MatterbridgeDevice } from './matterbridgeDevice.js';

// AnsiLogger module
import { AnsiLogger, LogLevel } from 'node-ansi-logger';
import { MatterbridgeEndpoint } from './matterbridgeEndpoint.js';

// Platform types
export type PlatformConfigValue = string | number | boolean | bigint | object | undefined | null;

export type PlatformConfig = Record<string, PlatformConfigValue>;

export type PlatformSchemaValue = string | number | boolean | bigint | object | undefined | null;

export type PlatformSchema = Record<string, PlatformSchemaValue>;

/**
 * Represents the base Matterbridge platform.
 *
 */
export class MatterbridgePlatform {
  public matterbridge: Matterbridge;
  public log: AnsiLogger;
  public config: PlatformConfig = {};
  public name = ''; // Will be set by the loadPlugin() method using the package.json value.
  public type = ''; // Will be set by the extending classes.
  public version = ''; // Will be set by the loadPlugin() method using the package.json value.

  /**
   * Creates an instance of the base MatterbridgePlatform.
   * @param {Matterbridge} matterbridge - The Matterbridge instance.
   * @param {AnsiLogger} log - The logger instance.
   * @param {PlatformConfig} config - The platform configuration.
   */
  constructor(matterbridge: Matterbridge, log: AnsiLogger, config: PlatformConfig) {
    this.matterbridge = matterbridge;
    this.log = log;
    this.config = config;
  }

  /**
   * This method must be overridden in the extended class.
   * It is called when the platform is started.
   * Use this method to create the MatterbridgeDevice and call this.registerDevice().
   * @param {string} [reason] - The reason for starting.
   * @throws {Error} - Throws an error if the method is not overridden.
   */
  async onStart(reason?: string) {
    this.log.error('Plugins must override onStart.', reason);
    throw new Error('Plugins must override onStart.');
  }

  /**
   * This method can be overridden in the extended class.
   * It is called after the platform has been commissioned.
   * Use this method to perform any configuration of your devices.
   */
  async onConfigure() {
    this.log.debug("The plugin doesn't override onConfigure.");
  }

  /**
   * This method can be overridden in the extended class.
   * It is called when the platform is shutting down.
   * Use this method to clean up any resources.
   * @param {string} [reason] - The reason for shutting down.
   */
  async onShutdown(reason?: string) {
    this.log.debug("The plugin doesn't override onShutdown.", reason);
  }

  /**
   * Sets the logger level and logs a debug message indicating that the plugin doesn't override this method.
   * @param {LogLevel} logLevel The new logger level.
   */
  async onChangeLoggerLevel(logLevel: LogLevel) {
    this.log.debug(`The plugin doesn't override onChangeLoggerLevel. Logger level set to: ${logLevel}`);
  }

  /**
   * Registers a device with the Matterbridge platform.
   * @param {MatterbridgeDevice} device - The device to register.
   */
  async registerDevice(device: MatterbridgeDevice | MatterbridgeEndpoint) {
    device.plugin = this.name;
    if (device instanceof MatterbridgeDevice) await this.matterbridge.addBridgedDevice(this.name, device);
    if (device instanceof MatterbridgeEndpoint) await this.matterbridge.addBridgedEndpoint(this.name, device);
  }

  /**
   * Unregisters a device registered with the Matterbridge platform.
   * @param {MatterbridgeDevice} device - The device to unregister.
   */
  async unregisterDevice(device: MatterbridgeDevice | MatterbridgeEndpoint) {
    if (device instanceof MatterbridgeDevice) await this.matterbridge.removeBridgedDevice(this.name, device);
    if (device instanceof MatterbridgeEndpoint) await this.matterbridge.removeBridgedEndpoint(this.name, device);
  }

  /**
   * Unregisters all devices registered with the Matterbridge platform.
   */
  async unregisterAllDevices() {
    await this.matterbridge.removeAllBridgedDevices(this.name);
  }

  /**
   * Verifies if the Matterbridge version meets the required version.
   * @param {string} requiredVersion - The required version to compare against.
   * @returns {boolean} True if the Matterbridge version meets or exceeds the required version, false otherwise.
   */
  verifyMatterbridgeVersion(requiredVersion: string): boolean {
    const compareVersions = (matterbridgeVersion: string, requiredVersion: string): boolean => {
      const stripTag = (v: string) => {
        const parts = v.split('-');
        return parts.length > 0 ? parts[0] : v;
      };
      const v1Parts = stripTag(matterbridgeVersion).split('.').map(Number);
      const v2Parts = stripTag(requiredVersion).split('.').map(Number);
      for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
        const v1Part = v1Parts[i] || 0;
        const v2Part = v2Parts[i] || 0;
        if (v1Part < v2Part) {
          return false;
        } else if (v1Part > v2Part) {
          return true;
        }
      }
      return true;
    };

    if (!compareVersions(this.matterbridge.matterbridgeVersion, requiredVersion)) return false;
    return true;
  }
}

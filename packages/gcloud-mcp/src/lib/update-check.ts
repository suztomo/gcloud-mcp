/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import chalk from 'chalk';
// import { env } from 'node:process';
// import { resolve } from './promise.js';
import { createRequire } from 'node:module';
import logger from './logger.js';



const require = createRequire(import.meta.url);

export const checkForUpdates = async (manifest: object): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports, no-restricted-syntax
  // const checkForUpdate = require('update-check');
  // Do not check for updates if the `NO_UPDATE_CHECK` variable is set.
  // if (env.NO_UPDATE_CHECK) return;

  // let update = null;

  // try {
  //   [, update] = await resolve(checkForUpdate(manifest));
  // } catch (error) {
  //   console.error(`Failed to check for updates: ${error}`);
  // }


  // if (!update) return;

  // If a newer version is available, tell the user.
  logger.error('MCP server started and listening for requests.');

  // console.log(
  //   chalk.bgRed.white(' UPDATE '),
  //   `The latest version of 'gcloud-mcp' is 1.0.0`
  // );
};

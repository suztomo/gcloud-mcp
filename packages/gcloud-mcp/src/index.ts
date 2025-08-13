#!/usr/bin/env node

/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import pkg from '../package.json' with { type: 'json' };
import { createRunGcloudCommand } from './tools/run_gcloud_command.js';
import * as gcloud from './gcloud.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';
import { init } from './commands/init.js';

interface GcloudMcpConfig {
  run_gcloud_command?: {
    allowlist?: string[];
    denylist?: string[];
  };
}

export const default_denylist: string[] = [
  'compute start-iap-tunnel',
  'compute connect-to-serial-port',
  'compute tpus tpu-vm ssh',
  'compute tpus queued-resources ssh',
  'compute ssh',
  'cloud-shell ssh',
  'workstations ssh',
  'app instances ssh',
  'app',
  'alpha bms',
  'beta ai',
];

const main = async () => {
  yargs(hideBin(process.argv))
    .command(
      '$0',
      'Run the gcloud mcp server',
      (yargs) =>
        yargs
          .option('config', {
            type: 'string',
            description: 'Path to a JSON configuration file (must be an absolute path).',
          })
          .version(pkg.version),
      async (argv) => {
        const isAvailable = await gcloud.isAvailable();
        if (!isAvailable) {
          console.error('Unable to start gcloud mcp server: gcloud executable not found.');
          process.exit(1);
        }

        let config: GcloudMcpConfig = {};
        if (argv.config) {
          if (!path.isAbsolute(argv.config)) {
            console.error('Error: The --config path must be an absolute file path.');
            process.exit(1);
          }
          try {
            const rawConfig = fs.readFileSync(argv.config, 'utf-8');
            config = JSON.parse(rawConfig);
          } catch (e) {
            console.error(`Error reading or parsing config file: ${e}`);
            process.exit(1);
          }
        }

        const allowlist = config.run_gcloud_command?.allowlist || [];
        const denylist = config.run_gcloud_command?.denylist || [];

        const mergedDenylist = [...new Set([...default_denylist, ...denylist])];

        const server = new McpServer({
          name: 'gcloud-mcp-server',
          version: pkg.version,
        });
        createRunGcloudCommand(allowlist, mergedDenylist).register(server);
        await server.connect(new StdioServerTransport());
        console.log('🚀 gcloud mcp server started');
      },
    )
    .command(init)
    .version(false)
    .help()
    .parse();
};

main();

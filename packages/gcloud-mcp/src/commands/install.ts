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

import { initializeGeminiCLI } from './install-gemini-cli.js';
import { ArgumentsCamelCase, CommandModule } from 'yargs';

interface InstallArgs {
  item: 'gemini-cli';
}

export const install: CommandModule<object, InstallArgs> = {
  command: 'install <item>',
  describe: 'Install a component',
  builder: (yargs) =>
    yargs.positional('item', {
      describe: '',
      description: 'The component to install. Currently only `gemini-cli` is supported, which installs the gcloud-mcp server as a Gemini CLI extension.',
      choices: ['gemini-cli'] as const,
      demandOption: true,
    }),
  handler: async (argv: ArgumentsCamelCase<InstallArgs>) => {
    if (argv.item === 'gemini-cli') {
      await initializeGeminiCLI();
    }
  },
};
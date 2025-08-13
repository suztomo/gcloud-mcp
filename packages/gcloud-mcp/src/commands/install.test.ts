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

import { test, expect, vi } from 'vitest';
import yargs from 'yargs';
import { install } from './install.js';
import * as installGeminiCli from './install-gemini-cli.js';

vi.mock('./install-gemini-cli.js', () => ({
  initializeGeminiCLI: vi.fn(),
}));

test('install command should call initializeGeminiCLI for gemini-cli', async () => {
  const parser = yargs().command(install);

  await parser.parseAsync('install gemini-cli');

  expect(installGeminiCli.initializeGeminiCLI).toHaveBeenCalled();
});

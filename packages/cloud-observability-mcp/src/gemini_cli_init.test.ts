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

import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { initializeGeminiCLI } from './gemini_cli_init.js';
import { vol } from 'memfs';
import pkg from '../package.json' with { type: 'json' };

vi.mock('fs/promises', async () => {
  const memfs = await vi.importActual<typeof import('memfs')>('memfs');
  return memfs.fs.promises;
});

describe('initializeGeminiCLI', () => {
  const CWD = '/test/cwd';

  beforeEach(() => {
    process.env['INIT_CWD'] = CWD;
    vol.fromJSON({
      '/usr/local/google/home/wjacquette/gcloud-mcp/packages/cloud-observability-mcp/GEMINI-extension.md':
        'gemini md content',
    });
  });

  afterEach(() => {
    vol.reset();
    delete process.env['INIT_CWD'];
    vi.restoreAllMocks();
  });

  it('should create the extension directory', async () => {
    await initializeGeminiCLI();
    const expectedDir = `${CWD}/.gemini/extensions/cloud-observability-mcp`;
    expect(vol.existsSync(expectedDir)).toBe(true);
  });

  it('should write the gemini-extension.json file', async () => {
    await initializeGeminiCLI();
    const expectedFile = `${CWD}/.gemini/extensions/cloud-observability-mcp/gemini-extension.json`;
    expect(vol.existsSync(expectedFile)).toBe(true);

    const fileContent = vol.readFileSync(expectedFile, 'utf-8');
    const parsedContent = JSON.parse(fileContent as string);

    expect(parsedContent).toEqual({
      name: pkg.name,
      version: pkg.version,
      description: 'A new MCP-compatible server.',
      contextFileName: 'GEMINI.md',
      mcpServers: {
        'cloud-observability-mcp': {
          command: 'npm',
          args: ['start', '-w', 'cloud-observability-mcp'],
        },
      },
    });
  });

  it('should copy the GEMINI.md file', async () => {
    await initializeGeminiCLI();
    const expectedFile = `${CWD}/.gemini/extensions/cloud-observability-mcp/GEMINI.md`;
    expect(vol.existsSync(expectedFile)).toBe(true);
    const fileContent = vol.readFileSync(expectedFile, 'utf-8');
    expect(fileContent).toBe('gemini md content');
  });
});

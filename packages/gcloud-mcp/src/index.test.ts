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

import { test, expect, vi, beforeEach } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createRunGcloudCommand } from './tools/run_gcloud_command.js';
import * as gcloud from './gcloud.js';
import { initializeGeminiCLI } from './gemini-cli-init.js';

vi.mock('../package.json', () => ({
  default: {
    version: '0.1.0',
  },
}));
vi.mock('@modelcontextprotocol/sdk/server/mcp.js');
vi.mock('@modelcontextprotocol/sdk/server/stdio.js');

const registerToolSpy = vi.fn();
vi.mock('./tools/run_gcloud_command.js', () => ({
  createRunGcloudCommand: vi.fn(() => ({
    register: registerToolSpy,
  })),
}));
vi.mock('./gcloud.js');
vi.mock('./gemini-cli-init.js');

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  registerToolSpy.mockClear();
});

test('should initialize Gemini CLI when --gemini-cli-init is provided', async () => {
  process.argv = ['node', 'index.js', '--gemini-cli-init'];
  await import('./index.js');
  expect(initializeGeminiCLI).toHaveBeenCalled();
});

test('should log a message if gcloud is not available', async () => {
  process.argv = ['node', 'index.js'];
  vi.spyOn(gcloud, 'isAvailable').mockResolvedValue(false);
  const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  await import('./index.js');
  expect(gcloud.isAvailable).toHaveBeenCalled();
  expect(consoleLogSpy).toHaveBeenCalledWith(
    'Unable to start gcloud mcp server: gcloud executable not found.'
  );
  consoleLogSpy.mockRestore();
});

test('should start the McpServer if gcloud is available', async () => {
  process.argv = ['node', 'index.js'];
  vi.spyOn(gcloud, 'isAvailable').mockResolvedValue(true);
  await import('./index.js');
  expect(gcloud.isAvailable).toHaveBeenCalled();
  expect(McpServer).toHaveBeenCalledWith({
    name: 'gcloud-mcp-server',
    version: '0.1.0',
  });
  expect(createRunGcloudCommand).toHaveBeenCalledWith([], []);
  expect(registerToolSpy).toHaveBeenCalledWith(
    vi.mocked(McpServer).mock.instances[0]
  );
  const serverInstance = vi.mocked(McpServer).mock.instances[0];
  expect(serverInstance.connect).toHaveBeenCalledWith(
    expect.any(StdioServerTransport)
  );
});
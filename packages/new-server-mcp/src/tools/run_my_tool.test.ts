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
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import { createRunMyTool } from './run_my_tool.js';

vi.mock('../gcloud.js');
vi.mock('child_process');

const mockServer = {
  registerTool: vi.fn(),
} as unknown as McpServer;

const getToolImplementation = () => {
  expect(mockServer.registerTool).toHaveBeenCalledOnce();
  return (mockServer.registerTool as Mock).mock.calls[0]![2];
};

const createTool = () => {
  createRunMyTool().register(mockServer);
  return getToolImplementation();
};

describe('createRunMyTool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('random behavior', () => {
    test('definitely does something', async () => {
      const tool = createTool();
      const inputArgs = ['a', 'b', 'c'];

      const result = await tool({ args: inputArgs });

      expect(result).toBeDefined();
    });
  });
});

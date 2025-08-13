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

import { test, expect, vi, Mock, beforeEach, describe } from 'vitest';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createRunGcloudCommand } from './run_gcloud_command.js';
import * as gcloud from '../gcloud.js';

vi.mock('../gcloud.js');
vi.mock('child_process');
vi.mock('child_process');

const mockServer = {
  registerTool: vi.fn(),
} as unknown as McpServer;

const getToolImplementation = () => {
  expect(mockServer.registerTool).toHaveBeenCalledOnce();
  return (mockServer.registerTool as Mock).mock.calls[0]![2];
};

describe('createRunGcloudCommand', () => {
  let gcloudInvoke: Mock;
  let gcloudSpawnMock: Mock;
  let gcloudSpawnMock: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    gcloudInvoke = gcloud.invoke as Mock;
    gcloudSpawnMock = gcloud.spawnGcloudMetaLint as Mock;
  });

  describe('with allowlist', () => {
    test('invokes gcloud for allowlisted command', async () => {
      const allowlist = ['a b'];
      const inputArgs = ['gcloud', 'a', 'b', 'c'];
      createRunGcloudCommand(allowlist).register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudInvoke.mockResolvedValue({
        code: 0,
        stdout: 'output',
        stderr: '',
      });
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({ args: inputArgs.slice(1) });

      expect(gcloudInvoke).toHaveBeenCalledWith(inputArgs.slice(1));
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'gcloud process exited with code 0. stdout:\noutput',
          },
        ],
      });
    });

    test('returns error for non-allowlisted command', async () => {
      const allowlist = ['a b'];
      createRunGcloudCommand(allowlist).register(mockServer);
      const inputArgs = ['a', 'c'];
      const inputArgs = ['a', 'c'];
      const toolImplementation = getToolImplementation();
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({ args: inputArgs });

      expect(gcloudInvoke).not.toHaveBeenCalled();
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: `Command is not part of this tool's current allowlist of enabled commands.`,
          },
        ],
      });
    });
  });

  describe('with denylist', () => {
    test('returns error for denylisted command', async () => {
      const denylist = ['compute', 'list'];
      const inputArgs = ['compute', 'list', '--zone', 'eastus1'];
      const denylist = ['compute', 'list'];
      const inputArgs = ['compute', 'list', '--zone', 'eastus1'];
      createRunGcloudCommand([], denylist).register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({
        args: inputArgs,
      });

      expect(gcloudInvoke).not.toHaveBeenCalled();
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: `Command is part of this tool's current denylist of disabled commands.`,
          },
        ],
      });
    });

    test('invokes gcloud for non-denylisted command', async () => {
      const denylist = ['compute list'];
      const inputArgs = ['compute', 'create'];
      createRunGcloudCommand([], denylist).register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudInvoke.mockResolvedValue({
        code: 0,
        stdout: 'output',
        stderr: '',
      });
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({ args: inputArgs });
      expect(gcloudInvoke).toHaveBeenCalledWith(inputArgs);
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'gcloud process exited with code 0. stdout:\noutput',
          },
        ],
      });
    });

    test('returns error for denylisted command with alpha release track', async () => {
      const denylist = ['alpha'];
      const inputArgs = ['alpha', 'compute', 'list'];
      createRunGcloudCommand([], denylist).register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "gcloud ' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({
        args: inputArgs,
      });

      expect(gcloudInvoke).not.toHaveBeenCalled();
      expect(result).toEqual({
        content: [{ type: 'text', text: "Command is part of this tool's current denylist of disabled commands." }],
      });
    });

    test('returns error for denylisted command with beta release track', async () => {
      const denylist = ['beta'];
      const inputArgs = ['beta', 'compute', 'instance'];
      createRunGcloudCommand([], denylist).register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "gcloud ' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({
        args: inputArgs,
      });

      expect(gcloudInvoke).not.toHaveBeenCalled();
      expect(result).toEqual({
        content: [{ type: 'text', text: "Command is part of this tool's current denylist of disabled commands." }],
      });
    });
    test('returns error for denylisted command with preview release track', async () => {
      const denylist = ['preview'];
      const inputArgs = ['preview', 'compute', 'create'];
      createRunGcloudCommand([], denylist).register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "gcloud ' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({
        args: inputArgs,
      });

      expect(gcloudInvoke).not.toHaveBeenCalled();
      expect(result).toEqual({
        content: [{ type: 'text', text: "Command is part of this tool's current denylist of disabled commands." }],
      });
    });

    test('returns error for denylisted command when command is denied', async () => {
      const denylist = ['compute'];
      const inputArgs = ['preview', 'compute', 'create'];
      createRunGcloudCommand([], denylist).register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({
        args: inputArgs,
      });

      expect(gcloudInvoke).not.toHaveBeenCalled();
      expect(result).toEqual({
        content: [{ type: 'text', text: "Command is part of this tool's current denylist of disabled commands." }],
      });
    });

    test('returns error when ga command is denied. All other variations should be denied', async () => {
      const denylist = ['compute', 'list'];
      createRunGcloudCommand([], denylist).register(mockServer);
      const toolImplementation = getToolImplementation();

      const variations = ['alpha', 'beta', 'preview', ''];

      for (const version of variations) {
        const inputArgs = [version, 'compute', 'list'].filter(Boolean);
        gcloudSpawnMock.mockResolvedValue({
          code: 0,
          stdout: '[{"command_string_no_args": "gcloud ' + inputArgs.join(' ') + '"}]',
          stderr: '',
        });

        const result = await toolImplementation({
          args: inputArgs,
        });

        expect(gcloudInvoke).not.toHaveBeenCalled();
        expect(result).toEqual({
          content: [{ type: 'text', text: "Command is part of this tool's current denylist of disabled commands." }],
        });
      }
    });
  });

  describe('with allowlist and denylist', () => {
    test('returns error for command in both lists', async () => {
      const allowlist = ['a b'];
      const denylist = ['a b'];
      createRunGcloudCommand(allowlist, denylist).register(mockServer);
      const toolImplementation = getToolImplementation();

      const result = await toolImplementation({ args: ['a', 'b', 'c'] });

      expect(gcloudInvoke).not.toHaveBeenCalled();
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: `Command is not part of this tool's current allowlist of enabled commands.`, // Corrected: Removed extra backticks and escaped internal backticks
          },
        ],
      });
    });
  });

  describe('gcloud invocation results', () => {
    test('returns stdout and stderr when gcloud invocation is successful', async () => {
      createRunGcloudCommand().register(mockServer);
      const inputArgs = ['a', 'c'];
      const toolImplementation = getToolImplementation();
      gcloudInvoke.mockResolvedValue({
        code: 0,
        stdout: 'output',
        stderr: 'error',
      });
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({ args: inputArgs });

      expect(gcloudInvoke).toHaveBeenCalledWith(inputArgs);
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'gcloud process exited with code 0. stdout:\noutput\nstderr:\nerror',
          },
        ],
      });
    });

    test('returns error when gcloud invocation throws an error', async () => {
      createRunGcloudCommand().register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudInvoke.mockRejectedValue(new Error('gcloud error'));

      const result = await toolImplementation({ args: ['a', 'c'] });

      expect(gcloudInvoke).toHaveBeenCalledWith(['a', 'c']);
      expect(result).toEqual({
        content: [{ type: 'text', text: 'gcloud error' }],
        isError: true,
      });
    });

    test('returns error when gcloud invocation throws a non-error', async () => {
      createRunGcloudCommand().register(mockServer);
      const toolImplementation = getToolImplementation();
      const inputArgs = ['a', 'c'];
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });
      gcloudInvoke.mockRejectedValue('gcloud error');

      const result = await toolImplementation({ args: inputArgs });

      expect(gcloudInvoke).toHaveBeenCalledWith(inputArgs);
      expect(result).toEqual({
        content: [{ type: 'text', text: 'An unknown error occurred.' }],
        isError: true,
      });
    });

    test('blocking app do not block apphub', async () => {
      const denylist = ['app'];
      const inputArgs = ['apphub'];
      createRunGcloudCommand([], denylist).register(mockServer);
      const toolImplementation = getToolImplementation();
      gcloudInvoke.mockResolvedValue({
        code: 0,
        stdout: 'output',
        stderr: '',
      });
      gcloudSpawnMock.mockResolvedValue({
        code: 0,
        stdout: '[{"command_string_no_args": "' + inputArgs.join(' ') + '"}]',
        stderr: '',
      });

      const result = await toolImplementation({
        args: inputArgs,
      });

      expect(gcloudInvoke).toHaveBeenCalledWith(inputArgs);
      expect(result).toEqual({
        content: [
          {
            type: 'text',
            text: 'gcloud process exited with code 0. stdout:\noutput',
          },
        ],
      });
    });
  });
});

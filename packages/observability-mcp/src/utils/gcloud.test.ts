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

import { test, expect, beforeEach, Mock, vi } from 'vitest';
import * as child_process from 'child_process';
import * as gcloud from './gcloud.js';

vi.mock('child_process', () => ({
  spawn: vi.fn(),
}));

const mockedSpawn = child_process.spawn as unknown as Mock;

beforeEach(() => {
  vi.clearAllMocks();
});

test('should return true if which command succeeds', async () => {
  const mockChildProcess = {
    on: vi.fn((event, callback) => {
      if (event === 'close') {
        setTimeout(() => callback(0), 0);
      }
    }),
  };
  mockedSpawn.mockReturnValue(mockChildProcess);

  const result = await gcloud.isAvailable();

  expect(result).toBe(true);
  expect(mockedSpawn).toHaveBeenCalledWith('which', ['gcloud']);
});

test('should return false if which command fails with non-zero exit code', async () => {
  const mockChildProcess = {
    on: vi.fn((event, callback) => {
      if (event === 'close') {
        setTimeout(() => callback(1), 0);
      }
    }),
  };
  mockedSpawn.mockReturnValue(mockChildProcess);

  const result = await gcloud.isAvailable();

  expect(result).toBe(false);
  expect(mockedSpawn).toHaveBeenCalledWith('which', ['gcloud']);
});

test('should return false if which command fails', async () => {
  const mockChildProcess = {
    on: vi.fn((event, callback) => {
      if (event === 'error') {
        setTimeout(() => callback(new Error('Failed to start')), 0);
      }
    }),
  };
  mockedSpawn.mockReturnValue(mockChildProcess);

  const result = await gcloud.isAvailable();

  expect(result).toBe(false);
  expect(mockedSpawn).toHaveBeenCalledWith('which', ['gcloud']);
});

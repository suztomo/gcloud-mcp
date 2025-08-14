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

import { vi, expect, describe, test } from 'vitest';
import { checkForUpdates } from './update-check.js';
import pkg from '../../package.json' with { type: 'json' };
import { env } from 'node:process';
import * as promise from './promise.js';

vi.mock('boxen');
vi.mock('chalk', async () => {
  const actual = await vi.importActual('chalk');
  const chalkMock = {
    ...actual,
    default: {
      dim: vi.fn(str => str),
      green: vi.fn(str => str),
      cyan: vi.fn(str => str),
      bgRed: {
        white: vi.fn(str => str),
      },
    },
  };
  return chalkMock;
});

describe('checkForUpdates', () => {
  // Make sure the update message is shown when the current version is not
  // the latest version.
  test('print update message when newer version exists', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const resolveSpy = vi
      .spyOn(promise, 'resolve')
      .mockResolvedValue([
        undefined,
        { latest: '99.99.99' },
      ]);

    await checkForUpdates({
      ...pkg,
      version: '0.0.0',
    });

    expect(consoleSpy).toHaveBeenCalledOnce();
    expect(consoleSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('UPDATE'),
      expect.stringContaining('latest'),
    );
    resolveSpy.mockRestore();
  });

  // Make sure the update message is not shown when the latest version is
  // running.
  test('do not print update message when on latest version', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const resolveSpy = vi
      .spyOn(promise, 'resolve')
      .mockResolvedValue([undefined, undefined]);

    await checkForUpdates({
      ...pkg,
      version: '99.99.99',
    });

    expect(consoleSpy).not.toHaveBeenCalled();
    resolveSpy.mockRestore();
  });

  // Make sure an update check does not occur when the NO_UPDATE_CHECK env var
  // is set.
  test('do not check for updates when NO_UPDATE_CHECK is set', async () => {
    const consoleSpy = vi.spyOn(console, 'log');

    env.NO_UPDATE_CHECK = 'true';
    await checkForUpdates({
      ...pkg,
      version: '0.0.0',
    });
    env.NO_UPDATE_CHECK = undefined;

    expect(consoleSpy).not.toHaveBeenCalled();
  });
});

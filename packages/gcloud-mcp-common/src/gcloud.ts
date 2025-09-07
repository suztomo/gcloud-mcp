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

import * as child_process from 'child_process';

/**
 * Represents the result of a gcloud command invocation.
 *
 * See https://cloud.google.com/sdk/docs/scripting-gcloud#best_practices on
 * parsing the GcloudInvocationResult.
 *
 * @property code The exit code of the gcloud process. `null` if the process was terminated by a signal.
 * @property stdout The content of the standard output stream.
 * @property stderr The content of the standard error stream.
 */
export interface GcloudInvocationResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

/**
 * Checks if the `gcloud` command-line tool is available in the system's PATH.
 *
 * @returns A promise that resolves to `true` if gcloud is available, `false` otherwise.
 */
export const isAvailable = (): Promise<boolean> =>
  new Promise((resolve) => {
    const which = child_process.spawn('which', ['gcloud']);
    which.on('close', (code) => {
      resolve(code === 0);
    });
    which.on('error', () => {
      resolve(false);
    });
  });

/**
 * Invokes a gcloud command.
 *
 * See https://cloud.google.com/sdk/docs/scripting-gcloud#best_practices on
 * parsing the GcloudInvocationResult.
 *
 * The function uses `stdio: ['ignore', 'pipe', 'pipe']` to manage the subprocess I/O.
 * 'ignore' for stdin means the subprocess's standard input is ignored, making it non-interactive.
 *
 * This function will reject only if the gcloud process fails to start (e.g. gcloud is not installed).
 * If the gcloud command runs but exits with a non-zero status code, the promise is resolved,
 * and the result object will contain the non-zero exit code.
 *
 * @param args The arguments to pass to gcloud.
 * @returns A promise that resolves with the result of the command execution.
 */
export const invoke = (args: string[]): Promise<GcloudInvocationResult> =>
  new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';

    const gcloud = child_process.spawn('gcloud', args, { stdio: ['ignore', 'pipe', 'pipe'] });

    gcloud.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    gcloud.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    gcloud.on('close', (code) => {
      // All responses from gcloud, including non-zero codes.
      resolve({ code, stdout, stderr });
    });
    gcloud.on('error', (err) => {
      // Process failed to start. gcloud isn't able to be invoked.
      reject(err);
    });
  });

/**
 * Lints a gcloud command.
 *
 * This function will reject only if the gcloud process fails to start.
 * If the gcloud command runs but exits with a non-zero status code (e.g. linting errors),
 * the promise is resolved, and the result object will contain the non-zero exit code.
 *
 * @param command The gcloud command string to lint.
 * @returns A promise that resolves with the result of the linting command.
 */
export const lint = (command: string): Promise<GcloudInvocationResult> =>
  invoke(['meta', 'lint-gcloud-commands', '--command-string', `gcloud ${command}`]);

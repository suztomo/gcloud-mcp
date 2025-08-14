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

export const allowedCommands = (allowlist: string[] = []) => ({
  matches: (command: string): boolean => {
    if (allowlist.length === 0) {
      return true; // No allowlist = all commands allowed
    }
    return allowlist.some((allowed) => command.startsWith(allowed));
  },
});

export const deniedCommands = (denylist: string[] = []) => ({
  matches: (command: string): boolean => {
    // Add a space to avoid matching with commands that are substrings.
    // For example: app and apphub
    const cmd = command + ' ';
    
    if (denylist.length === 0) {
      return false; // No denylist = all commands allowed
    }

    // Denylist'ing a GA command denylists all release tracks.
    // Denylist'ing a pre-GA command only denies the specified release track.
    const releaseTracks = ['', 'alpha ', 'beta ', 'preview '];
    for (const deniedCommand of denylist) {
      for (const release of releaseTracks) {
        if (cmd.startsWith(`${release}${deniedCommand} `)) {
          return true;
        }
      }
    }
    return false;
  },
});

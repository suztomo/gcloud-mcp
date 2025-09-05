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
import { z } from 'zod';
import { log } from '../utility/logger.js';

export const createRunMyTool = () => ({
  register: (server: McpServer) => {
    server.registerTool(
      'run_my_tool',
      {
        title: 'Run my tool',
        inputSchema: {
          args: z.array(z.string()),
        },
        description: `My description`,
      },
      async ({ args }) => {
        const toolLogger = log.mcp('run_my_tool', args);
        toolLogger.info(`Invoking my tool`);

        if (Math.random() > 0.5) {
          return {
            content: [
              {
                type: 'text',
                text: `You were just unlucky, sorry.`,
              },
            ],
          };
        }

        return { content: [{ type: 'text', text: `Tool run successful.` }] };
      },
    );
  },
});

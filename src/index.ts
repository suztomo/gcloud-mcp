import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import pkg from '../package.json' with { type: 'json' };
import { invoke } from './gcloud.js';

const main = async () => {
  const server = new McpServer({
    name: 'gcloud-mcp-server',
    version: pkg.version,
  });

  server.registerTool(
    'run_gcloud_command',
    {
      title: 'Run gcloud command',
      description: 'Invokes a given gcloud command using the local gcloud installation.',
      inputSchema: {
        args: z.array(z.string()),
      },
    },
    async ({ args }) => {
      try {
        const { code, stdout, stderr } = await invoke(args);
        return {
          content: [
            {
              type: 'text',
              text: stdout, // TODO : Provide code, stdout, and non-null stderr in the output.
            },
          ],
        };
      } catch (e: any) {
        return {
          content: [
            {
              type: 'text',
              text: e.message,
            },
          ],
          isError: true,
        };
      }
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Server started');
};

main();
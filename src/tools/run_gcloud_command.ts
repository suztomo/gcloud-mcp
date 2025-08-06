import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { invoke } from '../gcloud.js';
import { z } from 'zod';

export const registerRunGcloudCommand = (server: McpServer) => {
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
        // If the exit status is not zero, an error occurred and the output may be
        // incomplete unless the command documentation notes otherwise. For example,
        // a command that creates multiple resources may only create a few, list them
        // on the standard output, and then exit with a non-zero status.
        // See https://cloud.google.com/sdk/docs/scripting-gcloud#best_practices
        let result = `gcloud process exited with code ${code}. stdout:\n${stdout}`;
        if (stderr) {
          result += `\nstderr:${stderr}`;
        }
        return {
          content: [
            {
              type: 'text',
              text: result,
            },
          ],
        };
      } catch (e: any) {
        return {
          content: [
            {
              type: 'text',
              text: `Unable to invoke gcloud: ${e.message}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
};

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import pkg from '../package.json' with { type: 'json' };
import { registerRunGcloudCommand } from './tools/run_gcloud_command.js';

const main = async () => {
  const server = new McpServer({
    name: 'gcloud-mcp-server',
    version: pkg.version,
  });

  registerRunGcloudCommand(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('🚀 gcloud mcp server started');
};

main();
# Google Cloud MCP

Google Cloud offers a suite of specialized
[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)
servers that make Google Cloud products directly accessible to AI agents.

Our MCP servers work with any tool that can act as an MCP client, including
Claude Desktop, Cline, Cursor, Visual Studio Code Copilot, Windsurf Editor, and
more.

## 🚀 Getting Started

The gcloud MCP Server acts as a bridge between AI agents and the gcloud CLI,
giving your AI assistant the ability to run commands, access context, and
interact with Google Cloud resources. To get started, make sure you have the
following installed:

- [Node.js](https://nodejs.org)
- [gcloud CLI](https://cloud.google.com/sdk/docs/install)

## ✨ Setup your MCP server

The gcloud MCP server can work with any MCP client that supports standard I/O
(stdio) as the transport medium.

To use the gcloud MCP server, add the following configuration:

```
"mcpServers": {
  "firebase": {
    "command": "npx",
    "args": ["-y", "google-cloud@gcloud-mcp"]
  }
}
```

Here are specific instructions for some popular tools:

### Gemini CLI and Gemini Code Assist

To configure Gemini CLI or Gemini Code Assist to use the gcloud MCP server as a
[Gemini CLI extension](https://github.com/google-gemini/gemini-cli/blob/main/docs/extension.md), run:

```
gcloud-mcp init --agent=gemini-cli
```

This will create the following files in your current working directory:

- `.gemini/extensions/gcloud-mcp/gemini-extension.json`
- `.gemini/extensions/gcloud-mcp/GEMINI.md`

### Claude Desktop

To configure Claude Desktop to use the Firebase MCP server, edit the
`claude_desktop_config.json` file. You can open or create this file from the
**Claude > Settings** menu. Select the **Developer** tab, then click **Edit Config**.

### Cline

To configure Cline to use the Firebase MCP server, edit the
`cline_mcp_settings.json` file. You can open or create this file by clicking the
MCP Servers icon at the top of the Cline pane, then clicking the **Configure MCP
Servers button**.

### Cursor

To configure Cursor to use the Firebase MCP server, edit either the file
`.cursor/mcp.json` (to configure only a specific project) or the file
`~/.cursor/mcp.json` (to make the MCP server available in all projects).

### Visual Studio Code Copilot

To configure a single project, edit the `.vscode/mcp.json` file in your
workspace.

To make the server available in every project you open, edit your
[user settings](https://code.visualstudio.com/docs/getstarted/personalize-vscode).

## 🌟 MCP server capabilities

The gcloud MCP provides the following tools:

- `run_gcloud_command`: Runs gcloud commands from natural language prompts,
  ensuring the generated command is validated before execution.

## ☁️  Google Cloud MCP servers

Google Cloud provides these MCP servers:

- [Cloud Run](https://github.com/GoogleCloudPlatform/cloud-run-mcp)
- [Databases](https://github.com/googleapis/genai-toolbox)
- [GKE](https://github.com/GoogleCloudPlatform/gke-mcp)

## 👥 Contributing

We welcome contributions to the gcloud MCP Server! Whether you're fixing bugs,
sharing feedback, or improving documentation, your contributions are
welcome.

Please read our
[Contributing Guide](https://github.com/googleapis/gcloud-mcp/blob/main/CONTRIBUTING.md)
to get started.

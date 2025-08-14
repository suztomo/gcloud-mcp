![Gemini CLI gcloud-mcp Screenshot](./doc/assets/gemini-gcloud-mcp-screenshot.png)


# gcloud MCP server

The gcloud MCP Server is a
[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)
server that provides gcloud execution and context to AI agents via a
Gemini-compatible extension interface.

## Use cases

* **Streamlining Cloud Operations**: Automate the setup, management, and
  scaling of Google Cloud resources and services. Think about automating
  complex deployment pipelines, configuring infrastructure on demand, or
  orchestrating data processing workflows across different GCP components.
* **Deep Cloud Data Insights**: Facilitate the extraction and analysis of
  valuable information residing within your Google Cloud environment. This
  could involve real-time monitoring of application performance, comprehensive
  auditing of resource usage, or deriving business intelligence from large
  datasets stored in BigQuery or Cloud Storage.
* **Intelligent Cloud-Native Applications**: Develop advanced applications that
  leverage AI and machine learning to interact intelligently with Google Cloud
  services. Envision building tools that can proactively optimize cloud
  spending, provide smart recommendations for resource allocation, or create
  intelligent chatbots that manage your GCP projects.

## Prerequisites

- Node.js
- npm
- Gemini CLI
- [gcloud](https://cloud.google.com/sdk/docs/install)

## Local Installation

1.  Clone the repository.
2.  Install the dependencies:

    ```bash
    npm install
    npm link
    ```
3. Enable in your MCP configuration file:

```
"mcpServers":{
  "gcloud": {
    "command": "gcloud-mcp",
  }
}
```

## Remote Installation

1. Install via npm:
   ```bash
   npm i -g @google-cloud/gcloud-mcp
   ```

## Setting up a Gemini CLI extension

To use this MCP server as an extension with the Gemini CLI, run the following
command in your project's root directory, or your user home directory:

```bash
gcloud-mcp init --agent=gemini-cli
gemini
```

This will register the extension with Gemini, making the gcloud tools available
in your chat sessions.

## Manually Running the Server

To start the server, run the following command:

```bash
npm start -w gcloud-mcp
```

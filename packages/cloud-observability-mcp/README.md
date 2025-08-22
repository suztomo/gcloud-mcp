# Google Cloud Observability MCP Server

> [!NOTE]
> Like the overall repository, this MCP server is currently in prerelease, and may see breaking changes
> until the first stable release (v1.0).
> * This repository is providing a _solution_, not an officially supported
> Google _product_. This project is not eligible for the [Google Open Source Software Vulnerability Rewards Program](https://bughunters.google.com/open-source-security).
> * This project may break when the MCP specification changes, when other
> SDKs change, or when other solutions or products change.
> * This solution is expected to be run by customers **at their own risk**.

[![](https://img.shields.io/github/license/GoogleCloudPlatform/cloud-observability-mcp)](./LICENSE)
[![](https://img.shields.io/github/discussions/GoogleCloudPlatform/cloud-observability-mcp?style=social&logo=github)](https://github.com/GoogleCloudPlatform/cloud-observability-mcp/discussions)
[![](https://img.shields.io/github/stars/GoogleCloudPlatform/cloud-observability-mcp?style=social)](https://github.com/GoogleCloudPlatform/cloud-observability-mcp)

This server connects [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) clients (like the [Gemini CLI](https://github.com/google-gemini/gemini-cli)) to various **Google Cloud Observability APIs**. It acts as a local bridge, translating natural language commands from your CLI into the appropriate API calls to help you **understand, manage, and troubleshoot** your Google Cloud environment.

> To learn more about the underlying services, see the official documentation:
> * [Cloud Logging](https://cloud.google.com/logging/docs)
> * [Cloud Monitoring](https://cloud.google.com/monitoring/docs)
> * [Cloud Trace](https://cloud.google.com/trace/docs)
> * [Error Reporting](https://cloud.google.com/error-reporting/docs)

## Getting Started

Follow these steps to get the server running and connected to your client.

### 1. Prerequisites

Before you begin, ensure you have the following:

*   [**Node.js**](https://nodejs.org/en/download) (v18 or later).
*   [**Google Cloud SDK**](https://cloud.google.com/sdk/docs/install) installed and initialized.
*   A **Google Cloud Project**.
*   An **MCP Client**, such as the [**Gemini CLI**](https://github.com/google-gemini/gemini-cli).
*   Your user account must have the appropriate **IAM roles** for the services you want to access (e.g., `roles/logging.viewer`, `roles/monitoring.viewer`).

### 2. Installation & Configuration

Add the Cloud Observability MCP Server to your client's configuration. For the Gemini CLI, add the following to your `settings.json` file.

```json
"mcpServers": {
  "cloud-observability": {
    "command": "npx",
    "args": ["-y", "https://github.com/GoogleCloudPlatform/cloud-observability-mcp"]
  }
}
```

That's it! The next time you run your MCP client in interactive mode (e.g., by running `gemini`), it will automatically start this server.

### 3. Authentication

You need to authenticate twice: once for your user account and once for the application itself.

```shell
# Authenticate your user account to the gcloud CLI
gcloud auth login

# Set up Application Default Credentials for the server.
# This allows the MCP server to securely make Google Cloud API calls on your behalf.
gcloud auth application-default login
```

#### Setting the Quota Project

All API requests made by this server require a Google Cloud project for billing and API quota management. This is known as the "quota project". This project will likely already be set in the gcloud CLI. The project selected as the quota project will need to have the APIs you wish to use in Observability enabled or you will see errors when attempting to use their related tools (e.g. you need the Cloud Logging API enabled in the quota project to use the list_log_entries tool).

If you need to control which project is used for quotas, run the following command (https://cloud.google.com/sdk/gcloud/reference/auth/application-default/set-quota-project):

```shell
# Set the project to be used for API quotas and billing by ADC
gcloud auth application-default set-quota-project YOUR_QUOTA_PROJECT_ID
```

This ensures that all API usage from this server is attributed to the correct project.

## Usage

Once the server is configured, you can ask your MCP client natural language questions about your Google Cloud environment. Here are a few examples:

*   **"Show me all logs with a severity of ERROR."**
*   **"What is the average CPU utilization for my GCE instances over the last hour?"**
*   **"List all traces from the past 30 minutes."**
*   **"Are there any new error groups in the last day?"**

Your MCP client will translate these questions into the appropriate tool calls to fetch the data from Google Cloud.

## Tools Reference

The server exposes the following tools, with more planned for future releases.

| Service | Tool | Description |
| --- | --- | --- |
| **Error Reporting** | `error_reporting.list_error_groups` | Lists the error groups for a project. |
| **Logging** | `logging.list_log_entries` | Lists log entries from a project. |
| | `logging.list_log_metrics` | Lists the logs-based metrics in a project. |
| **Monitoring** | `monitoring.list_time_series` | Lists time series data for a given metric. |
| | `monitoring.list_metric_descriptors` | Lists metric descriptors for a project. |
| **Trace** | `trace.list_traces` | Searches for traces in a project. |

## Development

If you want to contribute to the development of this server, you can run it locally from the source code.

### Installation

1.  Clone the repository:
    ```shell
    git clone https://github.com/GoogleCloudPlatform/cloud-observability-mcp.git
    ```
2.  Install the dependencies:
    ```shell
    cd cloud-observability-mcp
    npm install
    ```

### Running the Server

To run the server locally, you can use the following command:

```shell
npm start
```

This will start the server on the port specified in the `src/server.ts` file.

### Running Tests

To run the tests, use the following command:

```shell
npm test
```

## Community & Contributing

*   **Report Issues:** If you encounter a bug, please file an issue on our [GitHub Issues](https://github.com/GoogleCloudPlatform/cloud-observability-mcp/issues) page.
*   **Ask Questions:** For questions and discussions, please use [GitHub Discussions](https://github.com/GoogleCloudPlatform/cloud-observability-mcp/discussions).
*   **Contribute:** Before sending a pull request, please review our [Contributing Guide](./docs/contributing.md).

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](./LICENSE) file for details.
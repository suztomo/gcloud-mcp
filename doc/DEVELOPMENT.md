#  🛠️🚧👨‍💻 Local Development

## Setup

### Clone the Github Repository

```shell
git clone https://github.com/googleapis/gcloud-mcp.git
```

This will create a directory named `gcloud-mcp` in your current working directory. Go ahead and `cd` into that directory:

```shell
cd gcloud-mcp
```

### Install the gcloud-mcp Server

```shell
npm install
npm install -g
npm run build
npm install -g @google/gemini-cli # If not already installed
```

### Initialize the gcloud-mcp Server with Gemini CLI

```shell
npx @google-cloud/gcloud-mcp init --agent=gemini-cli
```


---
**NOTE: There is a known issue with invoking gcloud-mcp via `npx @google-cloud/gcloud-mcp` when outside the project directory. Instead, this can be done with the `bin` command:**

```shell
# Outside gcloud-mcp repository directory
$ npx @google-cloud/gcloud-mcp # Known module dependency issue.

$ gcloud-mcp # Invokes the MCP server correctly.
```




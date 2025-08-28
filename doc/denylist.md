# ❌ Denylisted Commands

The denylist feature serves as a robust security mechanism, regulating the execution of gcloud commands by the AI agent. This static denylist proactively prevents unintended or unauthorized operations by explicitly prohibiting specific commands and/or command groups. Should a particular command or command group be present in the denylist, all associated operations will be blocked.

**It is important to note that the denylist is not configurable by the user.**

For security and operational reasons, the MCP server is restricted from executing certain commands. Prohibited actions include any command that allows for arbitrary code execution on remote systems or spawns continuous, interactive subprocesses. A list of these commands can be found in [index.ts](packages/gcloud-mcp/src/index.ts). This list is not exhaustive and may be updated to reflect new security and operational requirements.

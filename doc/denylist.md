# ❌ Denylisted Commands

The denylist feature serves as a robust security mechanism, regulating the execution of gcloud commands by the AI agent. This static denylist proactively prevents unintended or unauthorized operations by explicitly prohibiting specific commands and/or command groups. Should a particular command or command group be present in the denylist, all associated operations will be blocked.

**It is important to note that the denylist is not configurable by the user.**

Due to security concerns, certain commands that allow for unauthorized access to remote machines or spawn subprocesses are prohibited. This is to protect the integrity of the agent and the systems it interacts with. The list of denied commands can be found in [index.ts](packages/gcloud-mcp/src/index.ts), the list is not comprehensive and may be updated in the future.

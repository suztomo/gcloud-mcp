# ❌ Denylisted Commands

The denylist feature serves as a robust security mechanism, regulating the execution of gcloud commands by the AI agent. This static denylist proactively prevents unintended or unauthorized operations by explicitly prohibiting specific commands and/or command groups. Should a particular command or command group be present in the denylist, all associated operations will be blocked.

**It is important to note that the denylist is not configurable by the user.**

Due to security concerns, certain commands that allow for unauthorized access to remote machines or spawn subprocesses are prohibited. This is to protect the integrity of the agent and the systems it interacts with. The following list contains examples of such commands, but this is not a complete list and may be updated as new security risks are identified.

```json
default_denylist = [
    "compute start-iap-tunnel",
    "compute connect-to-serial-port",
    "compute tpus tpu-vm ssh",
    "compute tpus queued-resources ssh",
    "compute ssh",
    "cloud-shell ssh",
    "workstations ssh",
    "app instances ssh"
]
```

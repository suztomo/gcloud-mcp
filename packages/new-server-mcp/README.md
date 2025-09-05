# Development

- See [`DEVELOPMENT.md`](../../doc/DEVELOPMENT.md) for local development workflow.
- See the [root `package.json`](../../package.json) for development scripts that will be useful, with the primary commands being:
  - `npm run build`
  - `npm run fix` : Fix linting
  - `npm run test`

## TODO

1. [ ] Replace all "new-server" strings with your server's name.

- When you change the name of the package, you may need to run `npm i` in the root directory to refresh the root package-lock.json. This file is generated, so you probably shouldn't to modify it manually.

2. [ ] Add your tools to `src/tools/`, then register them with the server in `src/index.ts`.
3. [ ] Modify `GEMINI-extension.json` to provide Gemini CLI additional context about your server's capabilities.

We're here to help -- reach out if you have any questions or requests.

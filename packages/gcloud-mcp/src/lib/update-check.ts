
import chalk from 'chalk';
import { env } from 'node:process';
import checkForUpdate from 'update-check';


export const checkForUpdates = async (manifest: object): Promise<void> => {
  // Do not check for updates if the `NO_UPDATE_CHECK` variable is set.
  if (env.NO_UPDATE_CHECK) return;

  // Check for a newer version of the package.
  const [error, update] = await (checkForUpdate as any)(manifest);

  // If there is an error, throw it; and if there is no update, return.
  if (error) throw error;
  if (!update) return;

  // If a newer version is available, tell the user.
  console.log(
    chalk.bgRed.white(' UPDATE '),
    `The latest version of \`serve\` is ${update.latest}`,
  );
};
import { spawn } from 'child_process';

export const invoke = (args: string[]): Promise<{ code: number | null; stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';

    const gcloud = spawn('gcloud', args);

    gcloud.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    gcloud.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    gcloud.on('close', (code) => {
      // All responses from gcloud, including non-zero codes.
      resolve({ code, stdout, stderr });
    });
    gcloud.on('error', (err) => {
      // Process failed to start. gcloud isn't able to be invoked.
      reject(err);
    });
  });
};

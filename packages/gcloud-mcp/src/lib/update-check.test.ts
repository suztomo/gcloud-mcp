
// import { vi, it, expect, describe, beforeEach } from 'vitest';
// import checkUpdate from './update-check.js';

// vi.mock('latest-version');
// vi.mock('semver');
// vi.mock('boxen');
// vi.mock('chalk', async () => {
//     const actual = await vi.importActual('chalk');
//     return {
//         ...actual,
//         default: {
//             dim: vi.fn(str => str),
//             green: vi.fn(str => str),
//             cyan: vi.fn(str => str),
//         }
//     };
// });

// describe('checkUpdate', () => {
//   beforeEach(() => {
//     vi.resetAllMocks();
//   });

//   it('should show update message when a newer version is available', async () => {
//     const { default: latestVersion } = await import('latest-version');
//     const { gt } = await import('semver');
    
//     vi.mocked(latestVersion).mockResolvedValue('1.0.0');
//     vi.mocked(gt).mockReturnValue(true);

//     const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

//     await checkUpdate('0.1.0');

//     expect(consoleLogSpy).toHaveBeenCalled();
//     consoleLogSpy.mockRestore();
//   });

//   it('should not show update message when the version is current', async () => {
//     const { default: latestVersion } = await import('latest-version');
//     const { gt } = await import('semver');

//     vi.mocked(latestVersion).mockResolvedValue('1.0.0');
//     vi.mocked(gt).mockReturnValue(false);

//     const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

//     await checkUpdate('1.0.0');

//     expect(consoleLogSpy).not.toHaveBeenCalled();
//     consoleLogSpy.mockRestore();
//   });
// });

import { exec } from './exec';

export const installDeps = (packageManager: packageManager) =>
	exec([packageManager, '-s', 'install']).catch(({ exitCode }) =>
		process.exit(exitCode),
	);

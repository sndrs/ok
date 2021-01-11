import nvexeca from 'nvexeca';
import ora from 'ora';
import chalk from 'chalk';
import { exit } from './exit';

export const updateDeps = async (packageManager: string) => {
	const depsMessage = ora({
		text: chalk.dim('Refreshing dependencies'),
	}).start();

	try {
		const { childProcess: installDeps } = await nvexeca(
			'local',
			packageManager,
			['install'],
			{
				stdio: 'pipe',
				localDir: __dirname,
			},
		);
		const { exitCode } = await installDeps;

		if (exitCode === 0) {
			depsMessage.stopAndPersist({ symbol: chalk.green('✓') });
		}
	} catch (e) {
		depsMessage.fail();
		exit(e);
	}
};

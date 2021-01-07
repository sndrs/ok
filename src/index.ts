import parseArgs from 'minimist';
import path from 'path';
import readPackageUp from 'read-pkg-up';
import updateNotifier from 'update-notifier';
import report from 'yurnalist';
import { exec } from './exec';
import getNode from 'get-node';
import { getPackageManager } from './getPackageManager';
import getPreferredNodeVersion from 'preferred-node-version';
import { installDeps } from './installDeps';
import { error, failed, script, success } from './log';
import { validatePackageManager } from './validatePackageManager';

(async () => {
	try {
		const packageUp = await readPackageUp();

		if (packageUp) {
			const packageRoot = path.dirname(packageUp.path);
			const pkg = packageUp.packageJson;

			updateNotifier({ pkg: require('../package.json') }).notify();

			const { version: nodeVersion } = await getPreferredNodeVersion();
			await getNode(nodeVersion, { progress: true });
			success(`Using Node v${nodeVersion}`);

			const packageManager = getPackageManager(packageRoot, pkg);
			success(`Using ${packageManager}`);

			await validatePackageManager(packageManager, pkg);

			await installDeps(packageManager);
			success(`Refresh dependencies`);

			const runScript = async (args: string[] = []) => {
				try {
					script([packageManager, 'run', ...args].join(' '));
					const { exitCode, stdout, stderr } = await exec([
						packageManager,
						'run',
						...args,
					]);

					if (stdout) console.log(stdout);
					if (stderr) console.error(stderr);
					process.exit(exitCode);
				} catch (e) {
					error(e.message);
				}
			};

			const { _: args } = parseArgs(process.argv.slice(2));

			if (args.length) {
				runScript(process.argv.slice(2));
			} else {
				if (pkg.scripts) {
					const tasks = Object.keys(pkg.scripts)
						.sort()
						.map((_) => ({ name: _, value: _ }));
					report
						.select(
							'The following tasks are available',
							'Which one do you want to run',
							tasks,
						)
						.then((script: string) => runScript([script]));
				}
			}
		} else {
			failed('Could not find package.json');
		}
	} catch (e) {
		console.log(e);
	}
})();

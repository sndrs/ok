import parseArgs from 'minimist';
import nvexeca from 'nvexeca';
import path from 'path';
import readPackageUp from 'read-pkg-up';
import updateNotifier from 'update-notifier';
import { exit } from './exit';
import { getEnv } from './getEnv';
import { error, info } from './log';
import { updateDeps } from './updateDeps';

(async () => {
	try {
		const packageUp = await readPackageUp();
		if (packageUp) {
			const packageRoot = path.dirname(packageUp.path);
			const pkg = packageUp.packageJson;

			const { packageManager } = await getEnv(packageRoot, pkg);

			await updateDeps(packageManager);

			const { _: args } = parseArgs(process.argv.slice(2));

			if (args.length) {
				const { childProcess: runScripts } = await nvexeca(
					'local',
					packageManager,
					['-s', ...process.argv.slice(2)],
					{
						stdio: 'inherit',
						localDir: __dirname,
					},
				);

				const { exitCode, stdout, stderr } = await runScripts;

				if (exitCode > 0) {
					exit(stderr ?? stdout, exitCode);
				}

				updateNotifier({
					pkg: require('../package.json'),
				}).notify();
			} else {
				if (pkg.scripts) {
					info(
						`\nThe following scripts are available:\n - ${Object.keys(
							pkg.scripts,
						)
							.sort()
							.join('\n - ')}`,
					);
				}
			}
		} else {
			exit('Could not find package.json');
		}
	} catch (e) {
		const satisfies = require('semver/functions/satisfies');
		const validRange = require('semver/ranges/valid');

		const okNode = validRange(require('../package.json').engines?.node);

		if (!satisfies(process.version, okNode)) {
			error(`Invalid Node version`);
			info(
				`You are using ${process.version} but \`ok\` needs ${okNode}.\nPlease update your installation:\nhttps://nodejs.org/en/download`,
			);
			process.exit(1);
		}

		exit(e);
	}
})();

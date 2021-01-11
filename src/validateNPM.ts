import nvexeca from 'nvexeca';
import type { NormalizedPackageJson } from 'read-pkg-up';
import { error, info } from './log';

export const validateNPM = async (pkg: NormalizedPackageJson) => {
	const enginesVersion = pkg.engines?.npm;
	if (enginesVersion) {
		const { childProcess } = await nvexeca('local', 'npm', ['-v'], {
			stdio: 'pipe',
			localDir: __dirname,
		});

		const npmVersion = (await childProcess).stdout;
		const satisfies = require('semver/functions/satisfies');

		if (!satisfies(npmVersion, enginesVersion)) {
			error(`Invalid ${'npm'} version`);
			info(
				`You are using ${npmVersion} but package.json requires ${enginesVersion} in \`engines.${'npm'}\`.\nPlease update your installation:\nhttps://docs.npmjs.com/try-the-latest-stable-version-of-npm`,
			);
			process.exit(1);
		}
	}
};

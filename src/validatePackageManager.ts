import type { NormalizedPackageJson } from 'read-pkg-up';
import satisfies from 'semver/functions/satisfies';

import { error, info } from './log';

import nvexeca from 'nvexeca';

export const validatePackageManager = async (
	packageManager: packageManager,
	pkg: NormalizedPackageJson,
) => {
	const enginesPackageManagerVersion = pkg.engines?.[packageManager];
	if (enginesPackageManagerVersion) {
		const { childProcess } = await nvexeca(
			'local',
			packageManager,
			['-v'],
			{
				stdio: 'pipe',
				localDir: __dirname,
			},
		);

		const packageManagerVersion = (await childProcess).stdout;

		if (!satisfies(packageManagerVersion, enginesPackageManagerVersion)) {
			error(`Invalid ${packageManager} version`);
			info(
				`You are using ${packageManagerVersion} but package.json specifies ${enginesPackageManagerVersion} in \`engines.${packageManager}\`.`,
			);
			process.exit(1);
		}
	}
};

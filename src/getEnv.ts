import getNode from 'get-node';
import type { NormalizedPackageJson } from 'read-pkg-up';
import { getPackageManager } from './getPackageManager';
import { success } from './log';

export const getEnv = async (
	packageRoot: string,
	pkg: NormalizedPackageJson,
) => {
	const [packageManager, { version: nodeVersion }] = await Promise.all([
		getPackageManager(packageRoot, pkg),
		getNode('local', {
			progress: true,
		}),
	]);
	success(`Using ${packageManager} and Node v${nodeVersion}`);
	return { packageManager, nodeVersion };
};

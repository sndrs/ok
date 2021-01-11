import preferredPM from 'preferred-pm';
import type { NormalizedPackageJson } from 'read-pkg-up';
import { validateNPM } from './validateNPM';

export const getPackageManager = async (
	packageRoot: string,
	pkg: NormalizedPackageJson,
) => {
	const { name = 'npm' } = (await preferredPM(packageRoot)) ?? {};
	if (name === 'npm') await validateNPM(pkg);
	return name;
};

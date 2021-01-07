import fs from 'fs';
import path from 'path';
import type { NormalizedPackageJson } from 'read-pkg-up';

export const getPackageManager = (
	packageRoot: string,
	pkg: NormalizedPackageJson,
): packageManager =>
	fs.existsSync(path.resolve(packageRoot, 'yarn.lock')) || pkg.engines?.yarn
		? 'yarn'
		: 'npm';

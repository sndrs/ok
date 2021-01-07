import shebang from '@robmarr/rollup-plugin-shebang';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/ok.js',
		format: 'cjs',
	},
	external: [
		'meow',
		'fs',
		'path',
		'nvexeca',
		'chalk',
		'semver/functions/coerce',
		'semver/functions/satisfies',
		'semver/ranges/valid',
		'execa',
		'update-notifier',
		'minimist',
		'yurnalist',
		'read-pkg-up',
		'get-node',
		'preferred-node-version',
	],
	plugins: [shebang(), typescript()],
};

import shebang from '@robmarr/rollup-plugin-shebang';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/ok.js',
		format: 'cjs',
	},
	external: [
		'fs',
		'path',
		'nvexeca',
		'chalk',
		'semver/functions/satisfies',
		'semver/ranges/valid',
		'update-notifier',
		'minimist',
		'read-pkg-up',
		'get-node',
		'ora',
		'preferred-pm',
	],
	plugins: [shebang(), typescript()],
};

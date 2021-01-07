import nvexeca from 'nvexeca';

export const exec = async ([command, ...args]: [
	command: string,
	...args: string[]
]) => {
	const { childProcess } = await nvexeca('local', command, args, {
		stdio: 'inherit',
		localDir: __dirname,
		progress: true,
	});

	const { exitCode, stdout, stderr } = await childProcess;
	if (stderr) {
		console.log(stderr);
		process.exit(exitCode);
	}
	return { exitCode, stdout, stderr };
};

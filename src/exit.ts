import { error } from './log';

export const exit = (message: string, exitCode = 1) => {
	error(message);
	process.exit(exitCode);
};

import chalk from 'chalk';

export const error = (message: string) => console.log(chalk.red(message));
export const success = (message: string) =>
	console.log(`${chalk.green('✓')} ${chalk.dim(message)}`);
export const info = (message: string) => console.log(chalk.dim(message));

import chalk from 'chalk';

export const warn = (message: string) => console.log(chalk.yellow(message));

export const error = (message: string) => console.log(chalk.red(message));

export const info = (message: string) => console.log(chalk.dim(message));

export const success = (message: string) =>
	console.log(`${chalk.green('✓')} ${chalk.dim(message)}`);

export const failed = (message: string) =>
	console.log(`${chalk.red('✖')} ${chalk.dim(message)}`);

export const script = (message: string) =>
	console.log(chalk.bgGreen.black(`\n > ${message} \n`));

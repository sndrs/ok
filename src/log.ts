import chalk from 'chalk'

export const warn = (message: string) => console.log(chalk.yellow(message))
export const error = (message: string) => console.log(chalk.red(message))
export const info = (message: string) => console.log(chalk.dim(message))

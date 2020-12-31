import chalk from 'chalk'
import nvexeca from 'nvexeca'
import coerce from 'semver/functions/coerce'
import { getEnv } from './env'
import { info } from './log'

const tick = chalk.green('✓')

const workingEnv = (node: string, pm: string) =>
	`${tick} Using ${pm} and Node v${coerce(node)}`

export const run = async (tasks: string[] = []) => {
	try {
		const { nodeRange, packageManager } = await getEnv()

		const exec = (args: string[]) =>
			nvexeca(nodeRange, packageManager, args, {
				stdio: 'inherit',
				localDir: __dirname,
				progress: true,
			})

		try {
			const { childProcess: installDeps, version } = await exec([
				'install',
			])

			info(workingEnv(version, packageManager))

			await installDeps

			info(`${tick} All dependencies up-to-date`)
		} catch (e) {
			console.error(e)
			process.exit(1)
		}

		// spacer
		console.log(``)

		const { childProcess } = await exec(['run', ...tasks])
		const { exitCode, stdout } = await childProcess
		console.log(stdout)
		process.exit(exitCode)
	} catch (e) {
		// do nothing
	}
}

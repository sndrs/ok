import chalk from 'chalk'
import execa from 'execa'
import fs from 'fs'
import nvexeca from 'nvexeca'
import path from 'path'
import coerce from 'semver/functions/coerce'
import satisfies from 'semver/functions/satisfies'
import { getNodeRange } from './get-node-range'
import { info } from './log'

const tick = chalk.green('✓')

const workingEnv = (node: string, pm: string) =>
	`${tick} Using ${pm} and Node v${coerce(node)}`

export const run = async (tasks: string[] = []) => {
	const nodeRange = getNodeRange()

	const useCurrentNode = satisfies(process.version, nodeRange)

	const yarnLockPath = path.resolve(process.cwd(), 'yarn.lock')
	const packageManager = fs.existsSync(yarnLockPath) ? 'yarn' : 'npm'

	const _execa = (args: string[]) =>
		useCurrentNode
			? execa(packageManager, args, {
					stdio: 'inherit',
					localDir: __dirname,
					preferLocal: true,
			  }).then(result => ({
					childProcess: result,
					version: process.version,
			  }))
			: nvexeca(nodeRange, packageManager, args, {
					stdio: 'inherit',
					localDir: __dirname,
					progress: true,
			  })

	try {
		if (useCurrentNode) info(workingEnv(process.version, packageManager))

		const { childProcess: installDeps, version } = await _execa([
			'install',
			'--silent',
		])

		if (!useCurrentNode) info(workingEnv(version, packageManager))

		await installDeps

		info(`${tick} All dependencies up-to-date`)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}

	// spacer
	console.log('')

	return _execa(['run', '--silent', ...tasks])
}

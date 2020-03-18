import execa from 'execa'
import fs from 'fs'
import nvexeca from 'nvexeca'
import path from 'path'
import coerce from 'semver/functions/coerce'
import satisfies from 'semver/functions/satisfies'
import { getNodeRange } from './get-node-range'
import { info } from './log'

export const run = async (tasks: string[] = []) => {
	const nodeRange = getNodeRange()

	const useCurrentNode = satisfies(process.version, nodeRange)

	const yarnLockPath = path.resolve(process.cwd(), 'yarn.lock')
	const packageManager = fs.existsSync(yarnLockPath) ? 'Yarn' : 'npm'

	const xEca = (args: string[]) =>
		useCurrentNode
			? execa(packageManager, args, {
					stdio: 'inherit',
			  }).then(result => ({
					childProcess: result,
					version: process.version,
			  }))
			: nvexeca(nodeRange, packageManager, args, {
					stdio: 'inherit',
					progress: true,
			  })

	try {
		if (useCurrentNode)
			info(`Using Node v${coerce(process.version)} and ${packageManager}`)

		const { childProcess: installDeps, version } = await xEca([
			'install',
			'--silent',
		])

		if (!useCurrentNode)
			info(`Using Node v${coerce(version)} and ${packageManager}`)

		await installDeps
	} catch (e) {
		console.error(e)
		process.exit(1)
	}

	// spacer
	console.log('')

	return xEca(['run', '--silent', ...tasks])
}

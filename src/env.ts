import execa from 'execa'
import fs from 'fs'
import path from 'path'
import satisfies from 'semver/functions/satisfies'
import validRange from 'semver/ranges/valid'
import { error, info } from './log'

const cwd = process.cwd()
const engines = require(path.resolve(cwd, 'package.json'))?.engines

let packageManager = fs.existsSync(path.resolve(cwd, 'yarn.lock'))
	? 'yarn'
	: fs.existsSync(path.resolve(cwd, 'package-lock.json'))
	? 'npm'
	: engines?.yarn
	? 'yarn'
	: engines?.npm
	? 'npm'
	: 'yarn'

export const getEnv = async () => {
	if (engines && engines[packageManager]) {
		const { stdout: packageManagerVersion } = await execa(
			packageManager,
			['-v'],
			{
				preferLocal: true,
			},
		)
		console.log(packageManagerVersion)

		if (!satisfies(packageManagerVersion, engines[packageManager])) {
			if (packageManager === 'npm') {
				info('Installing npm')
				await execa('npm', [
					'install',
					'--no-save',
					'--silent',
					`npm@${engines[packageManager]}`,
				])
			} else {
				error(`Invalid yarn version:`)
				info(
					`Found ${packageManagerVersion} but package.json specifies ${engines[packageManager]} in \`engines.${packageManager}\`.`,
				)
				process.exit(1)
			}
		}
	}

	const nvmrcPath = path.resolve(cwd, '.nvmrc')

	const nvmrcNode = fs.existsSync(nvmrcPath)
		? validRange(fs.readFileSync(nvmrcPath, 'utf8').trim())
		: undefined

	if (nvmrcNode === null) {
		error('Your .nvmrc version is not supported.')
		info('Please use a valid semver version range:')
		info('https://github.com/npm/node-semver#versions')
		process.exit(1)
	}

	const nodeRange = [engines?.node, nvmrcNode, '*'].filter(Boolean).join(' ')

	const useCurrentNode = satisfies(process.version, nodeRange)

	return { nodeRange, useCurrentNode, packageManager }
}

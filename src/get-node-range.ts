import fs from 'fs'
import path from 'path'
import validRange from 'semver/ranges/valid'
import { error, info } from './log'

export const getNodeRange = () => {
	const cwd = process.cwd()

	const pkgPath = path.resolve(cwd, 'package.json')

	const pkgNode = fs.existsSync(pkgPath)
		? validRange(require(pkgPath).engines?.node)
		: undefined

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

	const nodeRange = [pkgNode, nvmrcNode, '*'].filter(Boolean).join(' ')

	return nodeRange
}

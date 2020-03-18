import meow from 'meow'
import path from 'path'
import satisfies from 'semver/functions/satisfies'
import validRange from 'semver/ranges/valid'
import updateNotifier from 'update-notifier'
import { error, info } from './log'
import { run } from './run'

const cli = meow(`write some help`, {
	flags: {
		help: {
			type: 'boolean',
			alias: 'h',
		},
	},
})

const pkg = cli.pkg as updateNotifier.Package

updateNotifier({ pkg }).notify()

const okNode = validRange(cli.pkg.engines?.node)

if (!satisfies(process.version, okNode)) {
	error(`ok does not work with this version of Node (${process.version})`)
	info(
		'Please update your installation: \nhttps://nodejs.org/en/download/package-manager/',
	)
	process.exit(1)
}

if (cli.input.length) {
	run(cli.input)
} else {
	info(
		`The following tasks are available:\n\nin package.json\n- ${Object.keys(
			require(path.resolve(process.cwd(), 'package.json')).scripts,
		).join('\n- ')}`,
	)
}

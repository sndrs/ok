import minimist from 'minimist'
import updateNotifier from 'update-notifier'
import { info } from './log'
import { run } from './run'

const pkg = require('read-pkg-up').sync().packageJson
updateNotifier({ pkg }).notify()

const { _: scripts } = minimist(process.argv.slice(2))

const logScripts = () =>
	info(
		`The following tasks are available:\n- ${Object.keys(pkg.scripts)
			.sort()
			.join('\n- ')}`,
	)

if (pkg.scripts) {
	if (scripts.length) {
		run(scripts)
	} else {
		logScripts()
	}
}

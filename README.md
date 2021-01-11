# ok

> 🙇‍♂️ An obliging task runner

Run `npm-scripts` in the correct environment without further installation or config.

<img src="demo.gif" width="455">

## Install

<a href="https://npmjs.org/package/@sndrs/ok" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@sndrs/ok.svg" alt="NPM version" /></a>

```bash
$ yarn global add @sndrs/ok
```

or

```bash
$ npm install -g @sndrs/ok
```

Then use it to run your `npm-scripts`:

```bash
$ ok test # etc...
```

### Changes the host env as little as possible

-   no changes to `$PATH`
-   does not change the system Node
-   does not affect `NVM`, `fnm` etc

### Follows project conventions

-   uses correct Node version, observing [`.nvmrc`, `engines` and more](https://github.com/ehmicky/preferred-node-version/blob/main/README.md)
-   use project package manager (`yarn`, `npm` or `pnpm`)
    -   use the checked in yarn version if present
    -   use `engines` npm if present
-   always run tasks with up-to-date dependencies

### No other dependencies

-   uses its own copy of `yarn` if it is not installed
-   no `nvm`/`n` etc needed

### Experience

-   Notifies you if you're using out-of-date version
-   All task output is shown – no magic
-   All available scripts in current context are discoverable by running without args (`> ok`)

## See also

-   [`nvexeca`](https://github.com/ehmicky/nvexeca): `nvm` + `execa`

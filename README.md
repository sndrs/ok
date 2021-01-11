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

`ok` uses [nvexeca](https://github.com/ehmicky/nvexeca) behind the scenes. This means:

-   it does not need to make changes to `$PATH`
-   it does not affect existing Node versions
-   it does not affect `NVM`, `fnm` etc

### Follows project conventions

-   uses correct Node version, observing [`.nvmrc`, `engines` and more](https://github.com/ehmicky/preferred-node-version/blob/main/README.md)
-   uses the correct package manager for the project ([`yarn`, `npm` or `pnpm`](https://github.com/zkochan/packages/tree/master/preferred-pm))
    -   observes `engines.npm` if present (unlike npm)
-   always run tasks with up-to-date dependencies

### No further dependencies

-   uses its own copy of `yarn` if it cannot find one
-   no `nvm`/`n`/`fnm` etc needed

### Experience

-   All task output is shown – no magic
-   All available scripts in current context are discoverable by running without args (`> ok`)
-   Notifies you if you're using out-of-date version

## See also

-   [`nvexeca`](https://github.com/ehmicky/nvexeca): `nvm` + `execa`

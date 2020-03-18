# ok

> 🙇‍♂️ An obliging task runner

Run a project’s `package.json` scripts in a stipulated environment without configuring yours.

<img src="demo.gif" width="444">

### Follows project conventions

-   [x] fetch and use correct node version, observing:
    -   [x] `.nvmrc`
    -   [x] `engines`
-   [x] use project package manager (`yarn` or `npm`)
    -   [x] use the checked in yarn version if present
    -   [ ] use `engines` npm if present
-   [x] always run tasks with up-to-date dependencies

### No futher installations necessary

-   [x] `yarn` does not need to be installed
-   [x] no `nvm`/`n` etc needed

### Change host env as little as possible

-   [x] no changes to `$PATH`
-   [x] do not change the system Node
-   [x] do not install node versions if unnecessary

### Experience

-   [x] Notify when using out-of-date version
-   [x] All user task output should be shown – no magic
-   [ ] All available scripts in current context discoverable by running without args (`ok`)

### Other

-   [ ] Use local version if available?
-   [ ] enable `ok.config.js`?
-   [ ] discover `make` targets?

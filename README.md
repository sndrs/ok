# ok

> Runs package scripts in the correct environment without configuring yours.

Leaves the host environment alone:

-   runs in whatever version of node you have installed – no `nvm`/`n` etc needed
-   doesn't touch the system Node installation
-   no changes to your `$PATH` etc
-   bundles `yarn`, so no further installation is needed

Follows project requirements:

-   observes `.nvmrc` and `engines.node`
-   uses `yarn` or `npm` based on the project
-   uses the checked in yarn version if present

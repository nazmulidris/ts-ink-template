# ts-ink-template

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is this?](#what-is-this)
- [npm scripts](#npm-scripts)
  - [Development using tsm (skip compilation)](#development-using-tsm-skip-compilation)
  - [Traditional approach (compile TS and run JS)](#traditional-approach-compile-ts-and-run-js)
  - [start script](#start-script)
- [npm link](#npm-link)
  - [How do I change the name of the CLI app?](#how-do-i-change-the-name-of-the-cli-app)
- [IDEA Run Configurations](#idea-run-configurations)
- [How to update the template](#how-to-update-the-template)
- [ESM, r3bl-ts-utils, and React](#esm-r3bl-ts-utils-and-react)
- [CommonJS, ESM, r3bl-ts-utils, and React](#commonjs-esm-r3bl-ts-utils-and-react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is this?

This is a template project that makes it easy to work w/ Ink v3 to build CLI apps using Node.js w/
TypeScript and Jest for testing. Make sure to run `npm install` before running the scripts or the
IDEA Run Configurations shown below.

## npm scripts

There are two types of scripts provided - one using [`tsm`](https://www.npmjs.com/package/tsm) to
quickly run TypeScript code w/out having to compile it first, and the other using the traditional
build, test, and run approach.

To run any of the following scripts you can execute `npm run <SCRIPT_NAME>`.

### Development using tsm (skip compilation)

<!-- prettier-ignore-start -->
| Task              | Script            | Notes                                                        |
|-------------------|-------------------|--------------------------------------------------------------|
| Run               | `start-dev`       | Run the `dist/cli.tsx` file                                  |
| Run & watch       | `start-dev-watch` | Watch for changes and re-run the `dist/cli.tsx` file         |
| Run tests         | `test`            | Run all the Jest tests (no need for compiling)               |
| Run tests & watch | `test-watch`      | Run all the Jest tests in watch mode (no need for compiling) |
| Run linter        | `lint`            | Run ESLint.                                                  |
<!-- prettier-ignore-end -->

### Traditional approach (compile TS and run JS)

<!-- prettier-ignore-start -->
| Task                | Script           | Notes                                                  |
|---------------------|------------------|--------------------------------------------------------|
| Run (w/out compile) | `start`          | Run the `dist/cli.js` file (make sure its executable)  |
| Compile             | `build`          | Run`tsc` to generate JS files in the `dist` folder     |
| Compile & watch     | `build-watch-js` | run `tsc` and watch for changes in TS files            |
| Run & watch         | `start-watch-js` | Watch for changes in JS files, and re-run              |
| Compile, run, watch | `dev-js`         | Run both scripts above in parallel using `npm-run-all` |
<!-- prettier-ignore-end -->

Here are some notes on how all the watching tasks work.

1. Instead of combining the steps to compile with tsc, and run the resulting JS in node, these two
   are separated and run concurrently. Each one of these separate tasks watches for its own changes.
2. [nodemon and ignoring unhandled exit code][w-1]. This prevents nodemon from exiting when there is
   an error in running the JS code. [Here's more background info on these exit codes][w-2].
3. [npm-run-all][w-3] then takes care of running these tasks in parallel and dumping their output in
   a terminal.

<!-- prettier-ignore-start -->
[w-1]: https://nicedoc.io/remy/nodemon/blob/master/faq.md#error-process-failed-unhandled-exit-code-2
[w-2]: https://remysharp.com/2018/01/08/a-clean-exit#changing-exit-codes
[w-3]: https://github.com/mysticatea/npm-run-all
<!-- prettier-ignore-end -->

### start script

1. Make sure to mark `dist/cli.js` file as executable so that this self executing module can run.
2. To pass command line arguments you can use `npm run start -- <STUFF>`
3. You can also run `npm exec -c 'ink-cli-app <STUFF>'`.
4. Where `<STUFF>` can be:

- `--help`
- `-n Grogu`
- `--name Grogu`

## npm link

If you want to create a symlink for the executable node module in this template project, you can
simply run the following command in the folder containing `package.json`. It will create a symlink
`ink-cli-app` (that should be in your `$PATH` depending on how you installed Node.js).

```shell
$ npm link
```

### How do I change the name of the CLI app?

The `name` property in `package.json` is `ink-cli-app` by default. If you want to rename it to
something else, just change this property. If you want to update your symlink, then you have to run
the following commands.

```shell
$ npm uninstall -g ink-cli-app
$ npm link
```

## IDEA Run Configurations

You can also use IDEA Run Configurations that are included.

1. `Run all tests` - This runs all the tests in the `src` folder using the the `jest.config.cjs`
   file.
2. `cli.js` - This uses Node.js to run run the `dist/cli.js` file after building it.

## How to update the template

You can get more info on this topic [here](https://stackoverflow.com/a/56577320/2085356). Here are
the steps to create a remote called `template` that we will pull the changes from and then merge
those changes into `main`.

```shell
git remote add template https://github.com/nazmulidris/ts-ink-template
git pull template main
```

## CommonJS, ESM, r3bl-ts-utils, and React

This node module is compiled to CommonJS (as specified in [`tsconfig.json`](tsconfig.json)) and not
ESM. Here's more information on CommonJS, ESM, and hybrid modules.

- [How to create dual modules][e-1].
- [Example of a dual module][e-2].
- Here's a [commit][e-3] from `r3bl-ts-utils` that applied a fix related to modules.

<!-- prettier-ignore-start -->
[e-1]: https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html
[e-2]: https://github.com/sensedeep/dynamodb-onetable
[e-3]: https://github.com/r3bl-org/r3bl-ts-utils/commit/a2e1465c8ab0319c5622c8a1a2b9acc634134099
<!-- prettier-ignore-end -->

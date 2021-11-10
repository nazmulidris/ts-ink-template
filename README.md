# ts-ink-template

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is this?](#what-is-this)
- [npm scripts](#npm-scripts)
  - [One off scripts](#one-off-scripts)
  - [Watch mode scripts (hot-reload)](#watch-mode-scripts-hot-reload)
- [npm link](#npm-link)
  - [How do I change the name of the CLI app?](#how-do-i-change-the-name-of-the-cli-app)
- [IDEA Run Configurations](#idea-run-configurations)
- [How to update the template](#how-to-update-the-template)
- [ESM, r3bl-ts-utils, and React](#esm-r3bl-ts-utils-and-react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is this?

This is a template project that makes it easy to work w/ Ink v3 to build CLI apps using Node.js w/
TypeScript and Jest for testing. Make sure to run `npm install` before running the scripts or the
IDEA Run Configurations shown below.

## npm scripts

There are two sets of scripts, ones that just run a command once, and others that start them in
watch mode (very mich like webpack hot-reload). To run any of the following scripts you can execute
`npm run <SCRIPT_NAME>`.

### One off scripts

| Task                     | Script            | Notes                                                 |
| ------------------------ | ----------------- | ----------------------------------------------------- |
| Compiling                | `build`           | run`tsc` to generate JS files in the `dist` folder    |
| Running (no compilation) | `start`           | run the `dist/cli.js` file (make sure its executable) |
| Compiling and running    | `build-and-start` | run the `build` script, then the `dist/cli.js` file   |
| Run tests                | `test`            | run all the Jest tests (no need for compiling)        |

Notes about `start` script:

1. Make sure to mark `dist/cli.js` file as executable so that this self executing module can run.
2. To pass command line arguments you can use `npm run start -- <STUFF>`
3. You can also run `npm exec -c 'ink-cli-app <STUFF>'`.
4. Where `<STUFF>` can be:

- `--help`
- `-n Grogu`
- `--name Grogu`

### Watch mode scripts (hot-reload)

| Task              | Script        | Notes                                                                                         |
| ----------------- | ------------- | --------------------------------------------------------------------------------------------- |
| Compile and watch | `build-watch` | run`tsc` and watch for changes                                                                |
| Run and watch     | `start-watch` | run `nodemon` & watch for changes in `ts`, `tsx`, `json` files; run `build-and-run` on change |
| All of the above  | `dev`         | Run the scripts above in parallel using `npm-run-all`                                         |

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

## ESM, r3bl-ts-utils, and React

> ⚡ Resources on ESM and CommonJS and their interop issues.
>
> 1. [Using native ESM on Node.js using TypeScript][e-2]
> 2. [Understanding ESM and CommonJS, and creating "dual" package that supports both][e-3]
> 3. [Node.js, TypeScript, and ESM and writing dual mode modules][e-1]

<!-- prettier-ignore-start -->

[e-1]: https://gils-blog.tayar.org/posts/using-jsm-esm-in-nodejs-a-practical-guide-part-1/
[e-2]: https://2ality.com/2021/06/typescript-esm-nodejs.html
[e-3]: https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1

<!-- prettier-ignore-end -->

If you write React components that use any of the custom hooks imported from `r3bl-ts-utils` then
there will be problems. This is due to the fact that this Ink node module uses ESM and
`r3bl-ts-utils` uses CommonJS, that causes some big problems! The symbol `React` is actually
exported under the covers when TS code is generated into JS code in `r3bl-ts-utils` and that simply
fails in this node module which uses ESM. This is a sad side effect of using ESM which are
incompatible with CommonJS. For now, avoiding importing `useForceUpdateFn()` function side steps
this issue.

> Since `r3bl-ts-utils` is used for "regular" React apps built using `create-react-app` it doesn't
> make sense to use ESM for it. It needs to be as universal as possible and currently CommonJS
> provides that flexibility.

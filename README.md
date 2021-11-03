# ts-ink-template

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is this?](#what-is-this)
  - [npm scripts](#npm-scripts)
  - [IDEA Run Configurations](#idea-run-configurations)
- [How to update the template](#how-to-update-the-template)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is this?

This is a template project that makes it easy to work w/ Ink v3 to build CLI apps using Node.js w/
TypeScript and Jest for testing. Make sure to run `npm install` before running the scripts or the
IDEA Run Configurations shown below.

### npm scripts

There are two sets of scripts, ones that just run a command once, and others that start them in
watch mode (very mich like webpack hot-reload).

- To run any of the following scripts you can execute `npm run <SCRIPT_NAME>`.
- However, to run the `run.fish` script, you have to just execute it using `./run.fish`.

#### One off scripts

| Task                     | Script          | Notes                                                  |
| ------------------------ | --------------- | ------------------------------------------------------ |
| Compiling                | `build`         | run`tsc` to generate JS files in the `dist` folder.    |
| Running (no compilation) | `start`         | run the `dist/cli.js` file (make sure its executable). |
| Compiling and running    | `build-and-run` | run the `build` script, then the `dist/cli.js` file.   |
| Run tests                | `test`          | run all the Jest tests (no need for compiling).        |

Notes about `start` script:

1. Make sure to mark `dist/cli.js` file as executable so that this self executing module can run.
2. To pass command line arguments you can use `npm run start -- --name=Grogu`.
3. You can also run `npm exec -c 'ink-cli-app --name=Grogu'`.

#### Watch mode scripts (hot-reload)

| Task                          | Script        | Notes                                                                                          |
| ----------------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| Compiling                     | `build-watch` | run`tsc` and watch for changes.                                                                |
| Compiling and running         | `dev`         | run `nodemon` & watch for changes in `ts`, `tsx`, `json` files; run `build-and-run` on change. |
| Compiling and running forever | `run.fish`    | run `forever` to run the `dev` script & restart it when it fails.                              |

### npm link

If you want to create a symlink for the executable node module in this template project, you can
simply run the following command in the folder containing `package.json`. It will create a symlink
`ink-cli-app` (that should be in your `$PATH` depending on how you installed Node.js).

```shell
$ npm link
```

#### How do I change the name of the CLI app?

The `name` property in `package.json` is `ink-cli-app` by default. If you want to rename it to
something else, just change this property. If you want to update your symlink, then you have to run
the following commands.

```shell
$ npm uninstall -g ink-cli-app
$ npm link
```

### IDEA Run Configurations

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

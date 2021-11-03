/**
 * Currently (as of Node v17.0.1) there are some serious issues w/ using
 * [ESM](https://jestjs.io/docs/ecmascript-modules).
 *
 * When a node module is marked as `"type": "module"` in `package.json`, and `tsconfig.json` is
 * updated w/ `compilerOptions` that generate ESM code (which means that `import` & `export` is
 * used instead of `module.exports` & `require`, then a lot of existing libraries like Jest
 * have issues loading their own TS config files correctly!
 *
 * These libraries tend to use `require` at their boot up sequence assuming their config files
 * are written in CJS (CommonJS modules) which then fails because we are using TS files which
 * are compiled to EJM (which means `require` can't be used). Yikes! 😮
 *
 * This is a fantastic [issue in the jest repo]
 * (https://github.com/facebook/jest/issues/11453#issuecomment-850977379) that gets to
 * the heart of what is going wrong. The issue is great and the comments are great, w/ the
 * `ts-jest` author chiming in. And a very simple workaround is provided there as well in a comment.
 *
 * TL;DR: These issues will be resolved as ESM support in Node.js and the ecosystem matures. And
 * for now, an effective workaround is to use a `cjs` file instead of a `ts` file for
 * `jest.config`. This bypasses our TS code generation to ESM altogether.
 */
module.exports = {
  preset: "ts-jest", // Tell Jest to use `ts-jest` plugin.
  testEnvironment: "node", // Execution environment (can't be `ts-node`).
  testMatch: ["<rootDir>/**/*.test.ts"], // Test files must end in `*.test.ts`.
  testPathIgnorePatterns: ["/node_modules/"], // Don't search for tests inside `node_modules`.

  extensionsToTreatAsEsm: [".ts"], // ESM Support for ts-jest.
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
}

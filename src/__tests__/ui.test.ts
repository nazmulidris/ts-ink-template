import React from "react"
import chalk from "chalk"
import { render } from "ink-testing-library"
import App from "../ui.js"

describe("my test suite", () => {
  test("a spec with an expectation", () => {
    expect(true).toBe(true)
  })

  test("another spec with a different expectation", () => {
    expect(false).toBe(false)
  })
})

describe("ink test suite", () => {
  test("greet unknown user", () => {
    const { lastFrame } = render(React.createElement(App, null))
    expect(lastFrame()).toEqual("Hello, \u001b[32mStranger\u001b[39m")
  })

  test("greet user with a name", () => {
    const { lastFrame } = render(React.createElement(App, { name: "Jane" }))
    expect(lastFrame()).toEqual(chalk`Hello, {green Jane}`)
  })
})

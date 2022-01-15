/*
 * Copyright 2021 Nazmul Idris All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { render } from "ink-testing-library"
import { TextColor } from "r3bl-ts-utils"
import React from "react"
import App from "../ui"

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
    const instance = render(React.createElement(App, { name: "Jane" }))
    const { lastFrame } = instance
    expect(lastFrame()).toContain(TextColor.builder.green.build()("Jane"))
  })
})
#!/usr/bin/env node

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

import React from "react"
import { render } from "ink"
import App from "./ui"
import { _let } from "r3bl-ts-utils"
import { Command } from "commander"

const name: string = _let(new Command(), (command) => {
  command.option("-n, --name <name>", "name to display")
  command.parse(process.argv)
  const options = command.opts()
  return options["name"] as string
})

render(<App name={name} />)

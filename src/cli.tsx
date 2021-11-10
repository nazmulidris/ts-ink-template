#!/usr/bin/env node
import React from "react"
import { render } from "ink"
import App from "./ui.js"
import { _let } from "r3bl-ts-utils"
import { Command } from "commander"

const name: string = _let(new Command(), (command) => {
  command.option("-n, --name <name>", "name to display")
  command.parse(process.argv)
  const options = command.opts()
  return options.name
})

render(<App name={name} />)

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

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  projects: [
    {
      displayName: "node:🟡 env project",
      transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
      },
      testEnvironment: "node",
      testMatch: ["**/__tests__/**/*.test.ts?(x)"],
    },
    {
      displayName: "jsdom:🟢 browser env project",
      transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
      },
      testEnvironment: "jsdom",
      testMatch: ["**/__tests__/**/*.test.jsdom.ts?(x)"],
    },
  ],
}

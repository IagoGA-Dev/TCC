/** =========================================
 *  Arquivo de configuração principal do Jest
 *  =========================================
 */

const { defaults } = require("jest-config");

module.exports = {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "js",
    "json",
    "node",
  ],
  setupFilesAfterEnv: ["./tests/setup.js"],
};

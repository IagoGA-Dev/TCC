/** =========================================
 *  Arquivo de configuração principal do Jest
 *  =========================================
 */

// ! Não é o melhor lugar para colocar um TODO, massss...
// TODO: Verificar openHandles.

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

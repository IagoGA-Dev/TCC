/** =========================================
 *  Arquivo de configuração principal do Jest
 *  =========================================
 */

// ? Não é o melhor lugar para colocar um TODO, massss...
// TODO: Verificar openHandles.
// TODO: Adicionar mais casos, usar Banido.test.js como exemplo.
// * ^ A maioria vai funcionar normalmente já que o controller é o mesmo.
// ! Também vai ser necessário trabalhar com valores inválidos.
// ! Exemplo: Inteiros negativos, strings vazias, etc.
// * ^ Usar middleware de validação.
// TODO: (talvez) Separar os testes por CRUD.
// * É mais por uma questão de organização.

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

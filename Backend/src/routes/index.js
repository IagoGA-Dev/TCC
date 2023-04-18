const express = require("express");
const router = express.Router();
const fs = require("fs");

fs.readdirSync(__dirname).forEach((file) => {
  // * Importar error iria separar uma rota única para ele
  // * Não é possível renomear para error.js porque entraria em conflito com o swagger.
  if (file.endsWith("Route.js") && !file.startsWith("error")) {
    let routeName = file.slice(0, -8);
    let routeFile = require(`./${file}`);

    router.use(`/${routeName}`, routeFile);
  }
});

module.exports = router;

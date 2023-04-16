const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TCC API",
      version: "1.0.0",
      description: "API do TCC",
    },
    servers: [{
      url: "http://localhost:3000",
    }, ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(swaggerOptions);

const express = require("express");
const app = express();
const port = 3000;

const router = require("./src/routes/index");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(morgan("dev"));

app.use("/api", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res) => {
  res.status(404).send("Não foi possível encontrar a rota: " + req.url);
});

const server = app.listen(port, () => {
  console.log(`Backend escutando na porta: ${port}`);
});

module.exports = { app, server };
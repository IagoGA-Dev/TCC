const request = require("supertest");
const { app, server } = require("../index");
const db = require("../src/models");

const { Grupo } = db.sequelize.models;

let createdGrupo;

describe("GRUPO API", () => {
  let logMessages = [];
  beforeAll(async () => {
    console.log = (message) => {
      logMessages.push(message);
    };

    await Grupo.destroy({
      where: {
        Categoria: "Teste",
      },
    });
  });

  it("deve criar um novo grupo", async () => {
    const res = await request(app).post("/api/grupo/").send({
      Nome: "Teste",
      Categoria: "Teste",
      Privado: "false",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdGrupo = res.body;
  });

  it("Deve recuperar todos os grupos", async () => {
    const res = await request(app).get("/api/grupo/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve recuperar um grupo pelo ID", async () => {
    const res = await request(app).get(`/api/grupo/${createdGrupo.ID}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.Nome).toEqual("Teste");
  });

  it("deve atualizar um grupo", async () => {
    const updatedNome = "Teste Atualizado";
    const res = await request(app).put(`/api/grupo/${createdGrupo.ID}`).send({
      Nome: updatedNome,
      Categoria: "Teste",
      Privado: "false",
    });

    expect(res.statusCode).toEqual(200);

    const updatedGrupo = await Grupo.findOne({
      where: { ID: createdGrupo.ID },
    });
    expect(updatedGrupo.Nome).toEqual(updatedNome);
  });

  // Não está funcionando corretamente, mesmo se eu obtenho o ID pelo createdGrupo, ele não deleta o grupo do banco de dados mesmo retornando 200.
  // TODO: Verificar o motivo do erro.
  it("deve deletar um grupo", async () => {
    // Vou alterar posteriormente... Só temporariamente...
    const grupo = await Grupo.findOne({
      where: { Categoria: "Teste" },
    });
    const res = await request(app).delete(`/api/grupo/${grupo.ID}`);

    expect(res.statusCode).toEqual(200);

    const deletedGrupo = await Grupo.findOne({
      where: { ID: grupo.ID },
    });

    expect(deletedGrupo).toBeNull();
  });

  afterAll(async () => {
    await db.sequelize.close();
    await server.close();
  });
});

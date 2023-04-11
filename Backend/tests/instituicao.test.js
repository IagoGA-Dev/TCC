const request = require("supertest");
const { app, server } = require("../index");
const db = require("../src/models");

const { Instituicao } = db.sequelize.models;

describe("INSTITUICAO API", () => {
  let createdInstituicao;
  let logMessages = [];

  beforeAll(async () => {
    console.log = (message) => {
      logMessages.push(message);
    };
  });

  it("deve criar uma nova instituicao", async () => {
    const res = await request(app).post("/api/instituicao/").send({
      Nome: "Teste",
      Siglas: "Teste",
      Logo: "./test.png",
      Descricao: "Teste",
      UsaListaEspera: "false",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdInstituicao = res.body;
  });

  it("deve retornar uma instituição", async () => {
    const res = await request(app).get(
      `/api/instituicao/${createdInstituicao.ID}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("ID");
    expect(res.body.ID).toEqual(createdInstituicao.ID);
  });

  it("deve atualizar uma instituição", async () => {
    const updatedNome = "Teste Atualizado";
    const res = await request(app)
      .put(`/api/instituicao/${createdInstituicao.ID}`)
      .send({
        Nome: updatedNome,
        Siglas: "Teste",
        Logo: "./test.png",
        Descricao: "Teste",
        UsaListaEspera: "false",
      });

    expect(res.statusCode).toEqual(200);

    const updatedInstituicao = await Instituicao.findOne({
      where: { ID: createdInstituicao.ID },
    });
    expect(updatedInstituicao.Nome).toEqual(updatedNome);
  });

  it("deve deletar uma instituição", async () => {
    const res = await request(app).delete(
      `/api/instituicao/${createdInstituicao.ID}`
    );
    expect(res.statusCode).toEqual(200);

    const deletedInstituicao = await Instituicao.findOne({
      where: { ID: createdInstituicao.ID },
    });
    expect(deletedInstituicao).toBeNull();
  });

  afterAll(async () => {
    await db.sequelize.close();
    await server.close();
  });
});

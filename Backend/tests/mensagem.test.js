const requests = require("supertest");
const { app, server } = require("../index");
const db = require("../src/models");

const { Mensagem } = db.sequelize.models;

let createdMensagem;

describe("MENSAGEM API", () => {
  let logMessages = [];
  beforeAll(async () => {
    console.log = (message) => {
      logMessages.push(message);
    };
  });

  it("deve criar uma nova mensagem", async () => {
    const res = await requests(app).post("/api/mensagem/").send({
      Data: "2020-09-01 11:00:00",
      Texto: "Olá, mundo!",
      Imagem: "/GRUPO_TESTE/Teste.png",
      Arquivo: "/GRUPO_TESTE/Teste.png",
      Tamanho: 12345,
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdMensagem = res.body;
  });

  it("deve recuperar uma mensagem pelo ID", async () => {
    const res = await requests(app).get(`/api/mensagem/${createdMensagem.ID}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.ID_Usuario).toEqual(1);
  });

  it("deve recuperar todas as mensagens", async () => {
    const res = await requests(app).get("/api/mensagem/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve atualizar uma mensagem", async () => {
    const updatedText = "Olá, mundo! Atualizado!";
    const res = await requests(app)
      .put(`/api/mensagem/${createdMensagem.ID}`)
      .send({
        Data: "2020-09-01 11:00:00",
        Texto: updatedText,
        Imagem: "/GRUPO_TESTE/Teste.png",
        Arquivo: "/GRUPO_TESTE/Teste.png",
        Tamanho: 12345,
        ID_Usuario: 1,
        ID_Grupo: 1,
      });

    expect(res.statusCode).toEqual(200);

    const updatedMensagem = await Mensagem.findOne({
      where: { ID: createdMensagem.ID },
    });
    expect(updatedMensagem.Texto).toEqual(updatedText);
  });

  it("deve deletar uma mensagem", async () => {
    const res = await requests(app).delete(
      `/api/mensagem/${createdMensagem.ID}`
    );
    expect(res.statusCode).toEqual(200);

    const deletedMensagem = await Mensagem.findOne({
      where: { ID: createdMensagem.ID },
    });
    expect(deletedMensagem).toEqual(null);
  });

  afterAll(async () => {
    await Mensagem.destroy({ where: {} });

    await db.sequelize.close();
    await server.close();
  });
});

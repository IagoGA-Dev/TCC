const request = require("supertest");
const { app, server } = require("../index");

describe("INSTITUICAO API", () => {
  let createdInstituicao;

  let logMessages = [];

  beforeAll(async () => {
    // * Desabilitando o console.log
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

  it("deve retornar todas as instituições", async () => {
    const res = await request(app).get("/api/instituicao/");
    expect(res.statusCode).toEqual(200);
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

    // * Mesmo caso que os anteriores. Vou usar uma maneira alternativa
    // * de atualizar sem usar models.
  });

  it("deve deletar uma instituição", async () => {
    const res = await request(app).delete(
      `/api/instituicao/${createdInstituicao.ID}`
    );
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await server.close();
  });
});

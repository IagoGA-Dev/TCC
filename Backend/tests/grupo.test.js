const request = require("supertest");
const { app, server } = require("../index");


describe("GRUPO API", () => {
  let createdGrupo;

  let logMessages = [];

  beforeAll(async () => {
    // * Desabilita o console.log
    console.log = (message) => {
      logMessages.push(message);
    };

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

  // * Provavelmente vai funcionar já que o controller é o mesmo.
  it("não deve criar um grupo que já existe", async () => {
    const res = await request(app).post("/api/grupo/").send({
      Nome: "Teste",
      Categoria: "Teste",
      Privado: "false",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um grupo com nome acima de 50 caracteres", async () => {
    const nome = "a".repeat(51);
    const res = await request(app).post("/api/grupo/").send({
      Nome: nome,
      Categoria: "Teste",
      Privado: "false",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um grupo com categoria acima de 50 caracteres", async () => {
    const categoria = "a".repeat(51);
    const res = await request(app).post("/api/grupo/").send({
      Nome: "Teste",
      Categoria: categoria,
      Privado: "false",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um grupo com nome de 2 caracteres", async () => {
    const nome = "aa";
    const res = await request(app).post("/api/grupo/").send({
      Nome: nome,
      Categoria: "Teste",
      Privado: "false",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um grupo com categoria de 2 caracteres", async () => {
    const categoria = "aa";
    const res = await request(app).post("/api/grupo/").send({
      Nome: "Teste",
      Categoria: categoria,
      Privado: "false",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um grupo com string no campo privado", async () => {
    const res = await request(app).post("/api/grupo/").send({
      Nome: "Teste",
      Categoria: "Teste",
      Privado: "string",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("deve recuperar todos os grupos", async () => {
    const res = await request(app).get("/api/grupo/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve recuperar um grupo pelo ID", async () => {
    const res = await request(app).get(`/api/grupo/${createdGrupo.ID}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.Nome).toEqual("Teste");
  });

  it("não deve recuperar um grupo que não existe", async () => {
    const res = await request(app).get("/api/grupo/-1");

    expect(res.statusCode).toEqual(404);
  });

  it("deve atualizar um grupo", async () => {
    const updatedNome = "Teste Atualizado";
    const res = await request(app).put(`/api/grupo/${createdGrupo.ID}`).send({
      Nome: updatedNome,
      Categoria: "Teste",
      Privado: "false",
    });

    expect(res.statusCode).toEqual(200);
    // TODO: Verificar atualização por API.
  });

  it("deve deletar um grupo", async () => {
    const res = await request(app).delete(`/api/grupo/${createdGrupo.ID}`); // * ...

    expect(res.statusCode).toEqual(200);

    // * Verificar se o código é 200 já é o suficiente
    // * Mas pode ser interessante fazer uma busca posteriormente.
  });

  afterAll(async () => {
    // * Só fechando o servidor já que não tem dependência com outras tabelas.
    await server.close();
  });
});

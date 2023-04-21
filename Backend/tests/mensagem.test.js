const requests = require("supertest");
const { app, server } = require("../index");

// TODO: Adicionar mais casos de uso
// * Como se o usuário que mandou a mensagem não existir.

describe("MENSAGEM API", () => {
  let createdMensagem;

  let logMessages = [];

  beforeAll(async () => {
    // * Desabilitando o console.log
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
      Tamanho: 12345, // TODO: Especificar posteriormente qual o formato (KB, MB, GB).
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdMensagem = res.body;
  });

  it("não deve criar uma mensagem que já existe", async () => {
    const res = await requests(app).post("/api/mensagem/").send({
      Data: "2020-09-01 11:00:00",
      Texto: "Olá, mundo!",
      Imagem: "/GRUPO_TESTE/Teste.png",
      Arquivo: "/GRUPO_TESTE/Teste.png",
      Tamanho: 12345,
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar uma mensagem com data inválida (string)", async () => {
    const res = await requests(app).post("/api/mensagem/").send({
      Data: "string",
      Texto: "Olá, mundo!",
      Imagem: "/GRUPO_TESTE/Teste.png",
      Arquivo: "/GRUPO_TESTE/Teste.png",
      Tamanho: 12345,
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar uma mensagem com texto que passa 500 caracteres", async () => {
    const res = await requests(app).post("/api/mensagem/").send({
      Data: "2020-09-01 11:00:00",
      Texto: "a".repeat(501),
      Imagem: "/GRUPO_TESTE/Teste.png",
      Arquivo: "/GRUPO_TESTE/Teste.png",
      Tamanho: 12345,
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve aceitar uma string em Tamanho", async () => {
    const res = await requests(app).post("/api/mensagem/").send({
      Data: "2020-09-01 11:00:00",
      Texto: "Olá, mundo!",
      Imagem: "/GRUPO_TESTE/Teste.png",
      Arquivo: "/GRUPO_TESTE/Teste.png",
      Tamanho: "string",
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("deve recuperar todas as mensagens", async () => {
    const res = await requests(app).get("/api/mensagem/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve recuperar uma mensagem pelo ID", async () => {
    const res = await requests(app).get(`/api/mensagem/${createdMensagem.ID}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.ID_Usuario).toEqual(1);
  });

  it("não deve recuperar uma mensagem com ID inválido", async () => {
    const res = await requests(app).get(`/api/mensagem/-1`);

    expect(res.statusCode).toEqual(404);
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
  });

  it("não deve atualizar uma mensagem com ID inválido", async () => {
    const res = await requests(app).put(`/api/mensagem/-1`).send({
      Data: "2020-09-01 11:00:00",
      Texto: "Olá, mundo!",
      Imagem: "/GRUPO_TESTE/Teste.png",
      Arquivo: "/GRUPO_TESTE/Teste.png",
      Tamanho: 12345,
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(404);
  });

  it("deve deletar uma mensagem", async () => {
    const res = await requests(app).delete(
      `/api/mensagem/${createdMensagem.ID}`
    );
    expect(res.statusCode).toEqual(200);
  });

  it("não deve deletar uma mensagem com ID inválido", async () => {
    const res = await requests(app).delete(`/api/mensagem/-1`);

    expect(res.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await server.close();
  });
});

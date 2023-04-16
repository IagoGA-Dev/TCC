const requests = require("supertest");
const { app, server } = require("../index");

// TODO: Adicionar mais casos de uso
// * Como se o usuário criado não existir.

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

  it("deve recuperar todas as mensagens", async () => {
    const res = await requests(app).get("/api/mensagem/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve recuperar uma mensagem pelo ID", async () => {
    const res = await requests(app).get(`/api/mensagem/${createdMensagem.ID}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.ID_Usuario).toEqual(1);
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

  it("deve deletar uma mensagem", async () => {
    const res = await requests(app).delete(
      `/api/mensagem/${createdMensagem.ID}`
    );
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await server.close();
  });
});

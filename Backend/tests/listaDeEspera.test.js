const request = require("supertest");
const { app, server } = require("../index");

describe("LISTA_DE_ESPERA API", () => {
  let createdListaDeEspera;
  let createdInstituicao;
  let createdUsuario;

  let logMessages = [];

  beforeAll(async () => {
    // * Desabilitando o console.log
    console.log = (message) => {
      logMessages.push(message);
    };

    let res; // * Reaproveitando a variável

    // * Criando dados para testes
    const instituicao = {
      Nome: "Teste Instituição",
      Siglas: "Teste",
      Logo: "./test.png",
      Descricao: "Teste",
      UsaListaEspera: "false", // TODO: Tenho que alterar isso posteriormente... mesmo que por meio de um middleware que altera de boolean para string
    };

    // * De certo modo esse teste também depende que /api/instituicao e /api/usuario estejam funcionando corretamente.
    // * Não é necessáriamente um problema, mas deve ser levado em consideração.
    res = await request(app).post("/api/instituicao").send(instituicao);

    if (res.statusCode !== 201) process.exit(1);
    createdInstituicao = res.body;

    const usuario = {
      Nome: "Teste Usuario",
      Email: "teste@example.com",
      Senha: "test123",
      CPF: "05353932021",
      ID_Instituicao: createdInstituicao.ID,
    };

    res = await request(app).post("/api/usuario").send(usuario);
    if (res.statusCode !== 201) process.exit(1);
    createdUsuario = res.body;
  });

  // * Início dos testes. Não precisa modificar por enquanto.
  it("deve criar uma nova lista de espera", async () => {
    const res = await request(app).post("/api/listaDeEspera/").send({
      ID_Instituicao: createdInstituicao.ID,
      ID_Usuario: createdUsuario.ID,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdListaDeEspera = res.body;
  });

  it("não deve criar uma lista de espera com string no ID_Usuario", async () => {
    const res = await request(app).post("/api/listaDeEspera/").send({
      ID_Instituicao: createdInstituicao.ID,
      ID_Usuario: "string",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar uma lista de espera com string no ID_Instituicao", async () => {
    const res = await request(app).post("/api/listaDeEspera/").send({
      ID_Instituicao: "string",
      ID_Usuario: createdUsuario.ID,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar uma lista de espera com um usuário que não existe", async () => {
    const res = await request(app).post("/api/listaDeEspera/").send({
      ID_Instituicao: createdInstituicao.ID,
      ID_Usuario: 999
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar uma lista de espera com uma instituição que não existe", async () => {
    const res = await request(app).post("/api/listaDeEspera/").send({
      ID_Instituicao: 999,
      ID_Usuario: createdUsuario.ID
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar uma lista de espera com um usuário que já está na lista de espera", async () => {
    const res = await request(app).post("/api/listaDeEspera/").send({
      ID_Instituicao: createdInstituicao.ID,
      ID_Usuario: createdUsuario.ID
    });

    expect(res.statusCode).toEqual(400);
  });

  it("deve retornar todas as listas de espera", async () => {
    const res = await request(app).get("/api/listaDeEspera");
    expect(res.statusCode).toEqual(200);
  });

  it("deve retornar uma lista de espera", async () => {
    const res = await request(app).get(
      `/api/listaDeEspera/${createdListaDeEspera.ID}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("ID");
    expect(res.body.ID).toEqual(createdListaDeEspera.ID);
  });

  it("não deve retornar uma lista de espera com ID inválido", async () => {
    const res = await request(app).get(`/api/listaDeEspera/-1`);
    expect(res.statusCode).toEqual(404);
  });

  it("deve atualizar uma lista de espera", async () => {
    const updatedInstituicao = 1;
    const res = await request(app)
      .put(`/api/listaDeEspera/${createdListaDeEspera.ID}`)
      .send({
        ID_Instituicao: updatedInstituicao,
        ID_Usuario: createdUsuario.ID,
      });

      expect(res.statusCode).toEqual(200);
  });

  it("não deve atualizar uma lista de espera com ID inválido", async () => {
    const updatedInstituicao = 1;
    const res = await request(app)
      .put(`/api/listaDeEspera/-1`)
      .send({
        ID_Instituicao: updatedInstituicao,
        ID_Usuario: createdUsuario.ID,
      });

      expect(res.statusCode).toEqual(404);
  });

  it("deve deletar uma lista de espera", async () => {
    const res = await request(app).delete(
      `/api/listaDeEspera/${createdListaDeEspera.ID}`
    );
    expect(res.statusCode).toEqual(200); // * Retornar 200 já é o suficiente
  });

  it("não deve deletar uma lista de espera com ID inválido", async () => {
    const res = await request(app).delete(`/api/listaDeEspera/-1`);
    expect(res.statusCode).toEqual(404);
  });

  afterAll(async () => {
    // * Requisições para deletar os dados criados
    // * Depende do controller pra lidar com as chaves estrangeiras

    // ! Não alterar ordem de deleção...
    await request(app).delete(`/api/usuario/${createdUsuario.ID}`);
    await request(app).delete(`/api/instituicao/${createdInstituicao.ID}`);

    await server.close();
  });
});

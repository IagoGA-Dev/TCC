const request = require("supertest");
const { app, server } = require("../index");

describe("BANIDO API", () => {
  let createdGrupo, createdUsuario, createdUsuarioGrupo, createdBanido;
  let logMessages = [];

  beforeAll(async () => {
    console.log = (message) => {
      logMessages.push(message);
    };

    let res;

    // * Dados para os testes
    const usuario = {
      Nome: "Teste",
      Email: "teste@gmail.com",
      Senha: "minha_senha",
      CPF: "05353932021",
      ID_Instituicao: 1, // * Sempre vai existir.
    };

    const grupo = {
      Nome: "Teste",
      Categoria: "Teste",
      Privado: "false",
    };

    res = await request(app).post("/api/usuario").send(usuario);
    if (res.statusCode !== 201) {
      console.log(res.statusCode);
      process.exit(1);
    }
    createdUsuario = res.body;

    res = await request(app).post("/api/grupo").send(grupo);
    if (res.statusCode !== 201) process.exit(1);
    createdGrupo = res.body;

    // * Associação do usuário ao grupo
    // * É necessário para gerar um banimento
    res = await request(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: createdUsuario.ID,
      ID_Grupo: createdGrupo.ID,
    });
    if (res.statusCode !== 201) process.exit(1);
    createdUsuarioGrupo = res.body;
  });

  it("deve criar um novo banimento", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: createdUsuario.ID,
      ID_Grupo: createdGrupo.ID,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdBanido = res.body;
  });

  it("não deve criar um novo banimento com um grupo que não existe", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: createdUsuario.ID,
      ID_Grupo: -1,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um novo banimento com um usuário que não existe", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: -1,
      ID_Grupo: createdGrupo.ID,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um novo banimento com um usuário que já está banido", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: createdUsuario.ID,
      ID_Grupo: createdGrupo.ID,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve aceitar uma string no ID_Usuario", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: "teste",
      ID_Grupo: createdGrupo.ID,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve aceitar uma string no ID_Grupo", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: createdUsuario.ID,
      ID_Grupo: "teste",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("deve retornar todos os banimentos", async () => {
    const res = await request(app).get("/api/banido/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve retornar um banimento", async () => {
    const res = await request(app).get(`/api/banido/${createdBanido.ID}`);
    expect(res.statusCode).toEqual(200);
  });

  it("não deve retornar um banimento que não existe", async () => {
    const res = await request(app).get("/api/banido/-1");
    expect(res.statusCode).toEqual(404);
  });

  it("deve deletar um banimento", async () => {
    const res = await request(app).delete(`/api/banido/${createdBanido.ID}`);
    expect(res.statusCode).toEqual(200);
  });

  it("não deve deletar um banimento que não existe", async () => {
    const res = await request(app).delete("/api/banido/-1");
    expect(res.statusCode).toEqual(404);
  });

  afterAll(async () => {
    // * Limpeza dos dados criados
    await request(app).delete(`/api/usuarioGrupo/${createdUsuarioGrupo.ID}`);
    await request(app).delete(`/api/usuario/${createdUsuario.ID}`);
    await request(app).delete(`/api/grupo/${createdGrupo.ID}`);

    await server.close();
  });
});

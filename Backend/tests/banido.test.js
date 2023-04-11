const request = require("supertest");
const { app, server } = require("../index");
const db = require("../src/models");

describe("BANIDO API", () => {
  let usuario;
  let grupo;
  let banido;
  let logMessages = [];

  beforeAll(async () => {
    // console.log = (message) => {
    //   logMessages.push(message);
    // };

    // Garantia de que o usuário não existe
    const usuarioCheck = await request(app).post("/api/usuario/search/").send({
      Email: "test@gmail.com",
    });

    if (usuarioCheck.statusCode === 200) {
      await request(app).delete(`/api/usuario/${usuarioCheck.body[0].ID}`);
    }

    // Garantia de que o grupo não existe
    const grupoCheck = await request(app).post("/api/grupo/search/").send({
      Nome: "Teste",
    });

    if (grupoCheck.statusCode === 200) {
      await request(app).delete(`/api/grupo/${grupoCheck.body[0].ID}`);
    }

    // Criação do usuário
    const usuarioRes = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "teste@gmail.com",
      Senha: "123456",
      Salt: "test123",
      CPF: "12345678910",
      ID_Instituicao: 1,
    });
    usuario = usuarioRes.body;

    // Criação do grupo
    const grupoRes = await request(app).post("/api/grupo/").send({
      Nome: "Teste",
      Categoria: "Teste",
      Privado: "false",
    });
    grupo = grupoRes.body;

    // Associação do usuário ao grupo
    await request(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: usuario.ID,
      ID_Grupo: grupo.ID,
    });
  });

  it("deve criar um novo banimento", async () => {
    console.log(`
    ID_Usuario: ${usuario.ID}
    ID_Grupo: ${grupo.ID}
    `);

    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: usuario.ID,
      ID_Grupo: grupo.ID,
    });

    banido = res.body;

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");
  });

  it("não deve criar um novo banimento com um grupo que não existe", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: usuario.ID,
      ID_Grupo: -1,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um novo banimento com um usuário que não existe", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: -1,
      ID_Grupo: grupo.ID,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um novo banimento com um usuário que já está banido", async () => {
    const res = await request(app).post("/api/banido/").send({
      ID_Usuario: usuario.ID,
      ID_Grupo: grupo.ID,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("deve retornar todos os banimentos", async () => {
    const res = await request(app).get("/api/banido/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve retornar um banimento", async () => {
    const res = await request(app).get(`/api/banido/${banido.ID}`);
    expect(res.statusCode).toEqual(200);
  });

  it("não deve retornar um banimento que não existe", async () => {
    const res = await request(app).get("/api/banido/-1");
    expect(res.statusCode).toEqual(404);
  });

  it("deve deletar um banimento", async () => {
    const res = await request(app).delete(`/api/banido/${banido.ID}`);
    expect(res.statusCode).toEqual(200);
  });

  it("não deve deletar um banimento que não existe", async () => {
    const res = await request(app).delete("/api/banido/-1");
    expect(res.statusCode).toEqual(404);
  });

  afterAll(async () => {
    // Deletar o usuário e grupo criados
    await request(app).delete(`/api/usuario/${usuario.ID}`);
    await request(app).delete(`/api/grupo/${grupo.ID}`);

    await db.sequelize.close();
    await server.close();
  });
});

const request = require("supertest");
const { app, server } = require("../index");
const db = require("../src/models");

const { Usuario } = db.sequelize.models;

let createdUsuario;

describe("USUARIO API", () => {
  let logMessages = [];

  beforeAll(async () => {
    console.log = (message) => {
      logMessages.push(message);
    };
  });

  it("deve criar um novo usuário", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "teste@teste.com",
      Senha: "testesenha",
      Salt: "testsalt",
      CPF: "12345678901",
      ID_Instituicao: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdUsuario = res.body;
  });

  it("deve recuperar um usuário pelo ID", async () => {
    const res = await request(app).get(`/api/usuario/${createdUsuario.ID}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.Nome).toEqual("Teste");
  });

  it("deve atualizar um usuário", async () => {
    const updatedNome = "Teste Atualizado";
    const res = await request(app)
      .put(`/api/usuario/${createdUsuario.ID}`)
      .send({
        Nome: updatedNome,
        Email: "teste@teste.com",
        Senha: "testesenha",
        Salt: "testsalt",
        CPF: "12345678901",
        ID_Instituicao: 1,
      });

    expect(res.statusCode).toEqual(200);

    const updatedUsuario = await Usuario.findOne({
      where: { ID: createdUsuario.ID },
    });
    expect(updatedUsuario.Nome).toEqual(updatedNome);
  });

  it("deve deletar um usuário", async () => {
    const res = await request(app).delete(`/api/usuario/${createdUsuario.ID}`);

    expect(res.statusCode).toEqual(200);

    const deletedUsuario = await Usuario.findOne({
      where: { ID: createdUsuario.ID },
    });
    expect(deletedUsuario).toBeNull();
  });
  afterAll(async () => {
    await db.sequelize.close();
    await server.close();
  });
});

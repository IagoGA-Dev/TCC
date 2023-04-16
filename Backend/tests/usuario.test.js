const request = require("supertest");
const { app, server } = require("../index");

describe("USUARIO API", () => {
  let createdUsuario;

  let logMessages = [];

  beforeAll(async () => {
    // * Desabilitando o console.log
    console.log = (message) => {
      logMessages.push(message);
    };
  });

  it("deve criar um novo usuário", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "teste@gmail.com",
      Senha: "123456",
      Salt: "test123",
      CPF: "12345678910",
      ID_Instituicao: 1, // * Sempre vai existir.
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
    // ! Deve haver uma forma melhor de fazer isso
    const updatedNome = "Teste Atualizado";
    const res = await request(app)
      .put(`/api/usuario/${createdUsuario.ID}`)
      .send({
        Nome: updatedNome,
        Email: createdUsuario.Email,
        Senha: createdUsuario.Senha,
        Salt: createdUsuario.Salt,
        CPF: createdUsuario.CPF,
        ID_Instituicao: createdUsuario.ID_Instituicao
      });

    expect(res.statusCode).toEqual(200);
  });

  it("deve deletar um usuário", async () => {
    const res = await request(app).delete(`/api/usuario/${createdUsuario.ID}`);

    expect(res.statusCode).toEqual(200);
  });
  afterAll(async () => {
    await server.close();
  });
});

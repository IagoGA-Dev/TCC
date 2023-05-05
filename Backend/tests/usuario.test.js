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

  it("não deve criar um novo usuário com um dos campos faltando", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "teste@gmail.com",
      Senha: "123456",
      ID_Instituicao: 1, // * Sempre vai existir.
    });

    expect(res.statusCode).toEqual(400);
  });

  it("deve criar um novo usuário", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "teste@gmail.com",
      Senha: "123456",
      CPF: "05353932021",
      ID_Instituicao: 1, // * Sempre vai existir.
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdUsuario = res.body;
  });

  it("deve entrar com o usuário criado", async () => {
    const res = await request(app).post("/api/usuario/login").send({
      Email: "teste@gmail.com",
      Senha: "123456",
    });

    expect(res.statusCode).toEqual(200);
  });

  it("não deve entrar com senha inválida", async() => {
    const res = await request(app).post("/api/usuario/login").send({
      Email: "teste@gmail.com",
      Senha: "1234567",
    });

    expect(res.statusCode).toEqual(401);
  });

  it("não deve entrar com um email inexistente", async() => {
    const res = await request(app).post("/api/usuario/login").send({
      Email: "incorreto@gmail.com",
      Senha: "123456",
    });

    expect(res.statusCode).toEqual(404);
  });

  it("não deve aceitar um email inválido no login", async () => {
    const res = await request(app).post("/api/usuario/login").send({
      Email: "string",
      Senha: "123456",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um usuário que já exista", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "teste@gmail.com",
      Senha: "123456",
      CPF: "05353932021",
      ID_Instituicao: 1, // * Sempre vai existir.
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um usuário com email inválido", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "string",
      Senha: "123456",
      CPF: "05353932021",
      ID_Instituicao: 1, // * Sempre vai existir.
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um usuário com CPF inválido (dígitos insuficientes)", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "teste2@gmail.com",
      Senha: "123456",
      CPF: "123",
      ID_Instituicao: 1, // * Sempre vai existir.
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um usuário com CPF inválido (digitos verificadores)", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Nome: "Teste",
      Email: "teste2@gmail.com",
      Senha: "123456",
      CPF: "05353932022",
      ID_Instituicao: 1, // * Sempre vai existir.
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um usuário com CPF inválido (00000000000)", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Nome: "Teste",
      Email: "teste2@gmail.com",
      Senha: "123456",
      CPF: "00000000000",
      ID_Instituicao: 1, // * Sempre vai existir.
    });

    expect(res.statusCode).toEqual(400);
  });


  it("não deve criar um usuário com uma instituição que não existe", async () => {
    const res = await request(app).post("/api/usuario/").send({
      Nome: "Teste",
      Email: "teste2@gmail.com",
      Senha: "123456",
      CPF: "05353932021",
      ID_Instituicao: -1,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("deve recuperar um usuário pelo ID", async () => {
    const res = await request(app).get(`/api/usuario/${createdUsuario.ID}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.Nome).toEqual("Teste");
  });

  it("não deve retornar um usuário com ID inválido", async () => {
    const res = await request(app).get(`/api/usuario/-1`);

    expect(res.statusCode).toEqual(404);
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
        CPF: createdUsuario.CPF,
        ID_Instituicao: createdUsuario.ID_Instituicao
      });

    expect(res.statusCode).toEqual(200);
  });

  it("não deve atualizar um usuário com ID inválido", async () => {
    const updatedNome = "Teste Atualizado";
    const res = await request(app)
      .put(`/api/usuario/-1`)
      .send({
        Nome: updatedNome,
        Email: createdUsuario.Email,
        Senha: createdUsuario.Senha,
        CPF: createdUsuario.CPF,
        ID_Instituicao: createdUsuario.ID_Instituicao
      });

    expect(res.statusCode).toEqual(404);
  })

  it("deve deletar um usuário", async () => {
    const res = await request(app).delete(`/api/usuario/${createdUsuario.ID}`);

    expect(res.statusCode).toEqual(200);
  });

  it("não deve criar um usuário com ID inválido", async () => {
    const res = await request(app).delete(`/api/usuario/-1`);

    expect(res.statusCode).toEqual(404);
  })

  afterAll(async () => {
    await server.close();
  });
});

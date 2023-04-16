const requests = require("supertest");
const { app, server } = require("../index");

describe("USUARIO ESPECIAL API", () => {
  let createdUsuario, createdUsuarioEspecial;

  let logMessages = [];
  beforeAll(async () => {
    // * Desabilitando o console.log
    console.log = (message) => {
      logMessages.push(message);
    };
    let res;

    // * Criando dados para testes
    const usuario = {
      Nome: "Teste",
      Email: "teste@gmail.com",
      Senha: "123456",
      CPF: "12345678910",
      ID_Instituicao: 1, // * Sempre vai existir.
    };
    res = await requests(app).post("/api/usuario/").send(usuario);
    createdUsuario = res.body;

  });

  it("deve criar um novo usuario especial", async () => {
    const res = await requests(app).post("/api/usuarioEspecial/").send({
      ID_Usuario: createdUsuario.ID,
      Tipo: "Assistente",
      ID_GrupoModerado: 1, // * Sempre vai existir. Não precisa alterar.
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdUsuarioEspecial = res.body;
  });

  it("deve recuperar todos os usuario especials", async () => {
    const res = await requests(app).get("/api/usuarioEspecial/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve recuperar um usuario especial pelo ID", async () => {
    const res = await requests(app).get(
      `/api/usuarioEspecial/${createdUsuarioEspecial.ID}`
    );

    expect(res.statusCode).toEqual(200);
  });

  it("deve atualizar um usuario especial", async () => {
    const updatedRole = "Moderador";
    const res = await requests(app)
      .put(`/api/usuarioEspecial/${createdUsuarioEspecial.ID}`)
      .send({
        ID_Usuario: createdUsuario.ID,
        Tipo: updatedRole,
        ID_GrupoModerado: 1,
      });

    expect(res.statusCode).toEqual(200);
  });

  it("deve deletar um usuario especial", async () => {
    const res = await requests(app).delete(
      `/api/usuarioEspecial/${createdUsuarioEspecial.ID}`
    );
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await requests(app).delete(`/api/usuario/${createdUsuario.ID}`);
    await server.close();
  });
});

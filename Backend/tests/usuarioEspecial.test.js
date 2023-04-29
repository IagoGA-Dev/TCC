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
      CPF: "05353932021",
      ID_Instituicao: 1, // * Sempre vai existir.
    };
    res = await requests(app).post("/api/usuario/").send(usuario);
    createdUsuario = res.body;

  });

  it("não deve criar um usuário especial de tipo inválido", async () => {
    const res = await requests(app).post("/api/usuarioEspecial/").send({
      ID_Usuario: createdUsuario.ID,
      Tipo: "tipo_inexistente",
      ID_GrupoModerado: 1, // * Sempre vai existir. Não precisa alterar.
    });

    expect(res.statusCode).toEqual(400);
  });

  it("deve criar um novo usuário especial", async () => {
    const res = await requests(app).post("/api/usuarioEspecial/").send({
      ID_Usuario: createdUsuario.ID,
      Tipo: "Assistente",
      ID_GrupoModerado: 1, // * Sempre vai existir. Não precisa alterar.
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdUsuarioEspecial = res.body;
  });

  it("não deve criar um usuário especial que já exista", async () => {
    const res = await requests(app).post("/api/usuarioEspecial/").send({
      ID_Usuario: createdUsuario.ID,
      Tipo: "Assistente",
      ID_GrupoModerado: 1,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um usuário especial com um usuário inexistente", async () => {
    const res = await requests(app).post("/api/usuarioEspecial/").send({
      ID_Usuario: -1,
      Tipo: "Assistente",
      ID_GrupoModerado: 1,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um usuário especial com um grupo inexistente", async () => {
    const res = await requests(app).post("/api/usuarioEspecial/").send({
      ID_Usuario: createdUsuario.ID,
      Tipo: "Assistente",
      ID_GrupoModerado: -1,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um usuário especial com string no campo de ID_Usuario", async () => {
    const res = await requests(app).post("/api/usuarioEspecial/").send({
      ID_Usuario: "string",
      Tipo: "Assistente",
      ID_GrupoModerado: 1,
    });

    expect(res.statusCode).toEqual(400);
  })

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

  it("não deve retornar um usuário com ID inválido", async () => {
    const res = await requests(app).get(
      `/api/usuarioEspecial/-1`
    );

    expect(res.statusCode).toEqual(404);
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

  it("não deve atualizar um usuario especial que não existe", async () => {
    const updatedRole = "Moderador";
    const res = await requests(app)
      .put(`/api/usuarioEspecial/-1`)
      .send({
        ID_Usuario: createdUsuario.ID,
        Tipo: updatedRole,
        ID_GrupoModerado: 1,
      });

    expect(res.statusCode).toEqual(404);
  });

  it("deve deletar um usuario especial", async () => {
    const res = await requests(app).delete(
      `/api/usuarioEspecial/${createdUsuarioEspecial.ID}`
    );
    expect(res.statusCode).toEqual(200);
  });

  it("não deve deletar um usuário especial que não exista", async () => {
    const res = await requests(app).delete(
      `/api/usuarioEspecial/-1`
    );
    expect(res.statusCode).toEqual(404);
  })

  afterAll(async () => {
    await requests(app).delete(`/api/usuario/${createdUsuario.ID}`);
    await server.close();
  });
});

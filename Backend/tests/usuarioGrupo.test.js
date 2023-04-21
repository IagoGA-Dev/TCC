const requests = require("supertest");
const { app, server } = require("../index");


describe("USUARIO GRUPO API", () => {
  let createdUsuarioGrupo;

  let logMessages = [];
  beforeAll(async () => {
    // * Desabilitando o console.log
    console.log = (message) => {
      logMessages.push(message);
    };
  });

  it("deve criar um novo usuario grupo", async () => {
    const res = await requests(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdUsuarioGrupo = res.body;
  });

  it("não deve criar um usuario grupo que já exista", async () => {
    const res = await requests(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: 1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(400);
  });

  it("não deve criar um usuario grupo com um usuário que não existe", async () => {
    const res = await requests(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: -1,
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um usuario grupo com um grupo que não existe", async () => {
    const res = await requests(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: 1,
      ID_Grupo: -1,
    });

    expect(res.statusCode).toEqual(500);
  });

  it("não deve criar um usuario grupo com uma string no campo usuário", async () => {
    const res = await requests(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: "string",
      ID_Grupo: 1,
    });

    expect(res.statusCode).toEqual(400);
  })

  it("não deve criar um usuario grupo com uma string no campo grupo", async () => {
    const res = await requests(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: 1,
      ID_Grupo: "string",
    });

    expect(res.statusCode).toEqual(400);
  })

  it("não deve criar um usuario grupo com um dos campos faltando", async () => {
    const res = await requests(app).post("/api/usuarioGrupo/").send({
      ID_Usuario: 1,
    });

    expect(res.statusCode).toEqual(400);
  })

  it("deve recuperar todos os usuario grupos", async () => {
    const res = await requests(app).get("/api/usuarioGrupo/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve recuperar um usuario grupo pelo ID", async () => {
    const res = await requests(app).get(
      `/api/usuarioGrupo/${createdUsuarioGrupo.ID}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body.ID_Usuario).toEqual(1);
  });

  it("não deve recuperar um usuario grupo que não exista", async () => {
    const res = await requests(app).get(
      `/api/usuarioGrupo/-1`
    );

    expect(res.statusCode).toEqual(404);
  });

  it("deve atualizar um usuario grupo", async () => {
    const updatedID_Usuario = 2;
    const res = await requests(app)
      .put(`/api/usuarioGrupo/${createdUsuarioGrupo.ID}`)
      .send({
        ID_Usuario: updatedID_Usuario,
        ID_Grupo: 1,
      });

    expect(res.statusCode).toEqual(200);
  });

  it("não deve atualizar um usuario grupo que não exista", async () => {
    const res = await requests(app)
      .put(`/api/usuarioGrupo/-1`)
      .send({
        ID_Usuario: 2,
        ID_Grupo: 1,
      });

    expect(res.statusCode).toEqual(404);
  });

  it("deve deletar um usuario grupo", async () => {
    const res = await requests(app).delete(
      `/api/usuarioGrupo/${createdUsuarioGrupo.ID}`
    );
    expect(res.statusCode).toEqual(200);
  });

  it("não deve deletar um usuario grupo que não exista", async () => {
    const res = await requests(app).delete(
      `/api/usuarioGrupo/-1`
    );
    expect(res.statusCode).toEqual(404);
  });

  afterAll(async () => {
    await server.close();
  });
});

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

  it("deve recuperar um usuario grupo pelo ID", async () => {
    const res = await requests(app).get(
      `/api/usuarioGrupo/${createdUsuarioGrupo.ID}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body.ID_Usuario).toEqual(1);
  });

  it("deve recuperar todos os usuario grupos", async () => {
    const res = await requests(app).get("/api/usuarioGrupo/");
    expect(res.statusCode).toEqual(200);
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

  it("deve deletar um usuario grupo", async () => {
    const res = await requests(app).delete(
      `/api/usuarioGrupo/${createdUsuarioGrupo.ID}`
    );
    expect(res.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await server.close();
  });
});

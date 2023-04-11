const requests = require("supertest");
const { app, server } = require("../index");
const db = require("../src/models");

const { UsuarioEspecial } = db.sequelize.models;

let createdUsuarioEspecial;

describe("USUARIO ESPECIAL API", () => {
  let logMessages = [];
  beforeAll(async () => {
    console.log = (message) => {
      logMessages.push(message);
    };
  });

  it("deve criar um novo usuario especial", async () => {
    const res = await requests(app).post("/api/usuarioEspecial/").send({
      ID_Usuario: 1,
      Tipo: "Assistente",
      ID_GrupoModerado: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdUsuarioEspecial = res.body;
  });

  it("deve recuperar um usuario especial pelo ID", async () => {
    const res = await requests(app).get(
      `/api/usuarioEspecial/${createdUsuarioEspecial.ID}`
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body.ID_Usuario).toEqual(1);
  });

  it("deve recuperar todos os usuario especials", async () => {
    const res = await requests(app).get("/api/usuarioEspecial/");
    expect(res.statusCode).toEqual(200);
  });

  it("deve atualizar um usuario especial", async () => {
    const updatedID_Usuario = 2;
    const res = await requests(app)
      .put(`/api/usuarioEspecial/${createdUsuarioEspecial.ID}`)
      .send({
        ID_Usuario: updatedID_Usuario,
        Tipo: "Assistente",
        ID_GrupoModerado: 1,
      });

    expect(res.statusCode).toEqual(200);

    const updatedUsuarioEspecial = await UsuarioEspecial.findOne({
      where: { ID: createdUsuarioEspecial.ID },
    });
    expect(updatedUsuarioEspecial.ID_Usuario).toEqual(updatedID_Usuario);
  });

  it("deve deletar um usuario especial", async () => {
    const res = await requests(app).delete(
      `/api/usuarioEspecial/${createdUsuarioEspecial.ID}`
    );
    expect(res.statusCode).toEqual(200);
    const deletedUsuarioEspecial = await UsuarioEspecial.findOne({
      where: { ID: createdUsuarioEspecial.ID },
    });
    expect(deletedUsuarioEspecial).toBeNull();
  });

  afterAll(async () => {
    await UsuarioEspecial.destroy({ where: {} });
    await server.close();
  });
});

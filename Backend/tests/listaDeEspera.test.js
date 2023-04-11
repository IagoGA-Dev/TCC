const request = require("supertest");
const { app, server } = require("../index");
const db = require("../src/models");

const { ListaDeEspera, Instituicao, Usuario } = db.sequelize.models;

describe("LISTA_DE_ESPERA API", () => {
  let createdListaDeEspera;
  let createdInstituicao;
  let createdUsuario;
  let logMessages = [];

  beforeAll(async () => {
    console.log = (message) => {
      logMessages.push(message);
    };

    const instituicao = await Instituicao.create({
      Nome: "Teste Instituição",
      Siglas: "Teste",
      Logo: "./test.png",
      Descricao: "Teste",
      UsaListaEspera: false,
    });
    createdInstituicao = instituicao.get({ plain: true });

    const usuario = await Usuario.create({
      Nome: "Teste Usuario",
      Email: "teste@example.com",
      Senha: "test123",
      Salt: "randomsalt",
      CPF: "12345678900",
      ID_Instituicao: createdInstituicao.ID,
    });
    createdUsuario = usuario.get({ plain: true });
  });

  it("deve criar uma nova lista de espera", async () => {
    const res = await request(app).post("/api/listaDeEspera/").send({
      ID_Instituicao: createdInstituicao.ID,
      ID_Usuario: createdUsuario.ID,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("ID");

    createdListaDeEspera = res.body;
  });

  it("deve retornar uma lista de espera", async () => {
    const res = await request(app).get(
      `/api/listaDeEspera/${createdListaDeEspera.ID}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("ID");
    expect(res.body.ID).toEqual(createdListaDeEspera.ID);
  });

  it("deve deletar uma lista de espera", async () => {
    const res = await request(app).delete(
      `/api/listaDeEspera/${createdListaDeEspera.ID}`
    );
    expect(res.statusCode).toEqual(200);

    const deletedListaDeEspera = await ListaDeEspera.findOne({
      where: { ID: createdListaDeEspera.ID },
    });
    expect(deletedListaDeEspera).toBeNull();
  });

  afterAll(async () => {
    // Destruindo os dados criados
    // Arrumar posteriormente. Provavelmente um problema com chaves estrangeiras.
    // await Instituicao.destroy({ where: { ID: createdInstituicao.ID } });
    // await Usuario.destroy({ where: { ID: createdUsuario.ID } });

    await db.sequelize.close();
    await server.close();
  });
});

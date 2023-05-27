const dbConfig = require("../config/config.json");
const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize(
//   dbConfig.development.database,
//   dbConfig.development.username,
//   dbConfig.development.password,
//   {
//     host: dbConfig.development.HOST,
//     dialect: dbConfig.development.dialect,
//     operatorsAliases: false,

//     pool: {
//       max: dbConfig.development.pool.max,
//       min: dbConfig.development.pool.min,
//       acquire: dbConfig.development.pool.acquire,
//       idle: dbConfig.development.pool.idle,
//     },

//     logging: false,
//   },
// );


const sequelize = new Sequelize('tcc', 'tcc', '123', { 
  host: 'db',
  dialect: 'mariadb',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((err) => {
    console.log("Não foi possível conectar ao banco de dados:", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tabelas
db.Usuario = require("./usuarioModel.js")(sequelize, DataTypes);
db.Instituicao = require("./instituicaoModel.js")(sequelize, DataTypes);
db.ListaDeEspera = require("./listaDeEsperaModel.js")(sequelize, DataTypes);
db.Mensagem = require("./mensagemModel.js")(sequelize, DataTypes);
db.Banido = require("./banidoModel.js")(sequelize, DataTypes);
db.Grupo = require("./grupoModel.js")(sequelize, DataTypes);
db.UsuarioEspecial = require("./usuarioEspecialModel.js")(sequelize, DataTypes);
db.UsuarioGrupo = require("./usuarioGrupoModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Tabelas sincronizadas");
});

module.exports = db;

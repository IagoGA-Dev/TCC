/**
 * TODO: Implementar autenticação nos métodos
 */

const fs = require("fs");

class CrudController {
  constructor(model) {
    this.model = model;

    this.fields = Object.keys(this.model.getAttributes());
    this.requiredFields = this.fields.filter((field) => {
      return this.model.rawAttributes[field].allowNull === false;
    });
  }

  // Função temporária para logar erros no arquivo log.txt
  logErrorToFile(error) {
    fs.appendFile(
      "log.txt",
      `${new Date().toISOString()} - ${error}\n`,
      (err) => {
        if (err) {
          console.error("Erro ao registrar no arquivo:", err);
        }
      }
    );
  }

  create(req, res) {
    // Verifica se os campos obrigatórios foram preenchidos
    let missingFields = [];
    this.requiredFields.forEach((field) => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).send({
        code: 1,
        message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
      });
    }

    // Garante que apenas os campos especificados serão inseridos
    const item = {};
    this.fields.forEach((field) => {
      if (req.body[field]) {
        item[field] = req.body[field];
      }
    });

    // Verifica se o objeto a ser criado já existe, ou que pelo menos tenha os mesmos campos que o objeto a ser criado atual.
    this.model
      .findOne({
        where: item,
      })
      .then((data) => {
        if (data) {
          return res.status(400).send({
            code: 2,
            message: "Objeto já existe",
          });
        }

        // Cria o objeto no banco de dados
        this.model
          .create(item)
          .then((data) => {
            return res.status(201).send(data);
          })
          .catch((err) => {
            console.log(err);
            this.logErrorToFile(err.message);
            return res.status(500).send({
              code: 3,
              message: "Erro interno no servidor",
            });
          });
      });
  }

  findAll(_, res) {
    this.model
      .findAll()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((_) => {
        res.status(500).send({
          code: 3,
          message: "Erro interno no servidor",
        });
      });
  }

  findOne(req, res) {
    if (!req.params.id) {
      res.status(400).send({
        code: 1,
        message: "Falha no corpo da requisição",
      });
      return;
    }

    const id = req.params.id;

    this.model
      .findByPk(id)
      .then((data) => {
        if (data) {
          res.status(200).send(data);
        } else {
          res.status(404).send({
            code: 2,
            message: "Objeto da requisição não encontrado",
          });
        }
      })
      .catch((_) => {
        res.status(500).send({
          code: 3,
          message: "Erro interno no servidor",
        });
      });
  }

  search(req, res) {
    // Verifica se o corpo da requisição está vazio
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        code: 1,
        message: "Corpo da requisição vazio",
      });
    }

    // Verifica se os atributos são válidos
    const invalidAttributes = Object.keys(req.body).filter(
      (attr) => !this.fields.includes(attr)
    );
    if (invalidAttributes.length > 0) {
      return res.status(400).send({
        code: 2,
        message: `Atributos inválidos: ${invalidAttributes.join(", ")}`,
      });
    }

    // Procura por registros que correspondam aos critérios fornecidos
    this.model
      .findAll({ where: req.body })
      .then((data) => {
        if (data.length > 0) {
          res.status(200).send(data);
        } else {
          res.status(404).send({
            code: 3,
            message: "Nenhum registro encontrado com os critérios fornecidos",
          });
        }
      })
      .catch((_) => {
        res.status(500).send({
          code: 4,
          message: "Erro interno no servidor",
        });
      });
  }

  update(req, res) {
    // Verifica se os campos obrigatórios foram preenchidos
    let missingFields = [];
    this.requiredFields.forEach((field) => {
      if (!req.body.hasOwnProperty(field)) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).send({
        code: 1,
        message: `Campos obrigatórios faltando: ${missingFields.join(", ")}`,
      });
    }

    const id = req.params.id;

    this.model.findByPk(id).then((data) => {
      if (data) {
        data
          .update(req.body)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((_) => {
            res.status(500).send({
              code: 3,
              message: "Erro interno no servidor",
            });
          });
      } else {
        res.status(404).send({
          code: 2,
          message: "Objeto da requisição não encontrado",
        });
      }
    });
  }

  delete(req, res) {
    if (!req.params.id) {
      res.status(400).send({
        code: 1,
        message: "Falha no corpo da requisição",
      });
    }

    const id = req.params.id;

    this.model
      .destroy({
        where: { ID: id },
      })
      .then((num) => {
        if (num === 1) {
          res.status(200).send({
            message: "Deletado com sucesso",
          });
        } else {
          res.status(404).send({
            code: 2,
            message: "Objeto da requisição não encontrado",
          });
        }
      })
      .catch((_) => {
        res.status(500).send({
          code: 3,
          message: "Erro interno no servidor",
        });
      });
  }
}

module.exports = CrudController;

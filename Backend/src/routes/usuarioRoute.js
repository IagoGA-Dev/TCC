const express = require("express");
const router = express.Router();
const db = require("../models");
const CrudController = require("../controllers");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/**
 *  @swagger
 *  components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - Nome
 *         - Email
 *         - Senha
 *         - CPF
 *         - ID_Instituicao
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID do usuário, auto generado
 *         Nome:
 *           type: string
 *           description: Nome completo do usuário
 *         Email:
 *           type: string
 *           description: Email do usuário
 *         Senha:
 *           type: string
 *           description: Senha do usuário
 *         Salt:
 *           type: string
 *           description: Salt usado para gerar a senha. É gerado automaticamente
 *         CPF:
 *           type: string
 *           description: CPF do usuário
 *         ID_Instituicao:
 *           type: integer
 *           description: ID da instituição do usuário
 *       example:
 *         ID: 1
 *         Nome: João da Silva
 *         Email: joao.silva@ifsp.br
 *         Senha: 9a7e7f1d4c7849abc45e81f24a04fe32
 *         Salt: salt123
 *         CPF: "12345678900"
 *         ID_Instituicao: 1
 */

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: API para gerenciar usuario
 */

/**
 * @swagger
 * /api/usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Retorna uma lista de todos os usuários cadastrados
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: Busca um usuário pelo seu ID.
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do usuário a ser buscado.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuario/{id}:
 *   patch:
 *     summary: Atualiza um usuário existente pelo ID.
 *     tags: [Usuario]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário a ser atualizado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Objeto contendo os campos a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdate'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuario/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser removido
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

usuario = new CrudController(db.Usuario);

// * Função para gerar salt e senha criptografada.
const generateSaltAndHash = (senha) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(senha, salt);
  return { salt, hash };
};

router.use((req, res, next) => {
    
  // * Gera salt e hash para a senha
  if (req.body.Senha) {
    const { salt, hash } = generateSaltAndHash(req.body.Senha);
    req.body.Senha = hash;
    req.body.Salt = salt;
  }
  next();
});

router.post("/", usuario.create.bind(usuario));
router.get("/", usuario.findAll.bind(usuario));
router.get("/search", usuario.search.bind(usuario));
router.get("/:id", usuario.findOne.bind(usuario));
router.put("/:id", usuario.update.bind(usuario));
router.delete("/:id", usuario.delete.bind(usuario));

module.exports = router;

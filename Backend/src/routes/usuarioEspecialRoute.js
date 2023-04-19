const express = require("express");
const Validator = require("validatorjs");
const router = express.Router();
const db = require("../models");
const CrudController = require("../controllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioEspecial:
 *       type: object
 *       required:
 *         - ID_Usuario
 *         - Tipo
 *         - ID_GrupoModerado
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID do usuário especial
 *         ID_Usuario:
 *           type: integer
 *           description: ID do usuário
 *         Tipo:
 *           type: string
 *           enum: [Assistente, Professor, Moderador]
 *           description: Tipo do usuário especial
 *         ID_GrupoModerado:
 *           type: integer
 *           description: ID do grupo moderado pelo usuário especial
 *       example:
 *         ID: 1
 *         ID_Usuario: 1
 *         Tipo: Assistente
 *         ID_GrupoModerado: 1
 */

/**
 * @swagger
 * tags:
 *   name: UsuarioEspecial
 *   description: API para gerenciar usuários especiais
 */

/**
 * @swagger
 * /api/usuarioespecial/:
 *   post:
 *     summary: Cria um novo usuário especial
 *     tags: [UsuarioEspecial]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioEspecial'
 *     responses:
 *       201:
 *         description: Criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioEspecial'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuarioespecial/:
 *   get:
 *     summary: Retorna todos os usuários especiais
 *     tags: [UsuarioEspecial]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioEspecial'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuarioespecial/{id}:
 *   get:
 *     summary: Retorna um usuário especial pelo ID
 *     tags: [UsuarioEspecial]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário especial
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioEspecial'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuarioespecial/{id}:
 *   patch:
 *     summary: Atualiza um usuário especial pelo ID
 *     tags: [UsuarioEspecial]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário especial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioEspecial'
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioEspecial'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuarioespecial/{id}:
 *   delete:
 *     summary: Remove um usuário especial pelo ID
 *     tags: [UsuarioEspecial]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário especial
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioEspecial'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

usuarioEspecial = new CrudController(db.UsuarioEspecial);

const rules = {
  ID_Usuario: "required|integer",
  Tipo: "required|string|in:Assistente,Professor,Moderador",
  ID_GrupoModerado: "required|integer",
};

router.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }
  next();
});

router.post("/", usuarioEspecial.create.bind(usuarioEspecial));
router.get("/", usuarioEspecial.findAll.bind(usuarioEspecial));
router.get("/search", usuarioEspecial.search.bind(usuarioEspecial));
router.get("/:id", usuarioEspecial.findOne.bind(usuarioEspecial));
router.put("/:id", usuarioEspecial.update.bind(usuarioEspecial));
router.delete("/:id", usuarioEspecial.delete.bind(usuarioEspecial));

module.exports = router;

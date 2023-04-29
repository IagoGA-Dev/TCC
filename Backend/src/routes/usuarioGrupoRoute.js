const express = require("express");
const Validator = require("validatorjs");
const router = express.Router();
const db = require("../models");
const CrudController = require("../controllers");
const { validateUsuarioGrupo } = require("../middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioGrupo:
 *       type: object
 *       required:
 *         - ID_Usuario
 *         - ID_Grupo
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID da relação entre usuário e grupo
 *         ID_Usuario:
 *           type: integer
 *           description: ID do usuário
 *         ID_Grupo:
 *           type: integer
 *           description: ID do grupo
 *       example:
 *         ID: 1
 *         ID_Usuario: 1
 *         ID_Grupo: 1
 */

/**
 * @swagger
 * tags:
 *   name: UsuarioGrupo
 *   description: API para gerenciar a relação entre usuários e grupos
 */

/**
 * @swagger
 * /api/usuarioGrupo/:
 *   post:
 *     summary: Cria uma nova relação entre usuário e grupo
 *     tags: [UsuarioGrupo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioGrupo'
 *     responses:
 *       201:
 *         description: Criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioGrupo'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuarioGrupo/:
 *   get:
 *     summary: Retorna todas as relações entre usuários e grupos
 *     tags: [UsuarioGrupo]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioGrupo'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuarioGrupo/{id}:
 *   get:
 *     summary: Retorna uma relação entre usuário e grupo pelo ID
 *     tags: [UsuarioGrupo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da relação entre usuário e grupo
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioGrupo'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuarioGrupo/{id}:
 *   patch:
 *     summary: Atualiza uma relação entre usuário e grupo pelo ID
 *     tags: [UsuarioGrupo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da relação entre usuário e grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioGrupo'
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioGrupo'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/usuarioGrupo/{id}:
 *   delete:
 *     summary: Remove uma relação entre usuário e grupo pelo ID
 *     tags: [UsuarioGrupo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da relação entre usuário e grupo
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsuarioGrupo'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

usuarioGrupo = new CrudController(db.UsuarioGrupo);

router.use(validateUsuarioGrupo);
router.post("/", usuarioGrupo.create.bind(usuarioGrupo));
router.get("/", usuarioGrupo.findAll.bind(usuarioGrupo));
router.get("/search", usuarioGrupo.search.bind(usuarioGrupo));
router.get("/:id", usuarioGrupo.findOne.bind(usuarioGrupo));
router.put("/:id", usuarioGrupo.update.bind(usuarioGrupo));
router.delete("/:id", usuarioGrupo.delete.bind(usuarioGrupo));

module.exports = router;

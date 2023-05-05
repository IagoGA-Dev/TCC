const express = require("express");
const Validator = require("validatorjs");
const { CrudController } = require("../controllers");
const router = express.Router();
const db = require("../models");
const { validateBanido } = require("../middleware");
// const { banPostMiddleware } = require("../middlewares");

/**
 * @swagger
 * components:
 *   schemas:
 *     Banido:
 *       type: object
 *       required:
 *         - ID_Usuario
 *         - ID_Grupo
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID do banimento
 *         ID_Usuario:
 *           type: integer
 *           description: ID do usuário banido
 *         ID_Grupo:
 *           type: integer
 *           description: ID do grupo onde o usuário foi banido
 *       example:
 *         ID: 1
 *         ID_Usuario: 1
 *         ID_Grupo: 1
 */

/**
 * @swagger
 * tags:
 *   name: Banido
 *   description: API para gerenciar banimentos
 */

/**
 * @swagger
 * /api/banido/:
 *   post:
 *     summary: Gera um novo banimento
 *     tags: [Banido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Banido'
 *     responses:
 *       201:
 *         description: Criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grupo'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/banido/:
 *   get:
 *     summary: Retorna todos os banimentos
 *     tags: [Banido]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banido'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/banido/{id}:
 *   get:
 *     summary: Retorna um banimento pelo ID
 *     tags: [Banido]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do banimento
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banido'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 */

/**
 * @swagger
 * /api/banido/{id}:
 *   patch:
 *     summary: Atualiza um banimento pelo ID
 *     tags: [Banido]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do banimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Banido'
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banido'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/banido/{id}:
 *   delete:
 *     summary: Remove um banimento pelo ID
 *     tags: [Banido]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do banimento
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banido'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

banido = new CrudController(db.Banido);

router.use(validateBanido);
router.post("/", banido.create.bind(banido));
router.get("/", banido.findAll.bind(banido));
router.get("/search", banido.search.bind(banido));
router.get("/:id", banido.findOne.bind(banido));
router.put("/:id", banido.update.bind(banido));
router.delete("/:id", banido.delete.bind(banido));

module.exports = router;

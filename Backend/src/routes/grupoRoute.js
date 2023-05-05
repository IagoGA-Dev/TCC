const express = require("express");
const Validator = require("validatorjs");
const router = express.Router();
const db = require("../models");
const { CrudController } = require("../controllers");
const { validateGrupo } = require("../middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Grupo:
 *       type: object
 *       required:
 *         - Nome
 *         - Privado
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID do grupo
 *         Nome:
 *           type: string
 *           description: Nome do grupo
 *         Categoria:
 *           type: string
 *           description: Categoria do grupo
 *         Privado:
 *           type: boolean
 *           description: Indica se o grupo é privado ou não
 *       example:
 *         ID: 1
 *         Nome: "Grupo de teste"
 *         Categoria: "Testes"
 *         Privado: true
 */

/**
 * @swagger
 * tags:
 *   name: Grupo
 *   description: API para gerenciar grupos
 */

/**
 * @swagger
 * /api/grupo/:
 *   post:
 *     summary: Cria um novo grupo
 *     tags: [Grupo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grupo'
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
 * /api/grupo/:
 *   get:
 *     summary: Retorna todos os grupos
 *     tags: [Grupo]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grupo'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/grupo/{id}:
 *   get:
 *     summary: Retorna um grupo pelo ID
 *     tags: [Grupo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do grupo
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grupo'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 */

/**
 * @swagger
 * /api/grupo/{id}:
 *   patch:
 *     summary: Atualiza um grupo pelo ID
 *     tags: [Grupo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do grupo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grupo'
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grupo'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/grupo/{id}:
 *   delete:
 *     summary: Remove um grupo pelo ID
 *     tags: [Grupo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do grupo
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grupo'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 */

grupo = new CrudController(db.Grupo);

router.use(validateGrupo);

router.post("/", grupo.create.bind(grupo));
router.get("/", grupo.findAll.bind(grupo));
router.get("/search", grupo.search.bind(grupo));
router.get("/:id", grupo.findOne.bind(grupo));
router.put("/:id", grupo.update.bind(grupo));
router.delete("/:id", grupo.delete.bind(grupo));

module.exports = router;

const express = require("express");
const Validator = require("validatorjs");
const router = express.Router();
const db = require("../models");
const { CrudController } = require("../controllers");
const { validateMensagem } = require("../middleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Mensagem:
 *       type: object
 *       required:
 *         - Data
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID da mensagem
 *         Data:
 *           type: string
 *           format: date-time
 *           description: Data da mensagem
 *         Texto:
 *           type: string
 *           description: Texto da mensagem
 *         Imagem:
 *           type: string
 *           description: URL da imagem anexada à mensagem
 *         Arquivo:
 *           type: string
 *           description: URL do arquivo anexado à mensagem
 *         Tamanho:
 *           type: integer
 *           description: Tamanho do arquivo anexado à mensagem
 *       example:
 *         ID: 1
 *         Data: "2023-03-25T14:30:00.000Z"
 *         Texto: "Olá, tudo bem?"
 *         Imagem: "http://example.com/imagem.jpg"
 *         Arquivo: "http://example.com/arquivo.pdf"
 *         Tamanho: 1024
 */

/**
 * @swagger
 * tags:
 *   name: Mensagem
 *   description: API para gerenciar mensagens
 */

/**
 * @swagger
 * /api/mensagem/:
 *   post:
 *     summary: Cria uma nova mensagem
 *     tags: [Mensagem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mensagem'
 *     responses:
 *       201:
 *         description: Criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/mensagem/:
 *   get:
 *     summary: Retorna todas as mensagens
 *     tags: [Mensagem]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mensagem'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/mensagem/{id}:
 *   get:
 *     summary: Retorna uma mensagem pelo ID
 *     tags: [Mensagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da mensagem
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/mensagem/{id}:
 *   patch:
 *     summary: Atualiza uma mensagem pelo ID
 *     tags: [Mensagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da mensagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mensagem'
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/mensagem/{id}:
 *   delete:
 *     summary: Remove uma mensagem pelo ID
 *     tags: [Mensagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da mensagem
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

mensagem = new CrudController(db.Mensagem);

router.use(validateMensagem);
router.post("/", mensagem.create.bind(mensagem));
router.get("/", mensagem.findAll.bind(mensagem));
router.get("/search", mensagem.search.bind(mensagem));
router.get("/:id", mensagem.findOne.bind(mensagem));
router.put("/:id", mensagem.update.bind(mensagem));
router.delete("/:id", mensagem.delete.bind(mensagem));

module.exports = router;

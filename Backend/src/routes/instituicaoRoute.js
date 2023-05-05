const express = require("express");
const Validator = require("validatorjs");
const router = express.Router();
const db = require("../models");
const { CrudController } = require("../controllers");
const { validateInstituicao } = require("../middleware");

/**
 *  @swagger
 *  components:
 *   schemas:
 *     Instituicao:
 *       type: object
 *       required:
 *         - Nome
 *         - Siglas
 *         - Logo
 *         - UsaListaEspera
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID da instituição, auto generado mas pode ser definido manualmente
 *         Nome:
 *           type: string
 *           description: Nome da instituição
 *         Siglas:
 *           type: string
 *           description: Siglas da instituição
 *         Logo:
 *           type: string
 *           description: Localização para o logo da instituição. Exemplo "/SIGLAS/logo.png"
 *         Descricao:
 *           type: string
 *           description: Breve descrição da instituição, não é obrigatório
 *         UsaListaEspera:
 *           type: boolean
 *           description: Se a instituição usa lista de espera ou não
 *       example:
 *         ID: 1
 *         Nome: Universidade Federal de Minas Gerais
 *         Siglas: UFMG
 *         Logo: /UFMG/logo.png
 *         Descricao: A UFMG é uma universidade pública federal brasileira, localizada na cidade de Belo Horizonte, capital do estado de Minas Gerais.
 *         UsaListaEspera: true
 */

/**
 * @swagger
 * tags:
 *   name: Instituicao
 *   description: API para gerenciar instituições
 */

/**
 * @swagger
 *   /api/instituicao/:
 *     post:
 *       summary: Cria uma nova instituição
 *       tags: [Instituicao]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instituicao'
 *       responses:
 *         201:
 *           description: Criado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Instituicao'
 *         400:
 *           $ref: '#/components/schemas/400'
 *         500:
 *           $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 *   /api/instituicao/:
 *     get:
 *       summary: Retorna todas as instituições
 *       tags: [Instituicao]
 *       responses:
 *         200:
 *           description: Sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Instituicao'
 *         500:
 *           $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 *  /api/instituicao/{id}:
 *    get:
 *      summary: Retorna uma instituição pelo ID
 *      tags: [Instituicao]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: ID da instituição
 *      responses:
 *        200:
 *          description: Sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Instituicao'
 *        400:
 *          $ref: '#/components/schemas/400'
 *        404:
 *          $ref: '#/components/schemas/404'
 */

/**
 * @swagger
 * /api/instituicao/{id}:
 *   patch:
 *     summary: Atualiza uma instituição pelo ID
 *     tags: [Instituicao]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: ID da instituição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Instituicao'
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instituicao'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/instituicao/{id}:
 *   delete:
 *     summary: Deleta uma instituição pelo ID
 *     tags: [Instituicao]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: ID da instituição
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: Instituição deletada com sucesso
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

instituicao = new CrudController(db.Instituicao);

router.use(validateInstituicao);
router.post("/", instituicao.create.bind(instituicao));
router.get("/", instituicao.findAll.bind(instituicao));
router.get("/search", instituicao.search.bind(instituicao));
router.get("/:id", instituicao.findOne.bind(instituicao));
router.put("/:id", instituicao.update.bind(instituicao));
router.delete("/:id", instituicao.delete.bind(instituicao));

module.exports = router;

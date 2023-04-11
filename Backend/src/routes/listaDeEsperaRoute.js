const express = require("express");
const router = express.Router();
const db = require("../models");
const CrudController = require("../controllers");

/**
 *  @swagger
 *  components:
 *   schemas:
 *     ListaDeEspera:
 *       type: object
 *       required:
 *         - ID_Instituicao
 *         - ID_Usuario
 *       properties:
 *         ID:
 *           type: integer
 *           description: ID da lista de espera, auto gerado
 *         ID_Instituicao:
 *           type: integer
 *           description: ID da instituição associada à lista de espera
 *         ID_Usuario:
 *           type: integer
 *           description: ID do usuário associado à lista de espera
 *       example:
 *         ID: 1
 *         ID_Instituicao: 1
 *         ID_Usuario: 1
 */

/**
 * @swagger
 * tags:
 *   name: Lista de espera
 *   description: API para gerenciar listas de espera
 */

/**
 * @swagger
 *   /api/listaDeEspera/:
 *     post:
 *       summary: Cria uma nova lista de espera
 *       tags: [Lista de espera]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListaDeEspera'
 *       responses:
 *         201:
 *           description: Criado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ListaDeEspera'
 *         400:
 *           $ref: '#/components/schemas/400'
 *         500:
 *           $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 *   /api/listaDeEspera/:
 *     get:
 *       summary: Retorna todas as listas de espera
 *       tags: [Lista de espera]
 *       responses:
 *         200:
 *           description: Listas de espera encontradas com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ListaDeEspera'
 *         500:
 *           $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 *  /api/listaDeEspera/{id}:
 *    get:
 *      summary: Retorna uma lista de espera pelo ID
 *      tags: [Lista de espera]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: ID da lista de espera
 *      responses:
 *        200:
 *          description: Lista de espera encontrada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ListaDeEspera'
 *        404:
 *          $ref: '#/components/schemas/404'
 *        500:
 *          $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/listaDeEspera/{id}:
 *   patch:
 *     summary: Atualiza uma lista de espera pelo ID
 *     tags: [Lista de espera]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: ID da lista de espera
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListaDeEspera'
 *     responses:
 *       200:
 *         description: Lista de espera atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListaDeEspera'
 *       400:
 *         $ref: '#/components/schemas/400'
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

/**
 * @swagger
 * /api/listaDeEspera/{id}:
 *   delete:
 *     summary: Remove uma lista de espera pelo ID
 *     tags: [Lista de espera]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: ID da lista de espera
 *     responses:
 *       200:
 *         description: Lista de espera removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *               example:
 *                 message: Lista de espera removida com sucesso
 *       404:
 *         $ref: '#/components/schemas/404'
 *       500:
 *         $ref: '#/components/schemas/500'
 */

listaDeEspera = new CrudController(db.ListaDeEspera);

router.post("/", listaDeEspera.create.bind(listaDeEspera));
router.get("/", listaDeEspera.findAll.bind(listaDeEspera));
router.get("/search", listaDeEspera.search.bind(listaDeEspera));
router.get("/:id", listaDeEspera.findOne.bind(listaDeEspera));
router.put("/:id", listaDeEspera.update.bind(listaDeEspera));
router.delete("/:id", listaDeEspera.delete.bind(listaDeEspera));

module.exports = router;

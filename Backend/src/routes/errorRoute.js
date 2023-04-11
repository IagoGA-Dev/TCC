// Esse arquivo vai ser usado para criar schemas genéricos relacionados a erros.
// Posteriormente será usado para lidar com erros em rotas.
// Acredito que seja possível optimizar ainda mais usando herança segundo as documentações do swagger. Mas consumiria muito tempo e são apenas 3 erros.
/**
 * @swagger
 * components:
 *   schemas:
 *     400:
 *       description: Falha no corpo da requisição
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 description: Código de erro
 *                 example: 1
 *               message:
 *                 type: string
 *                 description: Mensagem de erro
 *                 example: Falha no corpo da requisição
 *     404:
 *       description: Não encontrado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 description: Código de erro
 *                 example: 2
 *               message:
 *                 type: string
 *                 description: Mensagem de erro
 *                 example: O objeto da requisição não foi encontrado
 *     500:
 *       description: Erro interno
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 description: Código de erro
 *                 example: 3
 *               message:
 *                 type: string
 *                 description: Mensagem de erro
 *                 example: Erro interno no servidor
 */

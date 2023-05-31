const config = require("../config/jwt.json");
const jwt = require("jsonwebtoken");

const createToken = (user) => jwt.sign({
  id: user.ID,
  name: user.Nome,
  email: user.Email,
 }, config.secret, { expiresIn: config.tokenLife });

const createRefreshToken = (user) => jwt.sign({
  id: user.ID,
  name: user.Nome,
  email: user.Email,
}, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });
  

const verifyToken = (token) => {
  if(jwt.decode(token) === null) return new Error("Token inválido.");
  if(jwt.decode(token).exp < Date.now() / 1000) return new Error("Token expirado.");

  return decryptToken(token);
}
const verifyRefreshToken = (token) => jwt.verify(token, config.refreshTokenSecret);

const decryptToken = (token) => jwt.decode(token);

// * Middleware verifica o token e gera um novo caso o refresh token seja válido.
 
const auth = (req, res, next) => {

  const token = req.cookies["x-access-token"];
  const refreshToken = req.cookies["x-refresh-token"];


  if (!token) return res.status(401).send("Acesso negado. Token não fornecido.");

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (ex) {

    if (!refreshToken) return res.status(401).send("Acesso negado. Token não fornecido.");

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const newToken = createToken(decoded);
      const newRefreshToken = createRefreshToken(decoded);

      res.set("x-access-token", newToken);
      res.set("x-refresh-token", newRefreshToken);
      
      req.user = decoded;
      next();
    } catch (ex) {
      return res.status(401).send("Acesso negado. Token não fornecido.");
    }
  }
}

// * Tenho que exportar createToken para o login.
module.exports = {
  auth,
  createToken,
  createRefreshToken,
  decryptToken,
  verifyToken,
  verifyRefreshToken
}
const validator = require("validator");

const banPostMiddleware = (req, res, next) => {
  const { ID_Usuario, ID_Grupo } = req.body;

  // Verifica se os campos estão vazios
  if (ID_Usuario === undefined || ID_Usuario === null || ID_Grupo === undefined || ID_Grupo === null) {
    res.status(400).json({ error: "ID_Usuario e ID_Grupo são obrigatórios" });
  }

  // Verifica se os campos são inteiros
  if (!validator.isInt(ID_Usuario) || !validator.isInt(ID_Grupo)) {
    res.status(400).json({ error: "ID_Usuario e ID_Grupo devem ser inteiros" });
  }

  // Verifica se os campos são positivos
  if (ID_Usuario < 0 || ID_Grupo < 0) {
    res.status(400).json({ error: "ID_Usuario e ID_Grupo devem ser positivos" });
  }

  console.log(req.body);

  next();
};

module.exports = {
  banPostMiddleware,
};

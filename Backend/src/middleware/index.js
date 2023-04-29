const Validator = require("validatorjs");

// * Validação de banido
const validateBanido = (req, res, next) => {
  const rules = {
    ID_Usuario: "required|integer",
    ID_Grupo: "required|integer",
  };

  // * Só valida se for POST ou PUT
  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }
  next();
};

// * Validação de grupo
const validateGrupo = (req, res, next) => {
  const rules = {
    Nome: "required|string|min:3|max:50",
    Categoria: "string|min:3|max:50",
    Privado: "required|boolean",
  };

  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }
  next();
};

// * Validação de instituição
const validateInstituicao = (req, res, next) => {
  const rules = {
    Nome: "required|string|min:3|max:255",
    Siglas: "required|string|min:3|max:255",
    Logo: "required|string|min:3|max:255",
    Descricao: "string|min:3|max:255",
    UsaListaEspera: "boolean",
  };

  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }
  next();
};

// * Validação de lista de espera
const validateListaDeEspera = (req, res, next) => {
  const rules = {
    ID_Instituicao: "required|integer",
    ID_Usuario: "required|integer",
  };
  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }
  next();
};

// * Validação de mensagem
const validateMensagem = (req, res, next) => {
  const rules = {
    Data: "required|date",
    Texto: "required|string|max:500", // ! Temporário, alterar posteriormente para entrar de acordo com tamanho máximo em MB.
    Imagem: "string", // * Path
    Arquivo: "string",
    Tamanho: "integer",
  };

  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }
  next();
};

// * Validação de usuario especial
const validateUsuarioEspecial = (req, res, next) => {
  const rules = {
    ID_Usuario: "required|integer",
    Tipo: "required|string|in:Assistente,Professor,Moderador",
    ID_GrupoModerado: "required|integer",
  };

  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }
  next();
};

// * Validação de usuario grupo
const validateUsuarioGrupo = (req, res, next) => {
  const rules = {
    ID_Usuario: "required|integer",
    ID_Grupo: "required|integer",
  };

  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }
  next();

};
// * Validação de usuário
const validateUsuario = (req, res, next) => {
  const rules = {
    Nome: "required|string|min:3|max:100",
    Email: "required|email",
    Senha: "required|string|min:6|max:100",
    CPF: "required|string|min:11|max:11",
    ID_Instituicao: "required|integer",
  };

  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }
  }

  next();
};

module.exports = {
  validateBanido,
  validateGrupo,
  validateInstituicao,
  validateListaDeEspera,
  validateMensagem,
  validateUsuarioEspecial,
  validateUsuarioGrupo,
  validateUsuario,
};

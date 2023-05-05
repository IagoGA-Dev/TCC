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
  // * Regras de validação
  const rules = {
    Nome: "required|string|min:3|max:100",
    Email: "required|email",
    Senha: "required|string|min:6|max:100",
    CPF: "required|string|min:11|max:11",
    ID_Instituicao: "required|integer",
  };

  // * Função para validar CPF
  const validateCPF = (cpf) => {
    // Substitui caracteres especiais
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf == "") return false;

    // Elimina CPFs invalidos conhecidos (00000000000, 11111111111, ...)
    var knownInvalids = [];
    for (var i = 0; i < 10; i++) knownInvalids.push(i.toString().repeat(11));
    if (cpf.length != 11 || knownInvalids.includes(cpf)) return false;

    // Valida digitos verificadores
    function validateDigit(cpf, digit) {
      var add = 0;
      for (var i = 0; i < digit - 1; i++)
        add += parseInt(cpf.charAt(i)) * (digit - i);
      var rev = 11 - (add % 11);
      if (rev == 10 || rev == 11) rev = 0;
      if (rev != parseInt(cpf.charAt(digit - 1))) return false;
      return true;
    }

    if (!validateDigit(cpf, 10)) return false;
    if (!validateDigit(cpf, 11)) return false;

    return true;
  };

  // * Caso seja uma requisição de login
  if (req.method === "POST" && req.path === "/login") {
    const validation = new Validator(req.body, {
      Email: "required|email",
      Senha: "required|string|min:6|max:100",
    });
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }

    return next();
  }

  // * Valida regras gerais de validação
  if (req.method === "POST" || req.method === "PUT") {
    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).send({
        message: validation.errors.all(),
      });
    }

    // * Valida CPF
    if (!validateCPF(req.body.CPF)) {
      return res.status(400).send({
        message: "CPF inválido",
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

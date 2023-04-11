-- Deletando dados das tabelas

SET FOREIGN_KEY_CHECKS=0;

TRUNCATE ListaDeEspera;
TRUNCATE Banido;
TRUNCATE Mensagem;
TRUNCATE UsuarioGrupo;
TRUNCATE UsuarioEspecial;
TRUNCATE Grupo;
TRUNCATE Usuario;
TRUNCATE Instituicao;

SET FOREIGN_KEY_CHECKS=1;

-- Inserir dados na tabela Instituicao
INSERT INTO Instituicao (ID, Nome, Siglas, Logo, Descricao, UsaListaEspera)
VALUES
(1, 'Sem Instituição', 'N/A', 'N/A', 'N/A', 0),
(NULL, 'Instituto Federal de Educação, Ciência e Tecnologia de São Paulo', 'IFSP', 'IFSP_Logo.png', 'Instituição de ensino superior', 1),
(NULL, 'Universidade de São Paulo', 'USP', 'USP_Logo.png', 'Instituição de ensino superior', 1),
(NULL, 'Universidade Federal de Pernambuco', 'UFPE', 'UFPE_Logo.png', 'Instituição de ensino superior', 1);

-- Inserir dados na tabela Usuario
INSERT INTO Usuario (ID, Nome, Email, Senha, Salt, CPF, ID_Instituicao)
VALUES
(NULL, 'João Silva', 'joao.silva@ifsp.br', '9a7e7f1d4c7849abc45e81f24a04fe32', 'salt123', '12345678901', 1),
(NULL, 'Maria Santos', 'maria.santos@usp.br', '76c0380ec3703dd1388b8f7a2cacc39e', 'salt456', '23456789012', 2),
(NULL, 'Pedro Souza', 'pedro.souza@ufpe.br', 'a06d7e6319ffd18ba1ddc830489136ee', 'salt789', '34567890123', 3);

-- Inserir dados na tabela ListaDeEspera
INSERT INTO ListaDeEspera (ID, ID_Instituicao, ID_Usuario)
VALUES
(NULL, 2, 3),
(NULL, 2, 2),
(NULL, 3, 1);

-- Inserir dados na tabela Grupo
INSERT INTO Grupo (ID, Nome, Categoria, Privado)
VALUES
(1, 'Todos os grupos', 'N/A', 0),
(NULL, 'Algoritmos', 'Computação', 0),
(NULL, 'Programação Web', 'Computação', 0),
(NULL, 'Estatística Discreta', 'Matemática', 1),
(NULL, 'Política', 'Ciências Sociais', 1); -- Já que a aplicação não é só para cursos voltados a TI

-- Inserir dados na tabela UsuarioGrupo
INSERT INTO UsuarioGrupo (ID, ID_Usuario, ID_Grupo)
VALUES
(NULL, 1, 2), -- João, Algoritmos
(NULL, 2, 2), -- Maria, Algoritmos
(NULL, 3, 3), -- Pedro, Programação Web
(NULL, 1, 4); -- João, Estatística Discreta

-- Inserir dados na tabela UsuarioEspecial
INSERT INTO UsuarioEspecial (ID, ID_Usuario, Tipo, ID_GrupoModerado)
VALUES
(NULL, 1, 'Assistente', 2), -- João, Algoritmos
(NULL, 2, 'Professor', 2), -- Maria, Algoritmos
(NULL, 3, 'Moderador', 1); -- Pedro, Todos os grupos;

-- Inserir dados na tabela Banido
INSERT INTO Banido (ID, ID_Usuario, ID_Grupo)
VALUES
(NULL, 2, 2), -- Maria, Algoritmos
(NULL, 3, 3); -- Pedro, Programação Web

-- Inserir dados na tabela Mensagem
INSERT INTO Mensagem (ID, ID_Usuario, Data, ID_Grupo, Texto, Imagem)
VALUES
(NULL, 1, '2022-01-01 10:00:00', 2, 'Olá, pessoal! Bem-vindos ao nosso grupo de estudo!', NULL), -- João
(NULL, 2, '2022-01-01 10:01:00', 2, 'Oi, tudo bem?', NULL), -- Maria
(NULL, 3, '2022-01-01 10:02:00', 2, 'Tudo certo e com você?', NULL), -- Pedro
(NULL, 3, '2022-01-01 10:03:00', 2, 'Estou bem também. Vamos começar a estudar?', NULL), -- Pedro
(NULL, 1, '2022-01-01 10:04:00', 2, 'Claro! O que acham de começarmos com o exercício 3?', NULL), -- João
(NULL, 2, '2022-01-01 10:05:00', 2, 'Tudo bem!', NULL), -- Maria
(NULL, 3, '2022-01-01 10:06:00', 2, 'Também acho!', NULL), -- Pedro
(NULL, 1, '2022-01-01 10:07:00', 2, NULL, '/GRUPO_1/Exercicio3.png'); -- João

-- Inicialização do banco de dados
-- Remover ao final do projeto
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS ListaDeEspera CASCADE;
DROP TABLE IF EXISTS Banido CASCADE;
DROP TABLE IF EXISTS Mensagem CASCADE;
DROP TABLE IF EXISTS UsuarioGrupo CASCADE;
DROP TABLE IF EXISTS UsuarioEspecial CASCADE;
DROP TABLE IF EXISTS Usuario CASCADE;
DROP TABLE IF EXISTS Grupo CASCADE;
DROP TABLE IF EXISTS Instituicao CASCADE;

SET FOREIGN_KEY_CHECKS=1;

-- Gostaria que o valor 0 fosse reservado, mas não é possível sem modificar todos
-- os outros auto_increments.
CREATE TABLE Instituicao (
    ID INT AUTO_INCREMENT PRIMARY KEY, -- Serial dá problema com a chave estrangeira por algum motivo
    Nome VARCHAR(255) NOT NULL,
    Siglas VARCHAR(255) NOT NULL,
    Logo VARCHAR(255),
    Descricao TEXT,
    UsaListaEspera BOOLEAN DEFAULT 0 NOT NULL
);

CREATE TABLE Usuario (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    Salt VARCHAR(255) NOT NULL,
    CPF VARCHAR(11) NOT NULL,
    ID_Instituicao INT NOT NULL,
    FOREIGN KEY (ID_Instituicao) REFERENCES Instituicao(ID)
);

CREATE TABLE ListaDeEspera (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Instituicao INT NOT NULL,
    ID_Usuario INT NOT NULL,
    FOREIGN KEY (ID_Instituicao) REFERENCES Instituicao(ID),
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID)
);

CREATE TABLE Grupo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    Categoria VARCHAR(255),
    Privado BOOLEAN DEFAULT 0 NOT NULL
);

CREATE TABLE UsuarioGrupo (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT NOT NULL,
    ID_Grupo INT NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID),
    FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID)
);

CREATE TABLE UsuarioEspecial (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT NOT NULL,
    Tipo ENUM('Assistente', 'Professor', 'Moderador') NOT NULL,
    ID_GrupoModerado INT NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID),
    FOREIGN KEY (ID_GrupoModerado) REFERENCES Grupo(ID)
);

CREATE TABLE Banido (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT NOT NULL,
    ID_Grupo INT NOT NULL,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID),
    FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID)
);

CREATE TABLE Mensagem (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT NOT NULL,
    Data DATETIME NOT NULL,
    ID_Grupo INT NOT NULL,
    Texto TEXT,
    Imagem VARCHAR(255),
    Arquivo VARCHAR(255),
    Tamanho INT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID),
    FOREIGN KEY (ID_Grupo) REFERENCES Grupo(ID)
);

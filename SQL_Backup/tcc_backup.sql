-- MariaDB dump 10.19  Distrib 10.11.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: tcc
-- ------------------------------------------------------
-- Server version	10.11.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Banido`
--

DROP TABLE IF EXISTS `Banido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Banido` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) NOT NULL,
  `ID_Grupo` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_Grupo` (`ID_Grupo`),
  CONSTRAINT `Banido_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario` (`ID`),
  CONSTRAINT `Banido_ibfk_2` FOREIGN KEY (`ID_Grupo`) REFERENCES `Grupo` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banido`
--

LOCK TABLES `Banido` WRITE;
/*!40000 ALTER TABLE `Banido` DISABLE KEYS */;
INSERT INTO `Banido` VALUES
(1,2,2),
(2,3,3);
/*!40000 ALTER TABLE `Banido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Grupo`
--

DROP TABLE IF EXISTS `Grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Grupo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) NOT NULL,
  `Categoria` varchar(255) DEFAULT NULL,
  `Privado` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Grupo`
--

LOCK TABLES `Grupo` WRITE;
/*!40000 ALTER TABLE `Grupo` DISABLE KEYS */;
INSERT INTO `Grupo` VALUES
(1,'Todos os grupos','N/A',0),
(2,'Algoritmos','Computação',0),
(3,'Programação Web','Computação',0),
(4,'Estatística Discreta','Matemática',1),
(5,'Política','Ciências Sociais',1);
/*!40000 ALTER TABLE `Grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Instituicao`
--

DROP TABLE IF EXISTS `Instituicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Instituicao` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) NOT NULL,
  `Siglas` varchar(255) NOT NULL,
  `Logo` varchar(255) DEFAULT NULL,
  `Descricao` text DEFAULT NULL,
  `UsaListaEspera` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Instituicao`
--

LOCK TABLES `Instituicao` WRITE;
/*!40000 ALTER TABLE `Instituicao` DISABLE KEYS */;
INSERT INTO `Instituicao` VALUES
(1,'Sem Instituição','N/A','N/A','N/A',0),
(2,'Instituto Federal de Educação, Ciência e Tecnologia de São Paulo','IFSP','IFSP_Logo.png','Instituição de ensino superior',1),
(3,'Universidade de São Paulo','USP','USP_Logo.png','Instituição de ensino superior',1),
(4,'Universidade Federal de Pernambuco','UFPE','UFPE_Logo.png','Instituição de ensino superior',1);
/*!40000 ALTER TABLE `Instituicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListaDeEspera`
--

DROP TABLE IF EXISTS `ListaDeEspera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ListaDeEspera` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Instituicao` int(11) NOT NULL,
  `ID_Usuario` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Instituicao` (`ID_Instituicao`),
  KEY `ID_Usuario` (`ID_Usuario`),
  CONSTRAINT `ListaDeEspera_ibfk_1` FOREIGN KEY (`ID_Instituicao`) REFERENCES `Instituicao` (`ID`),
  CONSTRAINT `ListaDeEspera_ibfk_2` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListaDeEspera`
--

LOCK TABLES `ListaDeEspera` WRITE;
/*!40000 ALTER TABLE `ListaDeEspera` DISABLE KEYS */;
INSERT INTO `ListaDeEspera` VALUES
(1,2,3),
(2,2,2),
(3,3,1);
/*!40000 ALTER TABLE `ListaDeEspera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mensagem`
--

DROP TABLE IF EXISTS `Mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mensagem` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) NOT NULL,
  `Data` datetime NOT NULL,
  `ID_Grupo` int(11) NOT NULL,
  `Texto` text DEFAULT NULL,
  `Imagem` varchar(255) DEFAULT NULL,
  `Arquivo` varchar(255) DEFAULT NULL,
  `Tamanho` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_Grupo` (`ID_Grupo`),
  CONSTRAINT `Mensagem_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario` (`ID`),
  CONSTRAINT `Mensagem_ibfk_2` FOREIGN KEY (`ID_Grupo`) REFERENCES `Grupo` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mensagem`
--

LOCK TABLES `Mensagem` WRITE;
/*!40000 ALTER TABLE `Mensagem` DISABLE KEYS */;
INSERT INTO `Mensagem` VALUES
(1,1,'2022-01-01 10:00:00',2,'Olá, pessoal! Bem-vindos ao nosso grupo de estudo!',NULL,NULL,NULL),
(2,2,'2022-01-01 10:01:00',2,'Oi, tudo bem?',NULL,NULL,NULL),
(3,3,'2022-01-01 10:02:00',2,'Tudo certo e com você?',NULL,NULL,NULL),
(4,3,'2022-01-01 10:03:00',2,'Estou bem também. Vamos começar a estudar?',NULL,NULL,NULL),
(5,1,'2022-01-01 10:04:00',2,'Claro! O que acham de começarmos com o exercício 3?',NULL,NULL,NULL),
(6,2,'2022-01-01 10:05:00',2,'Tudo bem!',NULL,NULL,NULL),
(7,3,'2022-01-01 10:06:00',2,'Também acho!',NULL,NULL,NULL),
(8,1,'2022-01-01 10:07:00',2,NULL,'/GRUPO_1/Exercicio3.png',NULL,NULL);
/*!40000 ALTER TABLE `Mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Senha` varchar(255) NOT NULL,
  `Salt` varchar(255) NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `ID_Instituicao` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Instituicao` (`ID_Instituicao`),
  CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`ID_Instituicao`) REFERENCES `Instituicao` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES
(1,'João Silva','joao.silva@ifsp.br','9a7e7f1d4c7849abc45e81f24a04fe32','salt123','12345678901',1),
(2,'Maria Santos','maria.santos@usp.br','76c0380ec3703dd1388b8f7a2cacc39e','salt456','23456789012',2),
(3,'Pedro Souza','pedro.souza@ufpe.br','a06d7e6319ffd18ba1ddc830489136ee','salt789','34567890123',3);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UsuarioEspecial`
--

DROP TABLE IF EXISTS `UsuarioEspecial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UsuarioEspecial` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) NOT NULL,
  `Tipo` enum('Assistente','Professor','Moderador') NOT NULL,
  `ID_GrupoModerado` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_GrupoModerado` (`ID_GrupoModerado`),
  CONSTRAINT `UsuarioEspecial_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario` (`ID`),
  CONSTRAINT `UsuarioEspecial_ibfk_2` FOREIGN KEY (`ID_GrupoModerado`) REFERENCES `Grupo` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UsuarioEspecial`
--

LOCK TABLES `UsuarioEspecial` WRITE;
/*!40000 ALTER TABLE `UsuarioEspecial` DISABLE KEYS */;
INSERT INTO `UsuarioEspecial` VALUES
(1,1,'Assistente',2),
(2,2,'Professor',2),
(3,3,'Moderador',1);
/*!40000 ALTER TABLE `UsuarioEspecial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UsuarioGrupo`
--

DROP TABLE IF EXISTS `UsuarioGrupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UsuarioGrupo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Usuario` int(11) NOT NULL,
  `ID_Grupo` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Usuario` (`ID_Usuario`),
  KEY `ID_Grupo` (`ID_Grupo`),
  CONSTRAINT `UsuarioGrupo_ibfk_1` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuario` (`ID`),
  CONSTRAINT `UsuarioGrupo_ibfk_2` FOREIGN KEY (`ID_Grupo`) REFERENCES `Grupo` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UsuarioGrupo`
--

LOCK TABLES `UsuarioGrupo` WRITE;
/*!40000 ALTER TABLE `UsuarioGrupo` DISABLE KEYS */;
INSERT INTO `UsuarioGrupo` VALUES
(1,1,2),
(2,2,2),
(3,3,3),
(4,1,4);
/*!40000 ALTER TABLE `UsuarioGrupo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-13 16:17:15

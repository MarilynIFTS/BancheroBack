CREATE DATABASE  IF NOT EXISTS `pizzeria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pizzeria`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: pizzeria
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `IDAdmin` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `Telefono` int DEFAULT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `FotoPerfil` varchar(50) DEFAULT NULL,
  `Notificaciones` tinyint DEFAULT NULL,
  PRIMARY KEY (`IDAdmin`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `IDAdmin_UNIQUE` (`IDAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'yyy','yyy@gmail.com',1233456778,'$2a$08$Ln5i93Nnp1ZW/M4skExIN.fUYai.F3Jcyk1dyJd0/3noXi2.O63hq','1736651785163.jpeg',1),(2,'Pep','pep@gmail.com',1233456778,'$2a$08$rqyUiok70TKyzrAOMvdXU.ZizBMMydxTuFKIuYvUbIgrOT4Udld8K','1736651845458.jpeg',1),(3,'pp','pp@gmail.com',1233456778,'$2a$08$K.xakkHeUfENxI8fJD/QL.izWT8zjHaQNz6ymPyyf9jYQYpst38qa','1736652824554.jpeg',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `IDCategoria` int NOT NULL AUTO_INCREMENT,
  `NombreCategoria` varchar(45) DEFAULT NULL,
  `ImagenIlustrativa` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`IDCategoria`),
  UNIQUE KEY `IDCategoria_UNIQUE` (`IDCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (2,'Postres','1737080941454.jpg'),(3,'Pizza','1737081124499.jpg'),(5,'Supremas','1737772035386.jpg'),(7,'Helado','1739487161045.jpg');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `IDImagen` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(45) DEFAULT NULL,
  `usuario` int DEFAULT NULL,
  `comentario` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`IDImagen`),
  UNIQUE KEY `IDImagen_UNIQUE` (`IDImagen`),
  KEY `fk_usuario` (`usuario`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario`) REFERENCES `user` (`IDUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (5,'1736392581981.jpg',32,'ha'),(6,'',NULL,NULL),(7,'',NULL,NULL),(9,'1737074542468.jpg',32,'irreal'),(10,'1737685688228.jpg',31,':0'),(11,'',NULL,NULL),(13,'1738550882719.jpg',31,'Mou'),(14,'1739486646427.jpg',31,'irreal');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `IDMensaje` int NOT NULL AUTO_INCREMENT,
  `Motivo` varchar(70) DEFAULT NULL,
  `Mensaje` varchar(200) DEFAULT NULL,
  `Usuario` int DEFAULT NULL,
  PRIMARY KEY (`IDMensaje`),
  UNIQUE KEY `IDMensaje_UNIQUE` (`IDMensaje`),
  KEY `fk_Usuuario` (`Usuario`),
  CONSTRAINT `fk_Usuuario` FOREIGN KEY (`Usuario`) REFERENCES `user` (`IDUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (2,NULL,NULL,NULL),(3,NULL,NULL,NULL),(4,NULL,NULL,NULL),(8,'Comida','Muy buena',31),(9,'Comida','Excellent',31),(10,'Comida','Pro plan',31),(11,'Comida','mmm',31),(12,'Comida','Pro plan',31),(13,'Comida','mmm',31),(14,'Comida','mmm',31),(15,'Comida','Muy buena',31);
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plato`
--

DROP TABLE IF EXISTS `plato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plato` (
  `IDPlato` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) DEFAULT NULL,
  `Precio` decimal(20,0) DEFAULT NULL,
  `Categoria` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`IDPlato`),
  UNIQUE KEY `IDPlato_UNIQUE` (`IDPlato`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plato`
--

LOCK TABLES `plato` WRITE;
/*!40000 ALTER TABLE `plato` DISABLE KEYS */;
INSERT INTO `plato` VALUES (8,'Panqueques',20000,'Postres'),(9,'Flan',20000,'Postres'),(10,'4 quesos',67000,'Pizza'),(11,'Muzzarella y jamon',400600,'Pizza');
/*!40000 ALTER TABLE `plato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `IDReserva` int NOT NULL AUTO_INCREMENT,
  `Sucursal` varchar(20) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `CantidadDePersonas` int DEFAULT NULL,
  `Telefono` int DEFAULT NULL,
  `Usuario` int DEFAULT NULL,
  PRIMARY KEY (`IDReserva`),
  UNIQUE KEY `IDReserva_UNIQUE` (`IDReserva`),
  KEY `fk_Uusuario` (`Usuario`),
  CONSTRAINT `fk_Uusuario` FOREIGN KEY (`Usuario`) REFERENCES `user` (`IDUser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `IDUser` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `Telefono` int DEFAULT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `FotoPerfil` varchar(50) DEFAULT NULL,
  `Notificaciones` tinyint DEFAULT NULL,
  PRIMARY KEY (`IDUser`),
  UNIQUE KEY `IDUser_UNIQUE` (`IDUser`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Pepita','pepita@gmail.com',123456789,'$2a$08$VygzIUWX288Js3m8VVTWSOOvVtSX8bpnR9KEBW6hsuffp2stbGm9G','1731877925969.jpg',NULL),(2,'Pepito','pepito@gmail.com',123456789,'$2a$08$McjKhlaOD3OUFIgIBkTJp.TbsV5bHKE9RZox5kqJS/5EVaOsRVtya','1731887962242.jpg',NULL),(4,'Pepi','pepi@gmail.com',123456789,'$2a$08$zGtQjNr0DFW7AFQr4WdlsOER9tUXOWCKtcFlpatw15Ti5ysnlGZ/e','1731985499294.jpg',1),(5,'Pepi2','pepi2@gmail.com',123456789,'$2a$08$zfytsD0u0i2u/6tO2N4n3.FAYpwtGwyjQF3dDfHsU2nEQuQC8tnn2','1731985622454.jpg',1),(9,'Pep','pep@gmail.com',1233456778,'$2a$08$eZNIC1jIn2ev9Umx8hlC6.B0Qz9T8/NDzBYFbXH1FlrtgRoShZJFC',NULL,1),(10,'Pep','pep11@gmail.com',1233456778,'$2a$08$/5niwBgRBWwdTCKZQgntX.oezpSeWRK1FIrgjTqsoP1r/gfTGkibC','1732846615653.jpg',1),(11,'Pepp','pepp@gmail.com',1233456778,'$2a$08$ORWZGGTPTYOIQUYTNHtekOhzgsIeaArMQ7Bc9a0TLKg4za3UWrale','1733014354921.jpg',1),(12,'Peppp','peppp@gmail.com',1123432,'$2a$08$yXu/C5D1.PkqQDi8W7aZhekj3wROEBLXh80P0iHhgnyWxDR4K3WE.','1733014501267.jpg',1),(13,'Peppi','pepp11@gmail.com',12345689,'$2a$08$OQRpd9yNoGO/fTM56Yq.SOfdDlYvgL9VqGvB5HjyZe49myBHgJCuS','1733014910619.jpg',1),(14,'Juani','juani@gmail.com',12345689,'$2a$08$S0//mRh6QboggdLPvuA1l.xejp/RCic6wQWUpVqc3Y38mg/GshBmS','1733015223416.jpg',1),(15,'Juanii','juanii@gmail.com',1233456778,'$2a$08$y3eKJ2u3NTD9HPauaEvZN.ExGs3QoO41nx2w.i.aOW5LOFjqRgH5S','1733015467575.jpg',1),(16,'juju','juju@gmail.com',12345689,'$2a$08$agTPVRmO2eh0jNgVXteUlO61tW4vrI.S1Tun.h466DnCShbEU9dsK','1733015806260.jpg',1),(17,'aa','aa@a.com',11232,'$2a$08$OPsN8TAxjWLwdskIjFay0OyKLuFCItV6lMuvM4aMQiWKkoh0h4T9q','1733021487471.jpg',1),(18,'Pepo','pepo@gmail.com',1123432,'$2a$08$5NZEtDpFnlyVY96ERbL1CO7Wk7b7Y7Xxy4wkBP2Y/GHKsIgSbkXDe','1733021778448.jpg',1),(19,'Pep0','pep0@gmail.com',12345689,'$2a$08$lnTw7J1oSem3CbZC5WeQ.uAHpIqX4Dqjpz/Xr6q9wsbK1YYT97TRi','1733021823653.jpg',1),(20,'Pepl','pepl@gmail.com',12345689,'$2a$08$0wQeBnAj/GmU6Rug4aw4YOaIKXqrj/52Cjvw7K.mBATfaO2vrcqii','1733022258863.jpg',1),(21,'Pepll','pepll@gmail.com',1123432,'$2a$08$2WX53wSiIqDooMp0FRPpQ.xdC7Q2ch2dCVGnSA78iLxPaxrFIU602','1733022324291.jpg',1),(22,'Pep9','pep9@gmail.com',12345689,'$2a$08$NOU9BK6gt/uBxVDugI0SUezl5IIw7gansNRGuCzlA080fzcqIbf4a','1733023592785.jpg',1),(23,'Pep99','pep99@gmail.com',12345689,'$2a$08$T/qf3tGj.68LxikP0AHCKehZ/r0wP9Cols5TfZBeqgeI5ggIvjcHG','1733023658782.jpg',1),(24,'Pep5','pep5@gmail.com',12345689,'$2a$08$TwbZNJDrLdulV9NcfzXZ2eIPKh8Vc0PKPZWWUoLnyaWlLQzYnJRa.','1733023848466.jpg',1),(25,'Pep7','pep7@gmail.com',12345689,'$2a$08$bBjD3TJHdniz4rqDYPEtmODYzehA1v1gXZSzBa9OqX7ehCDcv7B6u','1733023891399.jpg',1),(26,'u','u@gmail.com',1233456778,'$2a$08$b8PGtmdp4/iTHitgmX51e.jKF020IZyRM6eC893kzN5gnr3XIlzTu','1733071706181.jpg',1),(27,'uu','uu@gmail.com',12345689,'$2a$08$ki1EUZ4x8zqEg0qqQIXX0.INrpdsLP/tYLRphEmkt2qE.e4XoREP6','1733074829991.jpg',1),(28,'uuu','uuu@gmail.com',12345689,'$2a$08$lkIMTNsgVxmL9QtUqrLhWeybsEykkVLPT8xD7JNGQCkMN2doRvpPa','1733075084998.jpg',1),(29,'uuuu','uuuu@gmail.com',12345689,'$2a$08$k3FUj9UMfEhCCsKrA.1Eg.TyLxGvT81OIMLq0a4rI6jhkd09o1QJW','1733075408685.jpg',1),(30,'y','y@gmail.com',12345689,'$2a$08$d7AC4ybEguFZta8jkZU8wOZB8wuBxiKihrt5KnMbkSjpAfqkW0Zmi','1733075516424.jpeg',1),(31,'yy','yy@gmail.com',1233456778,'$2a$08$GDWwWuI7t55xGhgYG.nY1u3pQL3aaxD3oJU36DwArVWWtgp9vEDEG','1739719630272.jpg',1),(32,'yyy','yyy@gmail.com',12345689,'$2a$08$zdwiRn66/auorvQEgDt.ruDqZMdpUS5CfxlkLeNv7isBUnKu4LGvS','1733075703540.jpg',1),(33,'ppp','ppp@gmail.com',1233456778,'$2a$08$Vp5BfGLEYKTyvONCVmBODu3u7CRl46SJPLFY3N9EhxnT4btB.Y1lO','1736652948768.jpeg',1),(34,'K','k@gmail.com',1345678910,'$2a$08$FI.MTE5RDP.JbuNMAVeB4.zZPU2JfrETtKUb2mpptHBmZk5DDz..q','1738547503326.jpg',1),(35,'Juanjo','juanju1o@gmail.com',123123,'$2a$08$0rbnweTj3YJNXIuQQVcwE.HJFt5o36c/XFLyPHVc1A26Tio/kBsRq','1738714801733.jpg',1),(36,'Juanpqi','yy@gmail.com111',12345689,'$2a$08$XbqqWx1XPElK7O2XhVoi/OvE.tOqUTiYbnGxtTe3AT5AqoLtQtmvS','1738714919725.jpg',1),(37,'Marilyn','2059@ifts24.edu.ar',123,'$2a$08$/TGsHt7MbKcoUEn2CCC13.hKaiYPlGWSKO0KPDzSpHIuuddcYrajK','1738714940591.jpg',1),(38,'Pepbfdf','fsdfasds@gmail.com',123456789,'$2a$08$rmT1oGxujh7fqhWArN2SxOHbieQuNFddu.U5kv5R9Ll88jaCfgIzS','1739156317780.jpeg',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-16 23:10:04

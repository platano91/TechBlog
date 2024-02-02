-- MySQL dump 10.13  Distrib 8.2.0, for macos14.0 (arm64)
--
-- Host: localhost    Database: techblog_db
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES ('fnjlpvKVYm1GrQPnHruXnZGXVtksd9Yg','2024-01-31 20:42:22','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2024-01-30 20:42:22','2024-01-30 20:42:22'),('gkP1aPZuYrwWY97olI4NBKimUvGXrX6G','2024-01-31 21:31:14','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":8,\"username\":\"Obiwan@gmail.com\",\"loggedIn\":true}','2024-01-30 21:29:43','2024-01-30 21:31:14'),('kBlpqKvH_aHKYnTk-0hs_VVriPuT0QSy','2024-01-31 21:25:39','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2024-01-30 21:25:39','2024-01-30 21:25:39'),('n8IHM6OS1voxNLREIoj7gyLZTzj7Uzga','2024-01-31 20:43:48','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":12,\"username\":\"asdf\",\"loggedIn\":true}','2024-01-30 20:42:28','2024-01-30 20:43:48'),('ndnDnDnVKi62mglLQPtnzpwBmsiDJIQ9','2024-02-02 22:29:50','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":8,\"username\":\"Obiwan@gmail.com\",\"loggedIn\":true}','2024-02-01 22:29:33','2024-02-01 22:29:50'),('nlVq4PeDX7O0LGHZBsTjpK3Wwd4XrAio','2024-01-31 20:14:27','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":8,\"username\":\"Obiwan@gmail.com\",\"loggedIn\":true}','2024-01-26 02:15:26','2024-01-30 20:14:27');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'platano91',NULL,'$2b$10$v7Mcpt3T5UtIVZryuzJP9OYui/QASbJV/.TfGljWSsslGXDFUESHu','2024-01-26 04:33:02','2024-01-26 04:33:02'),(2,'platano91',NULL,'$2b$10$6ZOibLm8a8.D2GeXlvnBiuKE6EOwrrVjVRuJuztFMK88unmZoigeG','2024-01-26 18:33:17','2024-01-26 18:33:17'),(3,'platano91',NULL,'$2b$10$.1eOHGEtvXtRzE7B0FikiuLZZ5TFrQqfU7Ir/z4HMY2WeIWKtzBte','2024-01-26 18:40:01','2024-01-26 18:40:01'),(4,'platano91',NULL,'$2b$10$HjRvwOiapsz2jvM7k37tgO0Mu6IJSb0wL5kh89Rh4Qvk5MmYGzSGS','2024-01-26 18:41:57','2024-01-26 18:41:57'),(5,'platano91',NULL,'$2b$10$Te/ySxcOcOLa7WsUgr0Wm.jhCxKwltQrkfQyB2Mw6/yA95EFZWM7e','2024-01-26 18:43:44','2024-01-26 18:43:44'),(6,'platano91',NULL,'$2b$10$U4p2PJEPRI/rLVykSA4g8OTRvej3Fa.MJhnMP5iCXtSETdEVMoL7a','2024-01-26 18:44:36','2024-01-26 18:44:36'),(7,'platano91',NULL,'$2b$10$HABzvzE3EifCecTqX3xyi.JEarKlCfCtfRWtEwdhihC.tLj9imyRa','2024-01-26 19:06:39','2024-01-26 19:06:39'),(8,'Obiwan@gmail.com',NULL,'$2b$10$ufE5ZM3HubgFWaHGuxeTzOPn6eS8d4A3rL7GyqW4P77zvC6/VaLra','2024-01-26 19:07:42','2024-01-26 19:07:42'),(9,'salvadomo',NULL,'$2b$10$KBOdM4Ips6.18Dm8KejSeODvbdDMqrP.Czcvra8MbfWpVF/fTumbW','2024-01-26 20:14:57','2024-01-26 20:14:57'),(10,'Obiwan@gmail.com',NULL,'$2b$10$VgyP2ITcjl3DX0lHnZY2U.t9g9uXWssZvHUZLUVh11PSd3EP6Dh1y','2024-01-26 20:49:39','2024-01-26 20:49:39'),(11,'Obiwan@gmail.com',NULL,'$2b$10$6HyzarHSNn2gOlkohjAxoOB.fJahsFo3dHLPnfTgm.cVnLsCRdw3C','2024-01-26 20:49:54','2024-01-26 20:49:54'),(12,'asdf',NULL,'$2b$10$ks2tkOYw1qTduiEdojBYCuvjeYMp.nShzcLetrJTPwuly51ZoRBLC','2024-01-30 20:43:22','2024-01-30 20:43:22');
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

-- Dump completed on 2024-02-01 15:56:19

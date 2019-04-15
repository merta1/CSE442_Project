-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: debateapp
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Comment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `DebateID` int(11) NOT NULL,
  `CommentDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Comment` varchar(500) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Side` varchar(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
INSERT INTO `Comment` VALUES (1,2,'2019-04-10 00:06:55','test',26,'A'),(2,2,'2019-04-10 00:06:55','testing',26,'B'),(3,2,'2019-04-10 03:17:35','test',26,'A'),(4,2,'2019-04-10 03:28:09','tt',26,'B'),(5,2,'2019-04-10 03:28:15','bob',26,'A'),(6,2,'2019-04-10 03:29:09','yo',26,'B'),(7,2,'2019-04-10 03:29:16','yo',26,'B'),(8,2,'2019-04-10 03:29:30','yo',26,'B'),(9,2,'2019-04-10 03:33:18','it works!',26,'A'),(10,2,'2019-04-10 03:54:15','hi kat.',26,'A'),(11,2,'2019-04-10 03:55:29','babe',26,'A'),(12,2,'2019-04-10 22:57:45','test',26,'B');
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Debates`
--

DROP TABLE IF EXISTS `Debates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Debates` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `OwnerID` int(11) NOT NULL,
  `Open` int(11) NOT NULL,
  `Public` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `SideATitle` varchar(100) NOT NULL,
  `SideBTitle` varchar(100) NOT NULL,
  `Summary` varchar(500) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Debates`
--

LOCK TABLES `Debates` WRITE;
/*!40000 ALTER TABLE `Debates` DISABLE KEYS */;
INSERT INTO `Debates` VALUES (2,26,1,1,'A Test Debate by David','Agree','Disagree','Doesn\'t matter'),(3,26,1,1,'Another Debate','Yes','No','nope'),(4,26,1,1,'Some great debate','Positive','Negative','dunno');
/*!40000 ALTER TABLE `Debates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserOpinion`
--

DROP TABLE IF EXISTS `UserOpinion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `UserOpinion` (
  `Id` int(11) NOT NULL,
  `DebateID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Side` varchar(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserOpinion`
--

LOCK TABLES `UserOpinion` WRITE;
/*!40000 ALTER TABLE `UserOpinion` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserOpinion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `UserName` varchar(64) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `EncryptedPassword` varchar(64) NOT NULL,
  `UserLevel` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (26,'David','Adkins','david','david@davidadkins.com','5f7b9d9177179253986ebd3cd9513a8455fe950fde00b21ba105b546de0a8a30',0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-15 11:31:53

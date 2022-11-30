-- MySQL dump 10.14  Distrib 5.5.68-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: 1_IPP
-- ------------------------------------------------------
-- Server version	5.5.68-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `C_MAJOR`
--

DROP TABLE IF EXISTS `C_MAJOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `C_MAJOR` (
  `c_mcode` char(3) NOT NULL,
  `c_mname` varchar(20) DEFAULT NULL,
  `c_mcon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`c_mcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_MAJOR`
--

LOCK TABLES `C_MAJOR` WRITE;
/*!40000 ALTER TABLE `C_MAJOR` DISABLE KEYS */;
INSERT INTO `C_MAJOR` VALUES ('202','관현악','242a7fa051b90ff857af55701c397752:53a407c4b0329ba817c02a8b4f226281');
/*!40000 ALTER TABLE `C_MAJOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `C_REGISTER`
--

DROP TABLE IF EXISTS `C_REGISTER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `C_REGISTER` (
  `c_rnum` char(10) NOT NULL,
  `c_snum` varchar(100) DEFAULT NULL,
  `C_SCODE` char(10) DEFAULT NULL,
  `c_rday` char(5) DEFAULT NULL,
  `c_period` int(11) DEFAULT NULL,
  `c_lecnum` char(4) DEFAULT NULL,
  `c_prof` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`c_rnum`),
  KEY `FK_csnum` (`c_snum`),
  KEY `FK_cscode` (`C_SCODE`),
  CONSTRAINT `FK_cscode` FOREIGN KEY (`c_scode`) REFERENCES `C_SUBJECT` (`c_scode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_csnum` FOREIGN KEY (`c_snum`) REFERENCES `C_STUDENT` (`c_snum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_REGISTER`
--

LOCK TABLES `C_REGISTER` WRITE;
/*!40000 ALTER TABLE `C_REGISTER` DISABLE KEYS */;
INSERT INTO `C_REGISTER` VALUES ('1234567890','6229d5bdb2313ceb032aa8a81b147b98:f36e9a8f58884491d29509eadc2bc837','0000000001','WE',3,'125','6229d5bdb2313ceb032aa8a81b147b98:5bc0900d0770fb8b812f6e66a45ed182'),('1929475802','6229d5bdb2313ceb032aa8a81b147b98:f36e9a8f58884491d29509eadc2bc837','0000000003','TU',2,'325','6229d5bdb2313ceb032aa8a81b147b98:9c512560191f12ad27e547e8419adbf3'),('3281914678','6229d5bdb2313ceb032aa8a81b147b98:f36e9a8f58884491d29509eadc2bc837','0000000002','MO',1,'225','6229d5bdb2313ceb032aa8a81b147b98:14c5e0becc240afd0e5d23e201441478'),('4829105826','6229d5bdb2313ceb032aa8a81b147b98:f36e9a8f58884491d29509eadc2bc837','0000000004','TH',4,'425','6229d5bdb2313ceb032aa8a81b147b98:b4bedb2d68637f0bd78847e45e6305ef');
/*!40000 ALTER TABLE `C_REGISTER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `C_STUDENT`
--

DROP TABLE IF EXISTS `C_STUDENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `C_STUDENT` (
  `c_snum` varchar(100) NOT NULL DEFAULT '',
  `c_name` varchar(100) DEFAULT NULL,
  `c_regnum` varchar(100) DEFAULT NULL,
  `c_pnum` varchar(100) DEFAULT NULL,
  `c_adr` varchar(100) DEFAULT NULL,
  `c_scode` char(3) DEFAULT NULL,
  PRIMARY KEY (`c_snum`),
  KEY `fk_cstudent_cscode_cmajor_cscode` (`c_scode`),
  CONSTRAINT `fk_cstudent_cscode_cmajor_cscode` FOREIGN KEY (`c_scode`) REFERENCES `C_MAJOR` (`c_mcode`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_STUDENT`
--

LOCK TABLES `C_STUDENT` WRITE;
/*!40000 ALTER TABLE `C_STUDENT` DISABLE KEYS */;
INSERT INTO `C_STUDENT` VALUES ('6229d5bdb2313ceb032aa8a81b147b98:f36e9a8f58884491d29509eadc2bc837','6229d5bdb2313ceb032aa8a81b147b98:4558ee9a5a7b90b7a6ec939a522e9307','6229d5bdb2313ceb032aa8a81b147b98:5bd9d52fc4b694b80fce8ff7104dd85f','6229d5bdb2313ceb032aa8a81b147b98:f7427f285710c79d29c7dcb7811759a0','6229d5bdb2313ceb032aa8a81b147b98:461fd0e3c2be0be2531b35744760d44fde528e98a3f216469803dc3e93ed4bb8','202');
/*!40000 ALTER TABLE `C_STUDENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `C_SUBJECT`
--

DROP TABLE IF EXISTS `C_SUBJECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `C_SUBJECT` (
  `c_scode` varchar(10) NOT NULL DEFAULT '',
  `c_sname` varchar(40) DEFAULT NULL,
  `c_grade` int(11) DEFAULT NULL,
  PRIMARY KEY (`c_scode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_SUBJECT`
--

LOCK TABLES `C_SUBJECT` WRITE;
/*!40000 ALTER TABLE `C_SUBJECT` DISABLE KEYS */;
INSERT INTO `C_SUBJECT` VALUES ('0000000001','C언어',3),('0000000002','컴퓨터개론',3),('0000000003','사물인터넷',3),('0000000004','인공지능',3);
/*!40000 ALTER TABLE `C_SUBJECT` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-06 10:12:04
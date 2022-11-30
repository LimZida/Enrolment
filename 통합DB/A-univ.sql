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
-- Table structure for table `A_LECROOM`
--

DROP TABLE IF EXISTS `A_LECROOM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `A_LECROOM` (
  `a_leccode` char(4) NOT NULL,
  `a_location` varchar(20) NOT NULL,
  `a_lecnum` char(13) DEFAULT NULL,
  PRIMARY KEY (`a_leccode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `A_LECROOM`
--

LOCK TABLES `A_LECROOM` WRITE;
/*!40000 ALTER TABLE `A_LECROOM` DISABLE KEYS */;
INSERT INTO `A_LECROOM` VALUES ('M120','IT대','120호'),('M121','IT대','121호');
/*!40000 ALTER TABLE `A_LECROOM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `A_MAJOR`
--

DROP TABLE IF EXISTS `A_MAJOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `A_MAJOR` (
  `a_mcode` char(3) NOT NULL,
  `a_name` varchar(20) NOT NULL,
  `a_mcon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`a_mcode`),
  KEY `FK_APROF_APNUM_AMAJOR_AMCON` (`a_mcon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `A_MAJOR`
--

LOCK TABLES `A_MAJOR` WRITE;
/*!40000 ALTER TABLE `A_MAJOR` DISABLE KEYS */;
INSERT INTO `A_MAJOR` VALUES ('001','컴공학','3fcc68c5f67122ea5aa07749f20c5a38:50b7dbfbcbb9b6ffbeda34eba182e6bf'),('101','행정학','3fcc68c5f67122ea5aa07749f20c5a38:490d0dafac7f8af0348d2af3589bc8b0');
/*!40000 ALTER TABLE `A_MAJOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `A_PROF`
--

DROP TABLE IF EXISTS `A_PROF`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `A_PROF` (
  `a_pnum` char(5) NOT NULL,
  `a_pnema` varchar(100) DEFAULT NULL,
  `a_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`a_pnum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `A_PROF`
--

LOCK TABLES `A_PROF` WRITE;
/*!40000 ALTER TABLE `A_PROF` DISABLE KEYS */;
INSERT INTO `A_PROF` VALUES ('11111','3fcc68c5f67122ea5aa07749f20c5a38:50b7dbfbcbb9b6ffbeda34eba182e6bf','3fcc68c5f67122ea5aa07749f20c5a38:ac3638acab58a5ea5fd3a761c373b364fc19d9ec50d134029df4d67dfa1db186'),('22222','3fcc68c5f67122ea5aa07749f20c5a38:4ff0b555913d7750911736932bdde936','3fcc68c5f67122ea5aa07749f20c5a38:b7311062f8b24f7cc822b059dbf6b7dba51b018d8068cb1fd592b428c8f9deaa');
/*!40000 ALTER TABLE `A_PROF` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `A_REGISTER`
--

DROP TABLE IF EXISTS `A_REGISTER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `A_REGISTER` (
  `a_rnum` char(10) NOT NULL,
  `a_snum` varchar(100) DEFAULT NULL,
  `a_rcode` char(7) NOT NULL,
  `a_rday` varchar(2) DEFAULT NULL,
  `a_period` int(11) DEFAULT NULL,
  `a_grade` int(11) DEFAULT NULL,
  `a_room` char(4) DEFAULT NULL,
  PRIMARY KEY (`a_rnum`),
  KEY `FK_ASTUDENT_ASNUM_AREGISTER_ASNUM` (`a_snum`),
  KEY `FK_ASUBJECT_ASCODE_AREGISTER_ARCODE` (`a_rcode`),
  KEY `FK_ALECROOM_ALECCODE_AREGISTER_AROOM` (`a_room`),
  CONSTRAINT `FK_ALECROOM_ALECCODE_AREGISTER_AROOM` FOREIGN KEY (`a_room`) REFERENCES `A_LECROOM` (`a_leccode`) ON UPDATE CASCADE,
  CONSTRAINT `FK_ASTUDENT_ASNUM_AREGISTER_ASNUM` FOREIGN KEY (`a_snum`) REFERENCES `A_STUDENT` (`a_snum`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ASUBJECT_ASCODE_AREGISTER_ARCODE` FOREIGN KEY (`a_rcode`) REFERENCES `A_SUBJECT` (`a_scode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `A_REGISTER`
--

LOCK TABLES `A_REGISTER` WRITE;
/*!40000 ALTER TABLE `A_REGISTER` DISABLE KEYS */;
INSERT INTO `A_REGISTER` VALUES ('1234567890','3fcc68c5f67122ea5aa07749f20c5a38:61d3168ab840a3db1276de4381e58d2c','0010001','MO',3,100,'M120'),('4859208493','3fcc68c5f67122ea5aa07749f20c5a38:61d3168ab840a3db1276de4381e58d2c','0010002','TU',1,100,'M121');
/*!40000 ALTER TABLE `A_REGISTER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `A_STUDENT`
--

DROP TABLE IF EXISTS `A_STUDENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `A_STUDENT` (
  `a_snum` varchar(100) NOT NULL DEFAULT '',
  `a_name` varchar(100) DEFAULT NULL,
  `a_regnum` varchar(100) DEFAULT NULL,
  `a_pnum` varchar(100) DEFAULT NULL,
  `a_adr` varchar(100) DEFAULT NULL,
  `a_scode` char(3) NOT NULL,
  PRIMARY KEY (`a_snum`),
  KEY `FK_AMAJOR_AMCODE_ASTUDENT_ASCODE` (`a_scode`),
  CONSTRAINT `FK_AMAJOR_AMCODE_ASTUDENT_ASCODE` FOREIGN KEY (`a_scode`) REFERENCES `A_MAJOR` (`a_mcode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `A_STUDENT`
--

LOCK TABLES `A_STUDENT` WRITE;
/*!40000 ALTER TABLE `A_STUDENT` DISABLE KEYS */;
INSERT INTO `A_STUDENT` VALUES ('3fcc68c5f67122ea5aa07749f20c5a38:61d3168ab840a3db1276de4381e58d2c','ad5aa1ea46e858e76a966c2dd0a92a1d:f8f57def3aef4881df15042922bb2876','3fcc68c5f67122ea5aa07749f20c5a38:0523b291265935954a98a6674297563d','3fcc68c5f67122ea5aa07749f20c5a38:076947c963aee37a8ae19f60fcb07f1d','3fcc68c5f67122ea5aa07749f20c5a38:963f303258ad8533c47cb3dd5660d73e58f6d3b2983a3d0ea2aaff61339d596d','001');
/*!40000 ALTER TABLE `A_STUDENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `A_SUBJECT`
--

DROP TABLE IF EXISTS `A_SUBJECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `A_SUBJECT` (
  `a_scode` char(7) NOT NULL,
  `a_sname` varchar(40) NOT NULL,
  `a_grade` int(11) DEFAULT NULL,
  `a_pcode` char(5) DEFAULT NULL,
  PRIMARY KEY (`a_scode`),
  KEY `FK_APROF_APNUM_ASUBJECT_APCODE` (`a_pcode`),
  CONSTRAINT `FK_APROF_APNUM_ASUBJECT_APCODE` FOREIGN KEY (`a_pcode`) REFERENCES `A_PROF` (`a_pnum`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `A_SUBJECT`
--

LOCK TABLES `A_SUBJECT` WRITE;
/*!40000 ALTER TABLE `A_SUBJECT` DISABLE KEYS */;
INSERT INTO `A_SUBJECT` VALUES ('0010001','C언어',3,'11111'),('0010002','컴퓨터개론',3,'22222');
/*!40000 ALTER TABLE `A_SUBJECT` ENABLE KEYS */;
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


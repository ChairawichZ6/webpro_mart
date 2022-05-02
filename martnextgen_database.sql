-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: final_webpro
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `customer_order`
--

DROP TABLE IF EXISTS `customer_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_order` (
  `order_id` int NOT NULL,
  `total_price` float(8,2) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_order`
--

LOCK TABLES `customer_order` WRITE;
/*!40000 ALTER TABLE `customer_order` DISABLE KEYS */;
INSERT INTO `customer_order` VALUES (1,5000.00,'2021-01-12','Bang Rakam, Bang Rakam District, Phitsanulok 65140',1),(2,15000.00,'2021-03-12','Tha Chanuan, Kong Krailat District, Sukhothai 64170',2),(3,12000.00,'2021-03-22','Wat Sommanus, Pomprap, Bangkoki 10100',3),(4,12250.00,'2021-03-22','Wangthonglang, Wangthonglang, Bangkoki 10310',5),(5,12000.00,'2021-03-25','215 Therdthai, Thonburi, Bangkok 10600',4),(6,9000.00,'2021-04-13','Tha Chanuan, Kong Krailat District, Sukhothai 64170',2),(7,13500.00,'2021-04-15','Anusawari, Bang Khen, Bangkok 10220',6),(8,9000.00,'2021-04-21','Anusawari, Bang Khen, Bangkok 10220',6);
/*!40000 ALTER TABLE `customer_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `item_no` int DEFAULT NULL,
  `item_quantity` int DEFAULT NULL,
  `item_price` double DEFAULT NULL,
  `item_total` double DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `product_code` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,20,250,5000,1,1),(2,30,500,15000,2,2),(3,20,600,12000,3,3),(4,35,350,12250,4,4),(5,15,800,12000,5,5),(6,45,200,9000,6,6),(7,50,150,7500,7,7),(8,10,600,6000,7,8),(9,10,660,6600,8,10),(10,2,1200,2400,8,9);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_record`
--

DROP TABLE IF EXISTS `order_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_record` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `product_code` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `delivery_address` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_record_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_record`
--

LOCK TABLES `order_record` WRITE;
/*!40000 ALTER TABLE `order_record` DISABLE KEYS */;
INSERT INTO `order_record` VALUES (1,1,'2021-04-15','Anusawari, Bang Khen, Bangkok 10220',1);
/*!40000 ALTER TABLE `order_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_code` int DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `product_name` text,
  `des_product` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,250,'sausage isan','ไส้กรอกอีสานนำเข้าจากอีสานแท้'),(2,500,'melon soda','เครื่องดิ่มเมลอนโซดานำเข้าจากญี่ปุ่น'),(3,600,'california pistachio','ถั่วพิสตาชิโออบปรุงรส'),(4,350,'coke','เพลิดเพลินไปกับรสชาติของเครื่องดื่มโค้กที่สดชื่น'),(5,800,'cheese and cod fish','ปลาเส้นสอดไส้ชีส สินค้านำเข้าจากประเทศญี่ปุ่น'),(6,200,'calbee ebisen original','ข้าวเกรียบกุ้งรสดั้งเดิมที่ทุกคนคุ้นเคย'),(7,150,'sorbet lemon','ไอศกรีมเคลือบมนต์จากฮอควอร์ต รส มะนาว'),(8,600,'football NIKE ','ลูกฟุตบอล ลาย ไนกี้ ส่งตรงจากประเทศจีน'),(9,1200,'deathnote lecture','สมุดจดแห่งความตาย จาก อนิเมะชื่อดัง'),(10,660,'anabell doll','ตุ๊กตายางแอนาเบลนำเข้าจากอังกฤษ');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,1,'@HvkYP-wv5Gh6vUnsHlFsDyu0STFB91Sp9TxlxrQG1yyIXPuIs!gdnql^wZBET@H2JnKFHl2K!aog@*CToRt!DF@IXUlpyNNCgz#');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `use_member_point`
--

DROP TABLE IF EXISTS `use_member_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `use_member_point` (
  `membership_id` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  `total_buy` double DEFAULT NULL,
  `point` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `use_member_point`
--

LOCK TABLES `use_member_point` WRITE;
/*!40000 ALTER TABLE `use_member_point` DISABLE KEYS */;
INSERT INTO `use_member_point` VALUES (1,1,5000,500,1),(2,3,24000,2400,2),(3,2,12000,1200,3),(4,2,12000,1200,4),(5,2,12250,1225,5),(6,3,22500,2250,6);
/*!40000 ALTER TABLE `use_member_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `type` enum('customer','admin') NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','hsgrzB17','admin@webpro.com','Admin','Webpro',NULL,NULL,NULL,NULL,'admin'),(2,'tarnza007','bDry3sQ7','jutamasza7@hotmail.com','Jutamas','Chanathitikul','2001-09-04',20,'ปากช่อง โคราช นครราชสีมา 30130','0962415625','customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-02 10:15:38

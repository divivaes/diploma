# ************************************************************
# Sequel Pro SQL dump
# Версия 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Адрес: localhost (MySQL 5.7.21)
# Схема: insurance_client
# Время создания: 2018-05-13 07:42:33 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Дамп таблицы ic_accident_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_accident_order`;

CREATE TABLE `ic_accident_order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `insurance_money` int(10) DEFAULT NULL,
  `insurance_territory` int(11) DEFAULT NULL,
  `insurance_term` int(10) DEFAULT NULL,
  `client_city` varchar(45) DEFAULT NULL,
  `client_fullname` varchar(255) DEFAULT NULL,
  `client_phone` varchar(45) DEFAULT NULL,
  `client_email` varchar(90) DEFAULT NULL,
  `client_address` varchar(255) DEFAULT NULL,
  `client_iin` varchar(45) DEFAULT NULL,
  `payment_type` varchar(45) DEFAULT NULL,
  `insurance_price` varchar(45) DEFAULT NULL,
  `insurance_type` int(10) DEFAULT NULL,
  `served_mid` int(10) DEFAULT NULL,
  `status` int(10) DEFAULT NULL,
  `created_at` varchar(100) DEFAULT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_accident_order` WRITE;
/*!40000 ALTER TABLE `ic_accident_order` DISABLE KEYS */;

INSERT INTO `ic_accident_order` (`id`, `insurance_money`, `insurance_territory`, `insurance_term`, `client_city`, `client_fullname`, `client_phone`, `client_email`, `client_address`, `client_iin`, `payment_type`, `insurance_price`, `insurance_type`, `served_mid`, `status`, `created_at`, `updated_at`)
VALUES
	(1,300000,1,1,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','Hello World',NULL,'Наличными','11550',5,2,0,'17:19:18 2018-5-12','17:19:18 2018-5-12'),
	(2,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','123123123','930401301903','Платежная карта','2450',5,2,0,'17:27:21 2018-5-12','17:27:21 2018-5-12'),
	(3,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','123123123','930401301903','Платежная карта','2450',5,2,0,'17:27:44 2018-5-12','17:27:44 2018-5-12'),
	(4,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','123123123','930401301903','Платежная карта','2450',5,2,0,'17:28:10 2018-5-12','17:28:10 2018-5-12'),
	(5,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','123123123','930401301903','Платежная карта','2450',5,2,0,'17:46:25 2018-5-12','17:46:25 2018-5-12'),
	(6,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','123123123','930401301903','Платежная карта','2450',5,2,0,'17:46:45 2018-5-12','17:46:45 2018-5-12'),
	(7,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','123123123','930401301903','Платежная карта','2450',5,2,0,'17:47:09 2018-5-12','17:47:09 2018-5-12'),
	(8,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','Kanaaa','930401301903','Платежная карта','2450',5,2,0,'17:51:13 2018-5-12','17:51:13 2018-5-12'),
	(9,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','Kanaaa','930401301903','Платежная карта','2450',5,2,0,'17:58:40 2018-5-12','17:58:40 2018-5-12'),
	(10,100000,0,0,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','Kanaaa','930401301903','Платежная карта','2450',5,2,0,'18:02:17 2018-5-12','18:02:17 2018-5-12'),
	(11,300000,1,1,'Алматы','Ержан Рашев','+7 (701) 123-45-67','razhevkz@mail.ru','г.Алматы, ул. Манаса 34А','881212405603','Наличными','11550',5,2,0,'02:56:19 2018-5-13','02:56:19 2018-5-13');

/*!40000 ALTER TABLE `ic_accident_order` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_announcements
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_announcements`;

CREATE TABLE `ic_announcements` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `body` longtext,
  `tag` varchar(45) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `created_at` varchar(100) DEFAULT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_announcements` WRITE;
/*!40000 ALTER TABLE `ic_announcements` DISABLE KEYS */;

INSERT INTO `ic_announcements` (`id`, `title`, `body`, `tag`, `manager_id`, `created_at`, `updated_at`)
VALUES
	(1,'Начинается конкурс на лучшего работника месяца','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','Новость',1,'2018-04-12 10:04:52','2018-04-12 10:04:52'),
	(3,'Достигаем вершин','Как говорится :  \r\n -  \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"','Новость',1,'03:11:36 2018-5-13','03:11:36 2018-5-13');

/*!40000 ALTER TABLE `ic_announcements` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_clients`;

CREATE TABLE `ic_clients` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `client_fullname` varchar(100) DEFAULT NULL,
  `client_address` varchar(150) DEFAULT NULL,
  `client_city` varchar(100) DEFAULT NULL,
  `client_phone` varchar(45) DEFAULT NULL,
  `client_email` varchar(100) DEFAULT NULL,
  `insurance_type` int(10) DEFAULT NULL,
  `created_at` varchar(100) DEFAULT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_clients` WRITE;
/*!40000 ALTER TABLE `ic_clients` DISABLE KEYS */;

INSERT INTO `ic_clients` (`id`, `client_fullname`, `client_address`, `client_city`, `client_phone`, `client_email`, `insurance_type`, `created_at`, `updated_at`)
VALUES
	(1,'Emilia Lantuff','38116 Westerfield Center','Şanā’','187-534-7954','elantuff0@cafepress.com',1,'5/25/2017','8/25/2017'),
	(2,'Ezri Ainscow','155 Homewood Drive','Kabīrwāla','974-514-3056','eainscow1@adobe.com',2,'8/13/2017','3/14/2018'),
	(3,'Dione Hawse','01 Westport Trail','Libertador General San Martín','288-791-4034','dhawse2@skype.com',4,'5/3/2017','3/23/2018'),
	(4,'Lynelle Augustus','41739 Miller Lane','Jadowniki Mokre','533-378-1907','laugustus3@cnet.com',4,'2/5/2018','3/29/2018'),
	(5,'Tuckie Lowbridge','8 Vernon Crossing','Belawang','733-486-2669','tlowbridge4@issuu.com',5,'2/13/2018','10/2/2017'),
	(6,'Benedicto Rayson','2739 Banding Street','Tuba','747-164-2635','brayson5@mtv.com',6,'12/12/2017','12/18/2017'),
	(7,'Haily Gilmartin','285 Maywood Way','Kalodzishchy','244-669-4641','hgilmartin6@slate.com',7,'4/8/2018','10/23/2017'),
	(8,'Weidar Van Dale','2 Shoshone Point','Bataiporã','136-366-1706','wvan7@feedburner.com',8,'4/18/2018','3/23/2018'),
	(9,'Renae Sadat','9148 Charing Cross Junction','Uitenhage','724-824-7591','rsadat8@rakuten.co.jp',9,'3/23/2018','10/1/2017'),
	(10,'Juliana Dimmick','91 Lakewood Junction','Qizili','398-418-6869','jdimmick9@free.fr',10,'9/30/2017','10/2/2017'),
	(11,'Nicole Smardon','9824 Westridge Street','Kubachi','254-820-2869','nsmardona@cdbaby.com',11,'7/26/2017','4/19/2018'),
	(12,'Kennith Jacmard','5 Veith Hill','Mpraeso','782-749-2410','kjacmardb@senate.gov',12,'5/5/2017','2/2/2018'),
	(13,'Ayn Duck','60548 Iowa Place','Sandefjord','756-237-6016','aduckc@reddit.com',13,'8/30/2017','1/13/2018'),
	(14,'Rozanna Jevons','6 Carey Trail','Urcos','346-214-8406','rjevonsd@smh.com.au',14,'5/21/2017','7/21/2017'),
	(15,'Aloysia Shearn','33 Springview Parkway','Turar Ryskulov','380-941-8606','ashearne@amazonaws.com',15,'2/15/2018','7/15/2017'),
	(16,'Dulcia Uc','35 Ryan Alley','Arauco','696-166-7183','ducf@shop-pro.jp',16,'3/13/2018','8/14/2017'),
	(17,'Rowan Selby','3 Holy Cross Lane','Salerno','909-964-5004','rselbyg@cbslocal.com',17,'2/13/2018','6/25/2017'),
	(18,'Sayer Stiven','38 Dottie Plaza','Hali','950-421-1451','sstivenh@blog.com',18,'5/2/2017','2/10/2018'),
	(19,'Babbette Peete','88474 Manley Terrace','Abraham’s Bay','323-939-5181','bpeetei@upenn.edu',19,'9/4/2017','6/20/2017'),
	(20,'Hermann Reedshaw','1 4th Drive','Kaolinovo','541-244-0826','hreedshawj@goo.gl',20,'2/7/2018','7/12/2017'),
	(21,'Maurita Lowy','3 Sachtjen Court','Santiago del Estero','456-409-8797','mlowyk@netscape.com',21,'4/14/2018','4/5/2018'),
	(22,'Shandie Savil','46 Summerview Pass','Rosmalen','463-657-5613','ssavill@wikipedia.org',22,'2/7/2018','6/23/2017'),
	(23,'Benita Heinzel','286 Tennyson Alley','Tintafor','833-251-2463','bheinzelm@skype.com',23,'5/6/2017','12/31/2017'),
	(24,'Helaina Binder','21 Glendale Court','Minglanilla','948-190-7359','hbindern@boston.com',24,'10/30/2017','6/30/2017'),
	(25,'Ivar Nowakowska','16 Lunder Place','Surkh Bilandī','143-933-8029','inowakowskao@vistaprint.com',25,'5/12/2017','11/30/2017'),
	(26,'Elnore Guise','6157 Mesta Lane','Batan','594-534-9637','eguisep@barnesandnoble.com',26,'4/6/2018','6/19/2017'),
	(27,'Cly Giacopetti','356 Carey Park','Gierłoż','157-887-6293','cgiacopettiq@marketwatch.com',27,'7/29/2017','12/13/2017'),
	(28,'Hilliard Warbey','626 Dexter Road','Karangtawar','423-489-3331','hwarbeyr@kickstarter.com',28,'4/16/2018','10/13/2017'),
	(29,'Hadria Stabbins','18 Maryland Terrace','Presidencia Roque Sáenz Peña','642-246-1978','hstabbinss@canalblog.com',29,'9/22/2017','2/25/2018'),
	(30,'Preston De Caville','32 Arizona Trail','Novouzensk','873-286-9989','pdet@chronoengine.com',30,'10/26/2017','7/26/2017'),
	(31,'Min Piel','7 Jay Crossing','Colombo','981-633-0915','mpielu@buzzfeed.com',31,'2/12/2018','8/5/2017'),
	(32,'Obidiah McIlroy','312 Onsgard Junction','Itatiba','611-889-2318','omcilroyv@oracle.com',32,'9/21/2017','1/11/2018'),
	(33,'Eldridge Dincey','76 Manufacturers Crossing','Göteborg','915-853-6746','edinceyw@wikipedia.org',33,'11/17/2017','5/7/2017'),
	(34,'Jocelyne Bride','901 Arkansas Junction','Zelenograd','600-156-2158','jbridex@mapquest.com',34,'10/26/2017','5/23/2017'),
	(35,'Gray Kiwitz','75 Ronald Regan Drive','Vallentuna','357-587-9707','gkiwitzy@webs.com',35,'5/4/2017','9/18/2017'),
	(36,'Zelig Sarsfield','1563 Rieder Center','Ubrub','160-442-8324','zsarsfieldz@flavors.me',36,'6/15/2017','7/20/2017'),
	(37,'Lemuel Meindl','74527 Acker Trail','Chartres','558-321-6511','lmeindl10@sfgate.com',37,'8/12/2017','7/11/2017'),
	(38,'Fransisco De Stoop','02 Lake View Court','Tsagaanchuluut','637-633-6326','fde11@nsw.gov.au',38,'2/18/2018','5/13/2017'),
	(39,'Hayward O\'Reilly','97047 Norway Maple Drive','Vale Flores','887-627-7221','horeilly12@xrea.com',39,'2/20/2018','12/29/2017'),
	(40,'Way Hurt','21644 Maple Wood Court','Skien','101-424-8759','whurt13@telegraph.co.uk',40,'7/28/2017','12/30/2017'),
	(41,'Cassie Reddish','6850 Lighthouse Bay Park','Magdalena','677-770-4757','creddish14@jiathis.com',41,'5/28/2017','10/17/2017'),
	(42,'Shalom Noore','982 Dorton Court','Dongxiao','557-100-4897','snoore15@ow.ly',42,'7/28/2017','5/25/2017'),
	(43,'Cybill Cundy','264 Marquette Road','Espinosa','269-806-9204','ccundy16@who.int',43,'7/11/2017','5/1/2017'),
	(44,'Teirtza Powers','541 Basil Circle','Xiaoruo','790-180-4384','tpowers17@amazonaws.com',44,'10/11/2017','2/25/2018'),
	(45,'Kakalina Tedstone','079 Blackbird Drive','Gagah','237-875-7507','ktedstone18@indiegogo.com',45,'10/24/2017','8/29/2017'),
	(46,'Cherilyn Coggill','6 Towne Terrace','Aveleda','681-492-8622','ccoggill19@sina.com.cn',46,'9/18/2017','5/5/2017'),
	(47,'Adda Daintrey','055 Nelson Drive','Trindade','930-877-9733','adaintrey1a@dedecms.com',47,'8/4/2017','5/11/2017'),
	(48,'Shane Griffe','56586 Raven Point','Ichuña','893-151-3928','sgriffe1b@spotify.com',48,'9/11/2017','7/7/2017'),
	(49,'Fran Pritchard','69984 Straubel Drive','Eiriz','873-240-9260','fpritchard1c@fc2.com',49,'8/30/2017','11/5/2017'),
	(50,'Tessy Blazejewski','1851 Sommers Way','Gelap','808-876-4631','tblazejewski1d@addtoany.com',50,'5/6/2017','3/30/2018'),
	(51,'Gerladina Simek','74 Thompson Court','Bil‘īn','324-615-3028','gsimek1e@bluehost.com',51,'9/23/2017','4/5/2018'),
	(52,'Addi Stephens','58 Orin Hill','Kambove','533-702-1484','astephens1f@ucoz.com',52,'8/10/2017','8/18/2017'),
	(53,'Otha Pemberton','787 Maywood Crossing','Mantalongon','641-238-6334','opemberton1g@google.nl',53,'5/23/2017','4/23/2018'),
	(54,'Cassius Orred','94403 Derek Point','Shen’ao','464-667-2295','corred1h@list-manage.com',54,'8/26/2017','3/2/2018'),
	(55,'Emilio Poyntz','36 Kings Street','Nanling','478-257-4996','epoyntz1i@cpanel.net',55,'9/4/2017','5/7/2017'),
	(56,'Mitch Davydzenko','407 Algoma Junction','Sitampiky','180-153-5110','mdavydzenko1j@fotki.com',56,'1/24/2018','1/18/2018'),
	(57,'Ricca Gregor','71 Manitowish Terrace','Handa','522-937-2828','rgregor1k@addthis.com',57,'5/9/2017','8/4/2017'),
	(58,'Nannie Dunk','4 Kenwood Hill','Lena','365-614-4455','ndunk1l@columbia.edu',58,'5/19/2017','6/30/2017'),
	(59,'Felizio Klimshuk','30216 Bowman Park','San Carlos de Bariloche','853-799-8831','fklimshuk1m@who.int',59,'7/21/2017','1/26/2018'),
	(60,'Grange Scholes','4 Bonner Place','Maracanã','650-229-4867','gscholes1n@com.com',60,'11/18/2017','8/19/2017'),
	(61,'Hall Crocombe','77 Kings Avenue','Oof','381-711-3617','hcrocombe1o@networksolutions.com',61,'11/13/2017','12/29/2017'),
	(62,'Guenna Probert','4065 Columbus Way','Carvoeira','348-941-6832','gprobert1p@java.com',62,'7/25/2017','8/31/2017'),
	(63,'Myrah Greedyer','379 Shoshone Place','Yinyang','195-247-6736','mgreedyer1q@redcross.org',63,'10/20/2017','5/31/2017'),
	(64,'Noble Alleyne','1 Declaration Point','Kivertsi','213-694-7731','nalleyne1r@bluehost.com',64,'2/28/2018','6/11/2017'),
	(65,'Koo Raffles','1351 Dennis Circle','Soio','684-290-7532','kraffles1s@guardian.co.uk',65,'5/28/2017','8/24/2017'),
	(66,'Viki Aloshkin','142 Mendota Parkway','Ichinomiya','314-388-0571','valoshkin1t@ycombinator.com',66,'4/22/2018','4/25/2018'),
	(67,'Ediva Girdlestone','7790 Namekagon Avenue','Sudogda','338-452-4912','egirdlestone1u@bizjournals.com',67,'2/2/2018','3/12/2018'),
	(68,'Bea Duigenan','8 Homewood Junction','Guanli','701-813-6918','bduigenan1v@uol.com.br',68,'2/8/2018','10/4/2017'),
	(69,'Yvette Bagnall','784 Schurz Park','Toksovo','792-140-2103','ybagnall1w@wix.com',69,'4/29/2017','10/15/2017'),
	(70,'Ezra Eddies','27 Knutson Circle','Masarayao','667-524-8691','eeddies1x@gizmodo.com',70,'11/8/2017','1/23/2018'),
	(71,'Barby Goch','0023 Clove Alley','Atlanta','770-768-2729','bgoch1y@cmu.edu',71,'3/13/2018','3/28/2018'),
	(72,'Claude Davsley','4 Onsgard Court','Prinza','961-582-8860','cdavsley1z@cocolog-nifty.com',72,'3/20/2018','9/26/2017'),
	(73,'Burt Lenoir','3 Prentice Avenue','Mimbaan Timur','729-263-4876','blenoir20@canalblog.com',73,'7/3/2017','1/1/2018'),
	(74,'Ulysses Mundy','04902 Beilfuss Pass','Aragarças','172-678-4048','umundy21@ibm.com',74,'11/20/2017','10/19/2017'),
	(75,'Ami De Stoop','1 Veith Avenue','Estique','244-463-3721','ade22@e-recht24.de',75,'6/10/2017','5/17/2017'),
	(76,'Kameko Rockliffe','234 Esch Way','Lukou','624-575-5508','krockliffe23@seattletimes.com',76,'3/30/2018','6/11/2017'),
	(77,'Reilly Whimp','01 Ryan Junction','Wan’an','459-582-5969','rwhimp24@people.com.cn',77,'9/2/2017','3/5/2018'),
	(78,'Mohandis Rosie','131 Tennessee Alley','Doropeti','378-708-6747','mrosie25@sina.com.cn',78,'4/10/2018','1/7/2018'),
	(79,'Thorsten Sebert','2382 Susan Circle','Lang','555-390-3652','tsebert26@vimeo.com',79,'3/20/2018','11/10/2017'),
	(80,'Melany Dhennin','530 Lotheville Crossing','Dasheng','902-924-0015','mdhennin27@fda.gov',80,'5/19/2017','9/16/2017'),
	(81,'Nikki Woofendell','132 Artisan Drive','Temirgoyevskaya','262-488-4312','nwoofendell28@friendfeed.com',81,'10/8/2017','4/13/2018'),
	(82,'Elmo Latimer','31 Hagan Center','Orlando','407-104-4674','elatimer29@statcounter.com',82,'7/20/2017','8/28/2017'),
	(83,'Aurelia Hacking','7367 Porter Plaza','Chincha Baja','740-151-9604','ahacking2a@sciencedaily.com',83,'12/11/2017','7/12/2017'),
	(84,'Ruby Winsom','2458 Blue Bill Park Point','Jinzipai','141-276-5694','rwinsom2b@livejournal.com',84,'4/26/2017','8/31/2017'),
	(85,'Rosy Johansson','27 Shelley Point','Dumbéa','897-403-5591','rjohansson2c@nsw.gov.au',85,'5/16/2017','10/5/2017'),
	(86,'Easter Rigate','7 Clove Pass','Vinhais','692-518-1243','erigate2d@woothemes.com',86,'11/24/2017','12/30/2017'),
	(87,'Poppy Kingsley','5514 Luster Terrace','Lüxiang','939-123-6956','pkingsley2e@canalblog.com',87,'9/30/2017','9/30/2017'),
	(88,'Sukey Dowe','61 Loftsgordon Place','Sinamaica','915-861-5531','sdowe2f@reference.com',88,'4/23/2018','9/29/2017'),
	(89,'Ginnie McCartney','04 Sycamore Hill','Lakeland','863-104-5676','gmccartney2g@goo.ne.jp',89,'5/23/2017','4/22/2018'),
	(90,'Carine Anstiss','50 Oriole Crossing','Penalva','242-854-0502','canstiss2h@dedecms.com',90,'11/30/2017','4/26/2017'),
	(91,'Beckie Fender','9 Sheridan Circle','Mojolampir','112-926-8240','bfender2i@istockphoto.com',91,'3/24/2018','5/17/2017'),
	(92,'Dorothy Doni','5 Kennedy Street','Soeng Sang','522-602-5292','ddoni2j@twitter.com',92,'8/14/2017','11/26/2017'),
	(93,'Wynn Checkley','84 Maryland Circle','Manuel Roxas','652-431-8409','wcheckley2k@alexa.com',93,'1/18/2018','11/19/2017'),
	(94,'Frederique Schollick','511 Emmet Parkway','Lela','628-391-8130','fschollick2l@domainmarket.com',94,'11/21/2017','4/20/2018'),
	(95,'Althea Deaconson','70225 Mcguire Court','Åtvidaberg','875-714-6960','adeaconson2m@umich.edu',95,'3/16/2018','6/18/2017'),
	(96,'Killie Melbert','986 Bartelt Court','Picungbera','130-279-1968','kmelbert2n@alexa.com',96,'5/11/2017','10/3/2017'),
	(97,'Rozelle Cartin','95 Clove Way','Oslo','156-154-5830','rcartin2o@wiley.com',97,'7/7/2017','12/14/2017'),
	(98,'Samuele Iorizzo','8 Loeprich Circle','Kafr Takhārīm','924-640-1552','siorizzo2p@hatena.ne.jp',98,'8/24/2017','9/8/2017'),
	(99,'Bendix Gianulli','7521 Manufacturers Crossing','Haarlem','242-404-3696','bgianulli2q@list-manage.com',99,'5/12/2017','3/25/2018'),
	(100,'Abbey Ronnay','8 Onsgard Plaza','Oinófyta','435-815-8945','aronnay2r@mlb.com',100,'10/2/2017','10/4/2017'),
	(101,'Kanat Kunikeyev','Kanaaa','Алматы','87015050014','kana@gmail.com',5,'17:58:40 2018-5-12','17:58:40 2018-5-12'),
	(102,'Kanat Kunikeyev','Kanaaa','Алматы','87015050014','kana@gmail.com',5,'18:02:17 2018-5-12','18:02:17 2018-5-12'),
	(103,'Kanat Kunikeyev','whaaaat','Алматы','87015050014','kana@gmail.com',4,'18:02:54 2018-5-12','18:02:54 2018-5-12'),
	(104,'Kanat Kunikeyev','whaaaat','Алматы','87015050014','kana@gmail.com',4,'18:03:24 2018-5-12','18:03:24 2018-5-12'),
	(105,'Kanat Kunikeyev','14123','Алматы','13241234123','qwerty@gmail.com',2,'18:05:59 2018-5-12','18:05:59 2018-5-12'),
	(106,'John Doe','John Street','Шымкент','+7 (777) 555-44-22','johndoe@mail.com',4,'00:48:08 2018-5-13','00:48:08 2018-5-13'),
	(107,'Алибек Оспан','г.Алматы, Манаса 34А','Алматы','+7 (777) 555-44-33','alibekospan@gmail.com',1,'02:50:59 2018-5-13','02:50:59 2018-5-13'),
	(108,'Бейбут Алибеков','г.Алматы, Манаса 34А','Алматы','+7 (777) 000-12-34','alibekovkz@mail.kz',2,'02:52:54 2018-5-13','02:52:54 2018-5-13'),
	(109,'Димаш Кудайберген','г.Алматы, Манаса 34А','Алматы','+7 (777) 777-77-77','dimashi@mail.ch',4,'02:54:54 2018-5-13','02:54:54 2018-5-13'),
	(110,'Ержан Рашев','г.Алматы, ул. Манаса 34А','Алматы','+7 (701) 123-45-67','razhevkz@mail.ru',5,'02:56:19 2018-5-13','02:56:19 2018-5-13'),
	(111,'','','','','',1,'12:05:15 2018-5-13','12:05:15 2018-5-13'),
	(112,'САУЛАТБЕК АБЫЛАЙ ТӨЛЕУБЕКҰЛЫ','г.Алматы, ул.Манаса 34А','Алматы','+7 (701) 555-55-55','mytest@gmail.com',1,'12:21:19 2018-5-13','12:21:19 2018-5-13');

/*!40000 ALTER TABLE `ic_clients` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_common_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_common_info`;

CREATE TABLE `ic_common_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `c_address` varchar(255) DEFAULT NULL,
  `c_phone` varchar(255) DEFAULT NULL,
  `c_email` varchar(255) DEFAULT NULL,
  `c_facebook` varchar(255) DEFAULT NULL,
  `c_instagram` varchar(255) DEFAULT NULL,
  `c_vk` varchar(255) DEFAULT NULL,
  `c_twitter` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Дамп таблицы ic_form_requests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_form_requests`;

CREATE TABLE `ic_form_requests` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `f_name` varchar(100) DEFAULT NULL,
  `f_email` varchar(100) DEFAULT NULL,
  `f_phone` varchar(100) DEFAULT NULL,
  `f_message` text,
  `f_status` int(11) DEFAULT NULL,
  `f_form_type` int(11) DEFAULT NULL,
  `f_served_mid` int(11) DEFAULT NULL,
  `f_created_at` varchar(100) DEFAULT NULL,
  `f_updated_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_form_requests` WRITE;
/*!40000 ALTER TABLE `ic_form_requests` DISABLE KEYS */;

INSERT INTO `ic_form_requests` (`id`, `f_name`, `f_email`, `f_phone`, `f_message`, `f_status`, `f_form_type`, `f_served_mid`, `f_created_at`, `f_updated_at`)
VALUES
	(1,NULL,NULL,NULL,NULL,0,1,NULL,NULL,NULL),
	(2,'Kanat','kanat@mail.ru','12121','22122121',0,1,NULL,NULL,NULL),
	(3,'Kanat','1232131','312312312','3123123',1,1,NULL,NULL,NULL),
	(4,'Kanat','kanat@mail.ru','12323123','312312312312',0,1,NULL,NULL,NULL),
	(5,'Kanat','kanat@mail.ru','123123','3123123123',0,1,NULL,NULL,NULL),
	(6,'kana','','123123','',0,2,NULL,NULL,NULL),
	(7,'qwe','','wqe','',0,2,NULL,NULL,NULL),
	(8,'123','','123','',0,2,NULL,NULL,NULL),
	(9,'Алмат','almat@gmail.com','1231231231','Хелп',0,1,NULL,NULL,NULL),
	(10,'Алмат Алибеков','almat@gmail.com','8712121221','Позваните!',0,1,NULL,NULL,NULL);

/*!40000 ALTER TABLE `ic_form_requests` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_goods_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_goods_order`;

CREATE TABLE `ic_goods_order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goods_type` varchar(45) DEFAULT NULL,
  `risk_type` varchar(255) DEFAULT NULL,
  `given_sum` int(45) DEFAULT NULL,
  `client_city` varchar(45) DEFAULT NULL,
  `client_fullname` varchar(255) DEFAULT NULL,
  `client_phone` varchar(45) DEFAULT NULL,
  `client_email` varchar(45) DEFAULT NULL,
  `client_address` varchar(255) DEFAULT NULL,
  `payment_type` varchar(45) DEFAULT NULL,
  `insurance_price` int(45) DEFAULT NULL,
  `insurance_type` int(45) DEFAULT NULL,
  `served_mid` int(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `created_at` varchar(100) DEFAULT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_goods_order` WRITE;
/*!40000 ALTER TABLE `ic_goods_order` DISABLE KEYS */;

INSERT INTO `ic_goods_order` (`id`, `goods_type`, `risk_type`, `given_sum`, `client_city`, `client_fullname`, `client_phone`, `client_email`, `client_address`, `payment_type`, `insurance_price`, `insurance_type`, `served_mid`, `status`, `created_at`, `updated_at`)
VALUES
	(1,'0','Огонь (пожар, авария, электросети),Залив,Повреждение,Стихийные бедствия,Противоправные действия третьих лиц',3000000,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','Baker Street','Наличными',12000,4,2,NULL,'15:59:26 2018-5-12','15:59:26 2018-5-12'),
	(2,'1','Огонь (пожар, авария, электросети),,Повреждение,,Противоправные действия третьих лиц',5000000,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','whaaaat','Наличными',24500,4,2,'0','18:02:54 2018-5-12','18:02:54 2018-5-12'),
	(3,'1','Огонь (пожар, авария, электросети),,Повреждение,,Противоправные действия третьих лиц',5000000,'Алматы','Kanat Kunikeyev','87015050014','kana@gmail.com','whaaaat','Наличными',24500,4,2,'0','18:03:24 2018-5-12','18:03:24 2018-5-12'),
	(4,'0','Огонь (пожар, авария, электросети),,Повреждение,Стихийные бедствия,',5000000,'Шымкент','John Doe','+7 (777) 555-44-22','johndoe@mail.com','John Street','Наличными',11000,4,2,'0','00:48:08 2018-5-13','00:48:08 2018-5-13'),
	(5,'0','Огонь (пожар, авария, электросети),,Повреждение,,Противоправные действия третьих лиц',5000000,'Алматы','Димаш Кудайберген','+7 (777) 777-77-77','dimashi@mail.ch','г.Алматы, Манаса 34А','Наличными',17000,4,2,'0','02:54:54 2018-5-13','02:54:54 2018-5-13');

/*!40000 ALTER TABLE `ic_goods_order` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_insurance_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_insurance_type`;

CREATE TABLE `ic_insurance_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `it_type` varchar(45) DEFAULT NULL,
  `it_picname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_insurance_type` WRITE;
/*!40000 ALTER TABLE `ic_insurance_type` DISABLE KEYS */;

INSERT INTO `ic_insurance_type` (`id`, `it_type`, `it_picname`)
VALUES
	(1,'КАСКО','kasko'),
	(2,'Туризм','tourism'),
	(4,'Недвижимость','goods'),
	(5,'Несчастный случай','accident');

/*!40000 ALTER TABLE `ic_insurance_type` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_kasko_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_kasko_order`;

CREATE TABLE `ic_kasko_order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `car_type` varchar(45) DEFAULT NULL,
  `car_city` varchar(45) DEFAULT NULL,
  `car_year` varchar(45) DEFAULT NULL,
  `driver_experience` varchar(45) DEFAULT NULL,
  `driver_age` varchar(45) DEFAULT NULL,
  `driver_iin` varchar(45) DEFAULT NULL,
  `client_city` varchar(45) DEFAULT NULL,
  `client_fullname` varchar(90) DEFAULT NULL,
  `client_phone` varchar(45) DEFAULT NULL,
  `client_email` varchar(45) DEFAULT NULL,
  `car_number` varchar(45) DEFAULT NULL,
  `car_vin` varchar(45) DEFAULT NULL,
  `client_address` varchar(255) DEFAULT NULL,
  `payment_type` varchar(45) DEFAULT NULL,
  `ins_price` int(11) DEFAULT NULL,
  `ins_type` int(5) DEFAULT NULL,
  `served_mid` int(11) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `created_at` varchar(100) DEFAULT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_kasko_order` WRITE;
/*!40000 ALTER TABLE `ic_kasko_order` DISABLE KEYS */;

INSERT INTO `ic_kasko_order` (`id`, `car_type`, `car_city`, `car_year`, `driver_experience`, `driver_age`, `driver_iin`, `client_city`, `client_fullname`, `client_phone`, `client_email`, `car_number`, `car_vin`, `client_address`, `payment_type`, `ins_price`, `ins_type`, `served_mid`, `status`, `created_at`, `updated_at`)
VALUES
	(4,'3','2','2007','2 года и более','Менее 25 лет','961210300876','Алматы','Алмат Алибеков','87015050014','test@mail.ru','KZ111GGG02','12312312312','Г.Алматы улица Алматы','Наличными при получении курьеру',16300,1,5,'1',NULL,NULL),
	(7,'0','2','2016','Менее 2 лет','Менее 25 лет','9876543210','Шымкент','Адилет Абдукаримов','9876543210','adlet@mail.kz','KZ777AAA02','9876543210','Толеби 45','Наличными при получении курьеру',15111,1,1,'1',NULL,NULL),
	(8,'0','2','2017','Менее 2 лет','Менее 25 лет','09876543210','Алматы','Рустем Акылбаев','87015050014','rustem@mail.ch','KZ777AAA02','098765432112','Толеби 45','Оформить в офисе',14300,1,1,'1',NULL,NULL),
	(9,'0','2','2004','Менее 2 лет','Менее 25 лет','970209300136','Тараз','Алиби Малик','87476825399','alibimalik@gmail.com','KZ001GGG02','1234567890','Акбулак','Наличными при получении курьеру',17821,1,2,'0',NULL,NULL),
	(17,'1','0','1','1','1','930401301903','Алматы','Алибек Оспан','8701505005','alibek@gmail.com','KZ001ABC02','K01234567K','Hello World','Оформить в офисе',25610,1,2,'0','15:33:30 2018-5-11','15:33:30 2018-5-11'),
	(18,'0','0','0','1','1','930401301903','Алматы','Алибек Оспан','+7 (777) 555-44-33','alibekospan@gmail.com','KZ123ABC02','K123456K','г.Алматы, Манаса 34А','Оформить в офисе',14926,1,2,NULL,'02:50:59 2018-5-13','02:50:59 2018-5-13'),
	(20,'0','2','1','1','1','960829301024','Алматы','САУЛАТБЕК АБЫЛАЙ ТӨЛЕУБЕКҰЛЫ','+7 (701) 555-55-55','mytest@gmail.com','KZ001AAA02','A1234567A','г.Алматы, ул.Манаса 34А','Наличными при получении курьеру',8976,1,1,NULL,'12:21:19 2018-5-13','12:21:19 2018-5-13');

/*!40000 ALTER TABLE `ic_kasko_order` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_managers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_managers`;

CREATE TABLE `ic_managers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `m_login` varchar(100) DEFAULT NULL,
  `m_password` varchar(100) DEFAULT NULL,
  `m_fullname` varchar(70) DEFAULT NULL,
  `m_title` varchar(45) DEFAULT NULL,
  `m_hiredate` varchar(45) DEFAULT NULL,
  `m_phone` varchar(45) DEFAULT NULL,
  `m_birthdate` varchar(45) DEFAULT NULL,
  `m_gender` varchar(45) DEFAULT NULL,
  `m_email` varchar(45) DEFAULT NULL,
  `m_isadmin` int(11) DEFAULT NULL,
  `m_roleid` int(11) DEFAULT NULL,
  `m_created_at` varchar(100) DEFAULT NULL,
  `m_updated_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_managers` WRITE;
/*!40000 ALTER TABLE `ic_managers` DISABLE KEYS */;

INSERT INTO `ic_managers` (`id`, `m_login`, `m_password`, `m_fullname`, `m_title`, `m_hiredate`, `m_phone`, `m_birthdate`, `m_gender`, `m_email`, `m_isadmin`, `m_roleid`, `m_created_at`, `m_updated_at`)
VALUES
	(1,'boss','boss','The Boss','The Boss','1/1/1970','(123) 1231231','1/1/1970','Male','boss@boss.com',1,4,NULL,NULL),
	(2,'m_serving','m_serving','Not managed','test','01/01/1970','000 0000000','01/01/1970','Male','server@server.com',1,4,NULL,NULL),
	(5,'Aleksandr','alex','Aleksandr Hasselby','SMM Manager','10/3/2017','(115) 7210581','8/26/2017','Male','oleksand@mail.ua',0,3,NULL,NULL),
	(6,'Barnaby','giZXkMvJeBbL','Barnaby Cheverell','Director of Sales','5/27/2017','(388) 2017191','8/6/2017','Male','bcheverell5@harvard.edu',0,3,NULL,NULL),
	(7,'Berta','lpncqQQ3u','Berta Liveing','Marketing Assistant','9/16/2017','(668) 8936107','9/16/2017','Female','bliveing6@businessinsider.com',0,1,NULL,NULL),
	(8,'Cart','8BnlDO4SBR','Cart Larmour','Data Coordiator','9/16/2017','(393) 1633636','4/23/2017','Male','clarmour7@oaic.gov.au',0,3,NULL,NULL),
	(9,'Kerrie','LEoNOCAhY','Kerrie Lapere','Engineer I','2/7/2018','(640) 5748549','4/27/2017','Female','klapere8@comcast.net',0,2,NULL,NULL),
	(10,'Benita','I1hwoQXq5Hoq','Benita Orts','Financial Advisor','5/22/2017','(546) 5245676','2/8/2018','Female','borts9@mtv.com',0,1,NULL,NULL),
	(11,'Werner','ojxJZYr','Werner Lorence','Associate Professor','6/5/2017','(308) 5981745','5/14/2017','Male','wlorencea@is.gd',0,3,NULL,NULL),
	(12,'Albertina','s0wjAj9jFzv9','Albertina Staniforth','Pharmacist','10/15/2017','(516) 7511200','7/28/2017','Female','astaniforthb@ezinearticles.com',0,2,NULL,NULL),
	(13,'Shaw','Dggxz3gAqc8C','Shaw Juanico','Legal Assistant','2/19/2018','(681) 9457451','7/11/2017','Male','sjuanicoc@exblog.jp',0,3,NULL,NULL),
	(14,'Chaim','QWyb9j','Chaim Peddel','Office Assistant I','5/9/2017','(188) 3399678','7/24/2017','Male','cpeddeld@pbs.org',0,1,NULL,NULL),
	(15,'Ivan','DtvkyGi14','Ivan Wallett','Chief Design Engineer','4/22/2017','(984) 5955263','2/20/2018','Male','iwallette@livejournal.com',0,2,NULL,NULL),
	(16,'Moishe','QLqy7YsFzov0','Moishe Figgess','GIS Technical Architect','2/28/2018','(119) 2878759','5/21/2017','Male','mfiggessf@google.de',0,3,NULL,NULL),
	(17,'Jolyn','LipVTgFaWMM','Jolyn Went','GIS Technical Architect','6/4/2017','(232) 7097913','3/2/2018','Female','jwentg@wix.com',0,1,NULL,NULL),
	(18,'Polly','j3hcRv0tdk','Polly Grace','Help Desk Operator','11/22/2017','(129) 9969250','10/1/2017','Female','pgraceh@about.com',0,2,NULL,NULL),
	(19,'Chloe','oOaWEmKT','Chloe Lehrer','Junior Executive','5/6/2017','(916) 9102167','4/21/2017','Female','clehreri@dot.gov',0,3,NULL,NULL),
	(20,'Pren','u9hRqkXlJSp','Pren Kidwell','Geological Engineer','12/14/2017','(369) 1644183','5/25/2017','Male','pkidwellj@biblegateway.com',0,2,NULL,NULL),
	(21,'Candy','IHTZ41Vm','Candy Siege','Accountant IV','4/1/2018','(102) 2797261','7/9/2017','Female','csiegek@uol.com.br',0,3,NULL,NULL),
	(22,'Godfrey','wXcykg','Godfrey Isitt','Web Designer IV','4/24/2017','(520) 6032249','3/1/2018','Male','gisittl@fema.gov',0,1,NULL,NULL),
	(23,'Juana','YVEA25','Juana Bullar','Account Representative III','6/25/2017','(120) 8660502','11/9/2017','Female','jbullarm@freewebs.com',0,3,NULL,NULL),
	(24,'Hakeem','VAjosTghu','Hakeem Bruhke','Senior Financial Analyst','5/5/2017','(334) 1408697','9/21/2017','Male','hbruhken@list-manage.com',0,2,NULL,NULL),
	(25,'Leoine','4ifgIOXSM3dB','Leoine Casebourne','Chief Design Engineer','10/29/2017','(198) 5279847','9/15/2017','Female','lcasebourneo@angelfire.com',0,2,NULL,NULL),
	(26,'mark','mark1515','Mark Keelen','Developer','04/10/2018','777 4445555','10/29/2008','Male','markkeelen@mail.ru',0,3,NULL,NULL);

/*!40000 ALTER TABLE `ic_managers` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_news
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_news`;

CREATE TABLE `ic_news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `n_title` varchar(100) DEFAULT NULL,
  `n_body` text,
  `n_date` varchar(100) DEFAULT NULL,
  `n_mgid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_news` WRITE;
/*!40000 ALTER TABLE `ic_news` DISABLE KEYS */;

INSERT INTO `ic_news` (`id`, `n_title`, `n_body`, `n_date`, `n_mgid`)
VALUES
	(1,'Мы открылись','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','2018-04-13T08:50:29.924Z',1),
	(2,'Наша компания','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','2018-04-13T08:57:12.976Z',1),
	(3,'Скоро лето','Гип-гип ураа!!!!!\r\nГип-гип ураа!!!!!','10:55:06 2018-4-25',1);

/*!40000 ALTER TABLE `ic_news` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_roles`;

CREATE TABLE `ic_roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `r_rolename` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_roles` WRITE;
/*!40000 ALTER TABLE `ic_roles` DISABLE KEYS */;

INSERT INTO `ic_roles` (`id`, `r_rolename`)
VALUES
	(1,'Менеджер - А'),
	(2,'Менеджер - B'),
	(3,'Менеджер - C'),
	(4,'Админ');

/*!40000 ALTER TABLE `ic_roles` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ic_tourism_order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ic_tourism_order`;

CREATE TABLE `ic_tourism_order` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `insurance_sum` int(11) DEFAULT NULL,
  `currency` varchar(45) DEFAULT NULL,
  `currency_sum` varchar(45) DEFAULT NULL,
  `start_date` varchar(45) DEFAULT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  `client_city` varchar(45) DEFAULT NULL,
  `client_fullname` varchar(100) DEFAULT NULL,
  `client_phone` varchar(45) DEFAULT NULL,
  `client_email` varchar(45) DEFAULT NULL,
  `client_iin` int(15) DEFAULT NULL,
  `client_address` varchar(255) DEFAULT NULL,
  `payment_type` varchar(90) DEFAULT NULL,
  `insurance_price` varchar(45) DEFAULT NULL,
  `insurance_type` int(10) DEFAULT NULL,
  `served_mid` int(10) DEFAULT NULL,
  `updated_at` varchar(100) DEFAULT NULL,
  `created_at` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ic_tourism_order` WRITE;
/*!40000 ALTER TABLE `ic_tourism_order` DISABLE KEYS */;

INSERT INTO `ic_tourism_order` (`id`, `insurance_sum`, `currency`, `currency_sum`, `start_date`, `end_date`, `client_city`, `client_fullname`, `client_phone`, `client_email`, `client_iin`, `client_address`, `payment_type`, `insurance_price`, `insurance_type`, `served_mid`, `updated_at`, `created_at`)
VALUES
	(1,30000,'327.92',NULL,NULL,NULL,'Алматы','Kanat','13123123','kana@gmail.com',12312312,'3123123123','Платежная карта','3279',2,2,'12:29:58 2018-5-11','12:29:58 2018-5-11'),
	(2,30000,'327.92',NULL,NULL,NULL,'Алматы','Kanat','13123123','kana@gmail.com',12312312,'3123123123','Платежная карта','3279',2,2,'12:30:29 2018-5-11','12:30:29 2018-5-11'),
	(3,30000,'327.92',NULL,NULL,NULL,'Алматы','Kanat Kunikeyev','13241234123','qwerty@gmail.com',970123451,'14123','Наличными','2295',2,2,'18:05:59 2018-5-12','18:05:59 2018-5-12');

/*!40000 ALTER TABLE `ic_tourism_order` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

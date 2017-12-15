-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2017 at 08:18 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sinhvien`
--

-- --------------------------------------------------------

--
-- Table structure for table `sinhvien`
--

CREATE TABLE `sinhvien` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sinhvien`
--

INSERT INTO `sinhvien` (`id`, `fullname`, `email`, `birthday`, `phone`, `address`, `created_at`, `updated_at`) VALUES
(21, 'Nguyễn Thành Đạt', 'thanhdat212931111@gmail.com', '2017-11-30', '0947047374', 'Đội 2 - Thôn Ngự Câu - Xã An Thượng- Huyện Hoài Đức', '2017-12-15 13:32:47', '2017-12-15 13:32:47'),
(22, 'Vương Quang Tuyên', 'thanhdat21293@gmail.com', '1991-04-05', '0947047374', 'Đội 2 - Thôn Ngự Câu - Xã An Thượng- Huyện Hoài Đức', '2017-12-15 13:33:34', '2017-12-15 13:33:34'),
(24, 'Nguyễn Thành Đạt', 'thanhdat212931@gmail.com', '2017-12-15', '0947047374', 'Đội 2 - Thôn Ngự Câu - Xã An Thượng- Huyện Hoài Đức', '2017-12-15 14:07:57', '2017-12-15 14:08:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sinhvien`
--
ALTER TABLE `sinhvien`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sinhvien`
--
ALTER TABLE `sinhvien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Фев 19 2017 г., 18:05
-- Версия сервера: 5.5.53
-- Версия PHP: 7.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `articles`
--

CREATE TABLE `articles` (
  `title` varchar(32) NOT NULL,
  `subject` varchar(32) NOT NULL,
  `text_length` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `articles`
--

INSERT INTO `articles` (`title`, `subject`, `text_length`, `date`, `id`) VALUES
('Title_1', 'Subject_1', 120, '2017-02-08', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `status` tinyint(4) UNSIGNED NOT NULL,
  `destination_adress` varchar(128) NOT NULL,
  `zip_code` tinyint(3) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `orders_products`
--

CREATE TABLE `orders_products` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `price` float NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `material` varchar(8) NOT NULL,
  `proportions` varchar(64) NOT NULL,
  `face_thickness` float NOT NULL,
  `price` float NOT NULL,
  `quantity` tinyint(4) UNSIGNED NOT NULL,
  `description` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `material`, `proportions`, `face_thickness`, `price`, `quantity`, `description`, `image`) VALUES
(1, 'Череп динозавра', 'ABS', '150x125x200 mm', 0.2, 4500, 3, 'Череп динозавра на подставке', 'img/pic4.png'),
(2, 'Фигурка солдата', 'ABS', '112x43x38 mm', 0.1, 1200, 5, '', 'img/pic2.png'),
(3, 'Модель мотоцикла', 'ABS', '160x91x54', 0.3, 5990, 1, 'Модель мотоцикла, распечатанная по деталям и собранная.', 'img/pic3.png'),
(4, 'Модель мухи', 'PLA', '56x42x33 mm', 0.1, 900, 7, 'Модель мухи, распечатанная по деталям и собранная.', 'img/pic8.png'),
(5, 'Модель гитары', 'ABS', '', 0.2, 2000, 1, '', 'img/unavailable.png'),
(6, 'Браслет', 'PLA', '', 0.2, 600, 4, '', 'img/unavailable.png');

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `evaluation` int(6) UNSIGNED NOT NULL,
  `product_name` varchar(64) NOT NULL,
  `text_length` varchar(256) NOT NULL,
  `date` date NOT NULL,
  `id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `nickname` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `surname` varchar(64) NOT NULL,
  `user_type` int(10) UNSIGNED NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `adress` varchar(128) NOT NULL,
  `zip_code` varchar(64) NOT NULL,
  `is_verified` bit(1) NOT NULL DEFAULT b'0',
  `id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`nickname`, `name`, `surname`, `user_type`, `password`, `email`, `adress`, `zip_code`, `is_verified`, `id`) VALUES
('Alex', 'Александр', 'Фоменко', 0, '$2y$10$E07zqyFq3B8mJi5Sz383nekAauisxfLetAx7gbdK7b1yi8oJgoeue', 'hunterfad@gmail.com', 'пер. А. Глушко 38, кв. 4', '347900', b'0', 43),
('Hunter', '', '', 0, '$2y$10$u2EhdKAXek498NZ9k.zH8OR1NiJjKCOXQEZaWLMz0rhIde4PXS4Zq', 'qwerty.ru96@mail.ru', '', '', b'0', 45);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders_products`
--
ALTER TABLE `orders_products`
  ADD PRIMARY KEY (`product_id`,`order_id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

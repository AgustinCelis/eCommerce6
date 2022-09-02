DROP DATABASE IF EXISTS guitar_web;
CREATE DATABASE guitar_web;
USE guitar_web;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `active` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `categ_id` int(11) NOT NULL,
  `active` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `FK_SC_C_idx` (`categ_id`),
  CONSTRAINT `FK_SC_C` FOREIGN KEY (`categ_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `username` varchar(64) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` tinytext NOT NULL,
  `avatar` tinytext DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT 1,
  `active` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `FK_U_R_idx` (`role_id`),
  CONSTRAINT `FK_U_R` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categ_id` int(10) NOT NULL,
  `subcateg_id` int(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `image_1` varchar(256) NOT NULL,
  `image_2` varchar(256) DEFAULT NULL,
  `image_3` varchar(256) DEFAULT NULL,
  `image_4` varchar(256) DEFAULT NULL,
  `description` varchar(240) NOT NULL,
  `price` int(10) unsigned NOT NULL,
  `available_amount` int(10) unsigned NOT NULL,
  `color_1` varchar(256) DEFAULT NULL,
  `color_2` varchar(256) DEFAULT NULL,
  `color_3` varchar(256) DEFAULT NULL,
  `color_4` varchar(256) DEFAULT NULL,
  `color_5` varchar(256) DEFAULT NULL,
  `characteristics` mediumtext DEFAULT NULL,
  `body_specs` mediumtext DEFAULT NULL,
  `neck_specs` mediumtext DEFAULT NULL,
  `accesories_specs` mediumtext DEFAULT NULL,
  `active` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  KEY `FK_P_C_idx` (`categ_id`),
  KEY `FK_P_SC_idx` (`subcateg_id`),
  CONSTRAINT `FK_P_C` FOREIGN KEY (`categ_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_P_SC` FOREIGN KEY (`subcateg_id`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `amount` int(11) NOT NULL DEFAULT 1,
  `price` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_C_U_idx` (`product_id`),
  KEY `FK_C_U_idx1` (`user_id`),
  CONSTRAINT `FK_C_P` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_C_U` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `FK_O_U_idx` (`user_id`),
  CONSTRAINT `FK_O_U` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

/*Alteracion de categories*/
ALTER TABLE categories AUTO_INCREMENT = 1;
INSERT INTO categories (id, name, active)
VALUES (DEFAULT, "Eléctricas", DEFAULT);
INSERT INTO categories (id, name, active)
VALUES (DEFAULT, "Acústicas", DEFAULT);
INSERT INTO categories (id, name, active)
VALUES (DEFAULT, "Bajos", DEFAULT);
INSERT INTO categories (id, name, active)
VALUES (DEFAULT, "Amplificación", DEFAULT);
INSERT INTO categories (id, name, active)
VALUES (DEFAULT, "Accesorios", DEFAULT);
INSERT INTO categories (id, name, active)
VALUES (DEFAULT, "Repuestos", DEFAULT);

/*Alteracion de subcategories*/
ALTER TABLE subcategories AUTO_INCREMENT = 1;
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Stratocaster", 1, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Telecaster", 1, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Paul Reed Smith", 1, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Solid Guitar", 1, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Les Paul", 1, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Superstrat", 1, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Classic design", 2, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "California", 2, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Paramount", 2, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Ukelele", 2, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Precision", 3, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Jazz", 3, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Jaguar", 3, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Mustang", 3, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Contempory-digital", 4, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Vintage & Pro tube", 4, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Acoustic", 4, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Cables", 5, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Ear plugs", 5, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Puas", 5, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Afinadores", 5, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Cuerdas", 6, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Pastillas", 6, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Mastiles y clavijeros", 6, DEFAULT);
INSERT INTO subcategories (id, name, categ_id, active)
VALUES (DEFAULT, "Cuerpos y botones", 6, DEFAULT);

/* roles */
INSERT INTO roles (id, name)
VALUES (1, "user");
INSERT INTO roles (id, name)
VALUES (2, "admin");

/*products*/
INSERT INTO products(id, categ_id, subcateg_id, created_at, updated_at, deleted_at, name, image_1, image_2, image_3, image_4, description, price, available_amount, color_1, color_2, color_3, color_4, color_5, characteristics, body_specs, neck_specs, accesories_specs, active)
VALUES (DEFAULT, 1, 2, NULL, NULL, NULL, "Marley", "default1.png", 'default2.png', 'default3.png', 'default4.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet magna libero. Pellentesque ullamcorper volutpat sodales. Pellentesque non lorem tortor. Sed sollicitudin auctor sem, sit amet euismod nisi finibus nec. Phasellus accumsan quis neque et pharetra.', 10000, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

INSERT INTO products(id, categ_id, subcateg_id, created_at, updated_at, deleted_at, name, image_1, image_2, image_3, image_4, description, price, available_amount, color_1, color_2, color_3, color_4, color_5, characteristics, body_specs, neck_specs, accesories_specs, active)
VALUES (DEFAULT, 2, 7, NULL, NULL, NULL, "Mozart", "default1.png", 'default2.png', 'default3.png', 'default4.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet magna libero. Pellentesque ullamcorper volutpat sodales. Pellentesque non lorem tortor. Sed sollicitudin auctor sem, sit amet euismod nisi finibus nec. Phasellus accumsan quis neque et pharetra.', 20000, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

INSERT INTO products(id, categ_id, subcateg_id, created_at, updated_at, deleted_at, name, image_1, image_2, image_3, image_4, description, price, available_amount, color_1, color_2, color_3, color_4, color_5, characteristics, body_specs, neck_specs, accesories_specs, active)
VALUES (DEFAULT, 4, 17, NULL, NULL, NULL, "Beethoven", "default1.png", 'default2.png', 'default3.png', 'default4.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet magna libero. Pellentesque ullamcorper volutpat sodales. Pellentesque non lorem tortor. Sed sollicitudin auctor sem, sit amet euismod nisi finibus nec. Phasellus accumsan quis neque et pharetra.', 15000, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

INSERT INTO products(id, categ_id, subcateg_id, created_at, updated_at, deleted_at, name, image_1, image_2, image_3, image_4, description, price, available_amount, color_1, color_2, color_3, color_4, color_5, characteristics, body_specs, neck_specs, accesories_specs, active)
VALUES (DEFAULT, 6, 25, NULL, NULL, NULL, "Rockstar", "default1.png", 'default2.png', 'default3.png', 'default4.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet magna libero. Pellentesque ullamcorper volutpat sodales. Pellentesque non lorem tortor. Sed sollicitudin auctor sem, sit amet euismod nisi finibus nec. Phasellus accumsan quis neque et pharetra.', 60000, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

INSERT INTO products(id, categ_id, subcateg_id, created_at, updated_at, deleted_at, name, image_1, image_2, image_3, image_4, description, price, available_amount, color_1, color_2, color_3, color_4, color_5, characteristics, body_specs, neck_specs, accesories_specs, active)
VALUES (DEFAULT, 5, 19, NULL, NULL, NULL, "Slash", "default1.png", 'default2.png', 'default3.png', 'default4.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet magna libero. Pellentesque ullamcorper volutpat sodales. Pellentesque non lorem tortor. Sed sollicitudin auctor sem, sit amet euismod nisi finibus nec. Phasellus accumsan quis neque et pharetra.', 100000, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

INSERT INTO products(id, categ_id, subcateg_id, created_at, updated_at, deleted_at, name, image_1, image_2, image_3, image_4, description, price, available_amount, color_1, color_2, color_3, color_4, color_5, characteristics, body_specs, neck_specs, accesories_specs, active)
VALUES (DEFAULT, 3, 11, NULL, NULL, NULL, "Rose", "default1.png", 'default2.png', 'default3.png', 'default4.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet magna libero. Pellentesque ullamcorper volutpat sodales. Pellentesque non lorem tortor. Sed sollicitudin auctor sem, sit amet euismod nisi finibus nec. Phasellus accumsan quis neque et pharetra.', 60000, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);
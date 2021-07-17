-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'reviews'
--
-- ---

CREATE DATABASE reviews;

\c reviews

-- DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL UNIQUE,
  product_id INTEGER NULL DEFAULT NULL,
  rating INTEGER NULL DEFAULT NULL,
  date VARCHAR NULL DEFAULT NULL,
  summary VARCHAR NULL DEFAULT NULL,
  body VARCHAR NULL DEFAULT NULL,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  reviewer_email VARCHAR NULL DEFAULT NULL,
  response VARCHAR NULL DEFAULT NULL,
  helpfulness INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id, product_id)
);

-- ---
-- Table 'reviews_photos'
--
-- ---

-- DROP TABLE IF EXISTS reviews_photos;

CREATE TABLE reviews_photos (
  id SERIAL,
  review_id INTEGER NULL DEFAULT NULL,
  url VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id, review_id)
);

-- ---
-- Table 'characteristics_reviews'
--
-- ---

-- DROP TABLE IF EXISTS characteristics_reviews;

CREATE TABLE characteristic_reviews (
  id SERIAL,
  characteristic_id INTEGER NULL DEFAULT NULL,
  review_id INTEGER NULL DEFAULT NULL,
  value INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id, characteristic_id, review_id)
);

-- ---
-- Table 'characteristics'
--
-- ---

-- DROP TABLE IF EXISTS characteristics;

CREATE TABLE characteristics (
  id SERIAL UNIQUE,
  product_id INTEGER NULL DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id, product_id)
);

-- ---
-- Table 'product'
--
-- ---

-- DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id SERIAL UNIQUE,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE reviews_photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES product (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE reviews ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE reviews_photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE characteristics_reviews ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE characteristics ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE product ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---


-- INSERT INTO product (id) VALUES
-- (1);
-- INSERT INTO reviews (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness) VALUES
-- (1,1,1,1,'','',true,false,'','','',8);
-- INSERT INTO reviews_photos (id,review_id,url) VALUES
-- (1,1,'');
-- INSERT INTO characteristics (id,product_id,name) VALUES
-- (1,1,'');
-- INSERT INTO characteristic_reviews (id,characteristic_id,review_id,value) VALUES
-- (1,1,1,3);


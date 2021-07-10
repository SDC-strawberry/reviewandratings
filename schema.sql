CREATE DATABASE reviews;

USE reviews;

CREATE TABLE product_id (

  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT UNIQUE
);


CREATE TABLE reviews (
  /* Describe your table here.*/
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  rating INT,
  summary VARCHAR(60),
  recommend TINYINT(1),
  response VARCHAR(60),
  body VARCHAR(1000),
  date TIMESTAMP,
  reviewer_name VARCHAR(60),
  helpfulness INT,
  CONSTRAINT reviews_ibfk_1
  FOREIGN KEY (product_id)
  REFERENCES product_id(product_id)

);



-- this is the template for creating foreign keys
-- -- CREATE TABLE junction (
-- --   /* Describe your table here.*/
-- --   id INT PRIMARY KEY,
-- --   user_id INT,
-- --   msg_id INT,
-- --   room_id INT,
-- --   FOREIGN KEY (user_id)
-- --     REFERENCES users(id),
-- --   FOREIGN KEY (msg_id)
-- --     REFERENCES messages(id),
-- --   FOREIGN KEY (room_id)
-- --     REFERENCES rooms(id)
-- -- );


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
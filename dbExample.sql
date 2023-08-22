CREATE TABLE country (
  country_id INT AUTO_INCREMENT PRIMARY KEY,
  country_name VARCHAR(255) NOT NULL
);

CREATE TABLE book_language (
  language_id INT AUTO_INCREMENT PRIMARY KEY,
  language_name VARCHAR(255) NOT NULL
);

CREATE TABLE publisher (
  publisher_id INT AUTO_INCREMENT PRIMARY KEY,
  publisher_name VARCHAR(255) NOT NULL
);

CREATE TABLE author (
  author_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);

CREATE TABLE shipping_method (
  shipping_method_id INT AUTO_INCREMENT PRIMARY KEY,
  shipping_method_name VARCHAR(255) NOT NULL
);

CREATE TABLE customer (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE address (
  address_id INT AUTO_INCREMENT PRIMARY KEY,
  street_number VARCHAR(10) NOT NULL,
  street_name VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country_id INT,
  FOREIGN KEY (country_id) REFERENCES country(country_id),
  customer_id INT,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE book (
  book_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  bookimage VARCHAR(50) NOT NULL,
  publication_date DATE NOT NULL,
  language_id INT NOT NULL,
  publisher_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  isbn VARCHAR(255) NOT NULL,
  FOREIGN KEY (language_id) REFERENCES book_language(language_id),
  FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
);

CREATE TABLE book_author (
  book_id INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY (book_id, author_id),
  FOREIGN KEY (book_id) REFERENCES book(book_id),
  FOREIGN KEY (author_id) REFERENCES author(author_id)
);

CREATE TABLE customer_order (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date DATE NOT NULL,
  shipping_method_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  FOREIGN KEY (shipping_method_id) REFERENCES shipping_method(shipping_method_id)
);

CREATE TABLE order_line (
  order_line_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  book_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES customer_order(order_id),
  FOREIGN KEY (book_id) REFERENCES book(book_id)
);

CREATE TABLE order_status (
  status_id INT AUTO_INCREMENT PRIMARY KEY,
  status_name VARCHAR(255) NOT NULL
);

CREATE TABLE order_history (
  history_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  status_id INT NOT NULL,
  update_date DATE NOT NULL,
  FOREIGN KEY (order_id) REFERENCES customer_order(order_id),
  FOREIGN KEY (status_id) REFERENCES order_status(status_id)
);

CREATE TABLE review (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  book_id INT NOT NULL,
  rating INT NOT NULL,
  review_text TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  FOREIGN KEY (book_id) REFERENCES book(book_id)
);

CREATE TABLE promotion (
promotion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
promotitle VARCHAR(50) NOT NULL,
promoimage VARCHAR(20) NOT NULL,
description VARCHAR(200) NOT NULL,
startdate DATE NOT NULL,
enddate DATE NOT NULL,
discountrate DECIMAL(5,2)
);

ALTER TABLE book ADD COLUMN homepage BOOLEAN NULL DEFAULT false;

insert into promotion(promotitle, promoimage, description, startdate, enddate, discountrate) values ('Promotion1', 'promo4.png', 'dvsadv', "2023-03-2", 
"2023-03-31", 0.21);

INSERT INTO order_status (status_name)
VALUES
('pending'),
('shipped'),
('delivered'),
('returned'),
('cancelled');


INSERT INTO customer (first_name, last_name, email, username, password)
VALUES
('John', 'Doe', 'johndoe@gmail.com', 'johndoe', 'password1'),
('Jane', 'Doe', 'janedoe@gmail.com', 'janedoe', 'password2'),
('Jim', 'Smith', 'jimsmith@gmail.com', 'jimsmith', 'password3'),
('Emily', 'Brown', 'emilybrown@gmail.com', 'emilybrown', 'password4'),
('Michael', 'Johnson', 'michaeljohnson@gmail.com', 'michaeljohnson', 'password5');

INSERT INTO country (country_name)
VALUES
('United States'),
('Canada'),
('Mexico'),
('Australia'),
('Germany');


INSERT INTO address (street_number, street_name, city, state, postal_code, country_id, customer_id)
VALUES
('123', 'Main St', 'New York', 'NY', '12345', 1, 1),
('456', 'Broadway', 'Los Angeles', 'CA', '67890', 2, 2),
('789', '5th Ave', 'Chicago', 'IL', '11111', 3, 3),
('246', 'Park Ave', 'Houston', 'TX', '22222', 4, 4),
('369', 'Maple St', 'Miami', 'FL', '33333', 5, 5);




INSERT INTO book_language (language_name)
VALUES
('English'),
('Spanish'),
('French'),
('German'),
('Italian');


INSERT INTO publisher (publisher_name)
VALUES
('Penguin'),
('HarperCollins'),
('Simon & Schuster'),
('Hachette'),
('Macmillan');


INSERT INTO author (first_name, last_name)
VALUES
('Stephen', 'King'),
('J.K.', 'Rowling'),
('John', 'Grisham'),
('Daniel', 'Steel'),
('James', 'Patterson');


INSERT INTO shipping_method (shipping_method_name)
VALUES
('Ground'),
('Express'),
('Overnight'),
('International'),
('Two-Day');

INSERT INTO book (title, bookimage,publication_date, language_id, publisher_id, price, isbn)
VALUES 
  ('Harry Potter and the Philosopher\'s Stone', 'potter.png','1997-06-26', 1, 1, 19.99, '9780747532743'),
  ('The Shining', 'shining.png','1977-01-28', 1, 2, 14.99, '9780450040179'),
  ('Pride and Prejudice', 'pride.png','1813-01-28', 1, 3, 9.99, '9780582506206'),
  ('Hamlet', 'hamlet.png','1603-01-01', 1, 4, 7.99, '9780743482896'),
  ('War and Peace', 'war.png','1869-01-01', 1, 5, 29.99, '9780140449174');

INSERT INTO book_author (book_id, author_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO customer_order (customer_id, order_date, shipping_method_id)
VALUES
(1, '2022-01-01', 1),
(2, '2022-02-01', 2),
(3, '2022-03-01', 3),
(4, '2022-04-01', 4),
(5, '2022-05-01', 5);

INSERT INTO order_line (order_id, book_id, quantity)
VALUES
(1, 1, 2),
(2, 2, 3),
(3, 3, 1),
(4, 4, 4),
(5, 5, 5);


INSERT INTO order_history (order_id, status_id, update_date)
VALUES
(1, 1, '2022-01-05'),
(2, 2, '2022-02-05'),
(3, 3, '2022-03-05'),
(4, 4, '2022-04-05'),
(5, 5, '2022-05-05');

INSERT INTO review (customer_id, book_id, rating, review_text)
VALUES
(1, 1, 5, 'Great book!'),
(2, 2, 4, 'Good read.'),
(3, 3, 3, 'Okay.'),
(4, 4, 2, 'Not my favorite.'),
(5, 5, 1, 'Did not like it.');
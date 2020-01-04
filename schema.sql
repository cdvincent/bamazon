DROP DATABASE IF EXISTS bamazondb;
CREATE DATABASE bamazondb;
USE bamazondb;

CREATE TABLE products(
    item_id INT(5) AUTO_INCREMENT,
    product_name VARCHAR(15) NOT NULL,
    department_name VARCHAR(15) NOT NULL,
    price DECIMAL(5,2),
    stock_quantity INT(3),
    PRIMARY KEY (item_id)
);
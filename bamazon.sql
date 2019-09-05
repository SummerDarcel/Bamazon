DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Living Dead Doll The Exorcist Regan", "Collectables", 99.00, 2),
("Halloween 1978 Movie Poster 27 x 40", "Home Decor", 18.98, 100),
("Hellraiser Collection Blu-ray" , "Movies/TV", 25.98, 200),
("Sandman 10 Volume Slipcase Set", "Books", 335.84, 1),
("Vintage Wine Estates Game of Thrones 3 Bottle Wine Set", "Wine", 65, 100),
("Pee Wee Herman T-Shirt", "Apparel", 26, 300),
("The John Wick Sixth Scale Collectible Figure","Collectables", 243, 3),
("Spaced: The Complete Series", "Movies/TV", 29.98, 100),
("Arwen Evenstar Pendant - Lord of The Rings", "Jewelry", 149, 20),
("3D Skull Ice Mold Silicone Tray", "Kitchen", 14.95, 70),
("Horror House Shower Curtain", "Home Decor", 19.95, 30),





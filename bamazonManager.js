var mysql = require("mysql2");
var inquirer = require("inquirer");
var Table = require("cli-table");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysqlworkbench",
    database: "bamazon_db"
});

function mGmT(cb) {
    connection.connect(function (err) {
        if (err) throw (err);
        console.log("\nBAMAZON!!! Manager View" )
        if (cb) {
            cb();
        }
    })
}
mGmT(start);

function start() {
    inquirer
        .prompt([
            {
                name: "mGmTopt",
                type: "list",
                message: "Please select Mangment Option",
                choices: ["View Products for Sale", "View Low Inventory", "Add Inventory", "Add New Product", "Exit"]
            }

        ]).then(function (answers) {
            switch (answers.mGmTopt) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;

                case "Exit":
                    endConnection();
                    break;

                default:
                    break;
            }
        })

    function viewProducts() {
        connection.query("SELECT * FROM products ORDER BY product_name ASC", function (err, results) {
            if (err) throw (err);

            console.log("\nBAMAZON!!! Manager View");
            console.log("\nRare and Wonderful");

            var table = new Table({ head: ["ID Number", "Product Name", "Price"] });

            for (var i = 0; results.length > i; i++) {

                var object = [results[i].item_id, results[i].product_name, results[i].price]
                table.push(object);
            }
            console.log(table.toString() + "\n");
            start();
        });
    };

    function lowInventory() {
        connection.query("SELECT * FROM products ORDER BY product_name ASC", function (err, results) {
            if (err) throw (err);
            console.log("\nLOW INVENTORY");

            var table = new Table({ head: ["ID Number", "Product Name", "Price", "Stock Quantity"] });

            for (var i = 0; results.length > i; i++) {
                if (results[i].stock_quantity < 5) {
                    var object = [results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity]
                    table.push(object);
                }
            }
            console.log(table.toString() + "\n");
            start();
        })
    }

    function addInventory() {
        connection.query("SELECT * FROM products ORDER BY product_name ASC", function (err, results) {
            if (err) throw (err);

            console.log("\nBAMAZON!!! Manager View");
            console.log("\nCheck out our items for Sale:");

            var table = new Table({ head: ["ID Number", "Product Name", "Price"] });

            for (var i = 0; results.length > i; i++) {

                var object = [results[i].item_id, results[i].product_name, results[i].price]
                table.push(object);

            }
            console.log(table.toString() + "\n");

            inquirer
                .prompt([
                    {
                        name: "selectItem",
                        type: "input",
                        message: "Which item would you like to add inventory to? (Select by ID number).",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            console.log("\nPlease select ID number.")
                            return false;
                        }
                    },
                    {
                        name: "quantity",
                        type: "input",
                        message: "How many items would you like to add?",
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            console.log("\nPlease input a number.")
                            return false;
                        }
                    }
                ]).then(function (answers) {

                    var id = answers.selectItem;
                    var amount = answers.quantity;

                    connection.query("SELECT * FROM products WHERE item_id = " + id, function (err) {
                        if (err) throw (err);

                        // var result = results[0];    
                        console.log("\nYour inventory has been updated." + "\n")
                        start();
                    })
                    updateInventory(id, amount);
                })
        })
    }

    function updateInventory(idAnswered, amountAnswered) {
        connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ? ", [amountAnswered, idAnswered], function (err) {
            if (err) throw (err);
        })
    }

    function newProduct() {
        inquirer
            .prompt([
                {
                    name: "itemName",
                    type: "input",
                    message: "Please enter the item name:"
                },
                {
                    name: "itemDept",
                    type: "list",
                    message: "Please add which department the item belongs in:",
                    choices: ["Collectables", "Home Decor", "Movies/TV", "Books", "Wine", "Apparel", "Home Decor", "Jewelry", "Kitchen"]
                },
                {
                    name: "itemPrice",
                    type: "input",
                    message: "Please enter the price of the item: $"
                },
                {
                    name: "itemQty",
                    type: "input",
                    message: "Please enter the quantity of the item on hand:"
                },

            ]).then(function (answers) {
                var name = answers.itemName;
                var dept = answers.itemDept;
                var price = answers.itemPrice;
                var quantity = answers.itemQty;

                connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ? )", [name, dept, price, quantity], function (err) {
                    if (err) throw (err);
                    console.log("\nYour product has been successfully added." + "\n")
                    start();
                })
            })
    }

    function endConnection() {
        connection.end();
    }
}


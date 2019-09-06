var mysql = require("mysql2");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysqlworkbench",
  database: "bamazon"
});

//Display all of the items available for sale

//Prompt users with two messages
//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.

//Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

//







const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazondb"
});

connection.connect(function(err) {
    if(err) throw err;
    showOptions();
});

function showOptions() {
    inquirer.prompt([
        {
            name: "choices",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            message: "Hello, manager. What would you like to do?"
        }
    ])
    .then(function(answer) {
        switch(answer.choices) {
            case "View Products for Sale": 
                console.log("-----------------------------------");
                listItems();
                break;

            case "View Low Inventory":
                console.log("-----------------------------------");
                lowInventory();
                break;

            case "Add to Inventory":
                console.log("-----------------------------------");
                addInventory();
                break;

            case "Add New Product":
                console.log("-----------------------------------");
                addProduct();
                break;

            default: process.exit(-1);
        }
    })
}

function listItems() {
    connection.query("SELECT * FROM products", function ( err, results) {
        if (err) throw err;
        console.log("ID" + " | " + "Item" + " | " + "Dept" + " | " + "Price" + " | " + "Quantity");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
          }
          console.log("-----------------------------------");
          showOptions();
        })
}

function lowInventory() {
    connection.query("SELECT * FROM products", function ( err, results) {
        if (err) throw err;
        console.log("ID" + " | " + "Item" + " | " + "Dept" + " | " + "Price" + " | " + "Quantity");
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
        }
    }
    console.log("-----------------------------------");
    showOptions();
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function ( err, results) {
        if (err) throw err;
        console.log("ID" + " | " + "Item" + " | " + "Dept" + " | " + "Price" + " | " + "Quantity");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
          }
          console.log("-----------------------------------");
    inquirer.prompt([
        {
            name: "choices",
            type: "list",
            choices: function() {
                var choicesArray = [];
                for (let i = 0; i < results.length; i++) {
                    choicesArray.push(results[i].product_name);
                }
                return choicesArray;
            },
            message: "What is the item you would like to increase inventory?"
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to add?"
        }
    ])
    .then(function(answer) {
        var chosenItem;
        for (let i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choices) {
                chosenItem = results[i];
            }
        }
        console.log("You have chosen to add: " + answer.amount + " " + chosenItem.product_name + "(s)");
            console.log("--------------------------------------------");
            if (answer.amount = "NaN"){
                console.log("Please enter an integer. Cancelling item request.");
                exit();
            } else {
            chosenItem.stock_quantity += parseInt(answer.amount);
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: chosenItem.stock_quantity
                },
                {
                    product_name: chosenItem.product_name
                }
            ],
            function(error) {
                if (error) throw err;
                console.log("Item stock has been updated");
                exit();
            })
        }
    })
})
}

function exit() {
    inquirer.prompt([
        {
            name: "exit",
            type: "confirm",
            message: "Would you like to select another item?",
            default: true
        },
    ])
    .then(function(answer) {
        if (answer.exit === true){
        addInventory();
        } else {
            showOptions();
        }
    });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the item you would like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "What department does the item belong in?"
        },
        {
            name: "price",
            type: "input",
            message: "How much does the item cost? (1.11 format)",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many of the item would you like to stock?"
        }
    ])
    .then(function(answer) {
        if (answer.price = "NaN"){
            console.log("Please enter an integer for the quantity field. Cancelling add item request.");
            exit();
        } else if (answer.quantity = "NaN") {
            console.log("Please enter an integer for the price field. Cancelling add item request.");
        }else {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.item,
                department_name: answer.department,
                price: parseFloat(answer.price),
                stock_quantity: parseInt(answer.quantity)
            },
            function(err) {
                if (err) throw err;
                    console.log("Your item was added successfully!");
                showOptions();
            }
        );
        }
})
}
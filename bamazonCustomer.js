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
    start();
});

function start() {
    grandTotal = 0;
    inquirer.prompt([
        {
            name: "start",
            type: "confirm",
            message: "Welcome to Bamazon! Are you ready to shop?",
            default: true
        },
    ])
    .then(function(answer) {
        if (answer.start === true){
        showList();
        } else {
            console.log("Okay, Bye!");
            process.exit(-1);
        }
    });
}

function showList() {
    connection.query("SELECT * FROM products", function ( err, results) {
        if (err) throw err;
        console.log("ID" + " | " + "Item" + " | " + "Dept" + " | " + "Price");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price);
          }
          console.log("-----------------------------------");
    inquirer.prompt([
        {
            name: "choices",
            type: "list",
            choices: function() {
                var choicesArray = [];
                for (let i = 0; i < results.length; i++) {
                    choicesArray.push(results[i].item_id);
                }
                return choicesArray;
            },
            message: "What is the item id of the item you would like to purchase?"
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to buy?(integer)"
        }
    ])
    .then(function(answer) {
        var chosenItem;
        for (let i = 0; i < results.length; i++) {
            if (results[i].item_id === answer.choices) {
                chosenItem = results[i];
            }
        }
        let amount = parseInt(answer.amount);
        console.log("You have chosen: " + amount + " " + chosenItem.product_name + "(s) | " + "$" + chosenItem.price + " each");
        if (amount === "NaN"){
            console.log("Please enter an integer. Cancelling item request.");
            exit();
        } else {
        if (chosenItem.stock_quantity <= 0) {
            console.log("I'm sorry, but that item is out of stock.");
            console.log("--------------------------------------------");
            exit();
        } else if (chosenItem.stock_quantity > 0 && chosenItem.stock_quantity < parseInt(answer.amount)) {
            console.log("I'm sorry, there's only " + chosenItem.stock_quantity + " in stock.");
            console.log("--------------------------------------------");
            exit();
        } else {
            chosenItem.stock_quantity -= answer.amount;
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: chosenItem.stock_quantity
                },
                {
                    item_id: chosenItem.item_id
                }
            ],
            function(error) {
                if (error) throw err;
                console.log("Your item(s) have been added to your cart.");
                console.log("Item stock has been updated.");
                total(chosenItem.price, answer.amount);
                console.log("--------------------------------------------");
                exit();
            })
        }
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
        showList();
        } else {
            total(0, 0);
            start();
        }
    });
}
// let grandTotal = 0;
function total(price, amount) {
    grandTotal += (amount * price);
    console.log("Your grand total is: " + grandTotal.toFixed(2));
}
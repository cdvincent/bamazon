# bamazon

<h2>Bamazon App</h2>

<p>Bamazon is a shopping experience via the command line. It is an application that allows users to view a list of products, select the product they need, the quantity of that product they want, and select more products or get the total that they owe for their selections. There is also a manager version allowing the user to view all products and how many of each there are, view a list of products that have a low quantity, add to the quantity of an item, and add a new item. The items are maintained via a SQL database which updates the quantities as they are purchased by customers or added by managers.</p><br>

<p>Navigate to the program in the terminal and type "npm i" to install the dependencies (mysql and inquirer).</p><br>

<p>The app uses the inquirer npm in order to let the user make selections. Type in node bamazonCustomer.js  and hit enter to start. You will be prompted with a confirm that asks if you are ready to start. The list of products will be listed, then followed by two prompts:<ul><li>What is the id of the item you would like to purchase?</li><li>How many would you like to buy?</li></ul></p><br>


<p>The item ID's will be listed by using an inquirer list. You may use the arrow keys to scroll through the product options. Hit enter on the products item ID that you would like to purchase. Next, you will be prompted with an inquirer input option. Type the number amount of the quantity of that item you would like to purchase.</p><br>

<p>If the user does not input an integer, there will be a message asking to enter an integer, and ask if they want to select another item (start over).</p><br>
<img src="images/userVal.png"><br>

<p>Here is an example of using the bamazonCustomer.js app: </p><br>
<img src="images/customer.png"><br>
<img src="images/sql.png"><br>
<p>The list is displayed and we select item ID 3, which is Cheese. We then typed 4 for the quantity, and the terminal shows me what product I chose, how many of that item I requested, and how much each item costs. The terminal shows us that the item has been added to the "cart", and that the stock is updated at the SQL database. The grand total is then shown at the bottom, and the user is asked if they would like to select another item. If the user chooses yes, they will again be prompted to select and item and quantity. Otherwise, the user will be shown the grand total and sent back to the main menu.</p><br>
<img src="images/customer2.png"><br>
<img src="images/sql2.png"><br>

<img src="images/customerStock.png"><br>
<p>If the user selects an item that there is not enough stock of, the terminal will let them know that the stock is too low, and show the available stock. It will then ask if the user would like to choose another item.</p><br>

<p>Here is an example of using the bamazonManager.js app: </p><br>
<img src="images/manager.png"><br>
<p>First we select the view products for sale option. The terminal displays all products with all of the SQL data, then asks for another prompt.</p><br>

<img src="images/manager2.png"><br>
<p>Next, we select the view low inventory option. It shows all products that have less than 5 items in stock.</p><br>

<img src="images/manager3.png"><br>
<p>Next, we select the add to inventory option. This allows us to add to an existing products quantity. Let's add some bread since it has low inventory.</p><br>

<img src="images/manager4.png"><br>
<img src="images/sql3.png"><br>
<p>Lastly, we select the add new product option. The app will give us prompts asking in order: what product you would like to add, which department you would like it to belong to, how much it costs, and the quantity of the item you would like to stock. The item is then added to the SQL database and available to be viewed in the app.</p><br>

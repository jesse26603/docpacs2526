const file_system = require("fs");

// List of every order
const all_orders = []; // Will be filled after data is read 

// Assign data as a string
const order_data = file_system.readFileSync("./data.csv").toString().replace("\r", "").split("\n"); // Remove \r and split by new line

// Fill all orders with order_data from data.csv
// Start at 1 to skip headers
for (let i = 1; i < order_data.length; i++) {
    // Split the order data and select the current index
    const order_data_row = order_data[i].split(","); // Name, Address, Item, Quantity, Price
    // If the last order's customer name is different from this order's customer name or the all orders list is empty 
    if (all_orders.length == 0 || all_orders[all_orders.length - 1].name != order_data_row[0]) {
        // Push a new order
        all_orders.push({
            name: order_data_row[0], // Customer name
            address: order_data_row[1],
            items: []
        });
    }
    // Push a new item to the last order's item list
    all_orders[all_orders.length - 1].items.push({
        name: order_data_row[2], // Name of item, not customer
        unit_quantity: order_data_row[3],
        unit_price: order_data_row[4]
    });
}

// For every order in all orders
for (const single_order of all_orders) {
    // Make sure the subtotal is reset every order
    let single_order_subtotal = 0;
    // Line to seperate different orders for visual clarity
    console.log("--------------------------------------------------------------------------------")
    // Use tabs to create a table in the console
    console.log(`Name\t\t\t${single_order.name}`);
    console.log(`Address\t\t\t${single_order.address}`);
    console.log(`Item\t\t\tQTY\t\t\tPrice\t\tTotal`); // Prepare the items section of the table
    // For every item in the order items list
    for (const single_item of single_order.items) {
        // Calculate the total of the single item
        const single_item_total = parseInt(single_item.unit_quantity) * parseFloat(single_item.unit_price.replace("$", ""));
        single_order_subtotal += single_item_total; // Add this total to the single order subtotal
        // Log the item to the console. Check length of item name to ensure proper spacing in table. Add extra tab if the name is too long
        console.log(`${single_item.name}\t${single_item.name.length > 15 ? "" : "\t"}${single_item.unit_quantity}\t\t\t${single_item.unit_price}\t\t$${single_item_total.toFixed(2)}`);
    }
    // Log the subtotal to the console. Fixed to 2 so the cent places show, even when they are 0
    console.log(`\t\t\t\t\t\tSubtotal\t$${single_order_subtotal.toFixed(2)}`);
    // Calculate sales tax, shipping, and grant total. Log them like subtotal
    const sales_tax = Math.ceil((single_order_subtotal * .06) * 100) / 100;
    console.log(`\t\t\t\t\t\tSales Tax\t$${sales_tax.toFixed(2)}`);
    const shipping = single_order_subtotal > 50 ? 0 : 10;
    console.log(`\t\t\t\t\t\tShipping\t$${shipping.toFixed(2)}`);
    const grand_total = single_order_subtotal + sales_tax + shipping;
    console.log(`\t\t\t\t\t\tGrand Total\t$${grand_total.toFixed(2)}`);
}
// Final line to seperate for visual clarity
console.log("--------------------------------------------------------------------------------")
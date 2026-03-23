const fs = require("fs");

const orders = [];

const data = fs.readFileSync("data.csv")
    .toString()
    .split("\n");

for (let i = 1; i < data.length; i++) {
    const line = data[i].replace("\r", "").split(",");
    if (orders.length == 0 || orders[orders.length - 1].name != line[0]) {
        orders.push({
            name: line[0],
            address: line[1],
            items: []
        });
    }
    orders[orders.length - 1].items.push({
        name: line[2],
        quantity: line[3],
        price: line[4]
    });
}

for (const order of orders) {
    let orderSubtotal = 0;
    console.log("--------------------------------------------------------------------------------")
    console.log(`Name\t\t\t${order.name}`);
    console.log(`Address\t\t\t${order.address}`);
    console.log(`Item\t\t\tQTY\t\t\tPrice\t\tTotal`);
    for (const item of order.items) {
        const itemTotal = parseInt(item.quantity) * parseFloat(item.price.replace("$", ""));
        orderSubtotal += itemTotal;
        console.log(`${item.name}\t${item.name.length > 15 ? "" : "\t"}${item.quantity}\t\t\t${item.price}\t\t$${itemTotal.toFixed(2)}`);
    }
    console.log(`\t\t\t\t\t\tSubtotal\t$${orderSubtotal.toFixed(2)}`);
    const salesTax = Math.ceil((orderSubtotal * .06) * 100) / 100;
    console.log(`\t\t\t\t\t\tSales Tax\t$${salesTax.toFixed(2)}`);
    const shipping = orderSubtotal > 50 ? 0 : 10;
    console.log(`\t\t\t\t\t\tShipping\t$${shipping.toFixed(2)}`);
    const grandTotal = orderSubtotal + salesTax + shipping;
    console.log(`\t\t\t\t\t\tGrand Total\t$${grandTotal.toFixed(2)}`);
}
console.log("--------------------------------------------------------------------------------")
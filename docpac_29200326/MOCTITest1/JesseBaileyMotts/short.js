const fs = require("fs");
const data = fs.readFileSync("data.csv").toString().replace("\r", "").split("\n")
let orderSubtotal = 0;
for (let i = 1; i < data.length; i++) {
    const line = data[i].split(",")
    if (line[0] != data[i - 1].split(",")[0]) {
        orderSubtotal = 0;
        console.log(`Name\t\t\t${line[0]}\nAddress\t\t\t${line[1]}\nItem\t\t\tQTY\t\t\tPrice\t\tTotal`);
    }
    orderSubtotal += parseInt(line[3]) * parseFloat(line[4].replace("$", ""))
    console.log(`${line[2]}\t${line[2].length > 15 ? "" : "\t"}${line[3]}\t\t\t${line[4]}\t\t$${(parseInt(line[3]) * parseFloat(line[4].replace("$", ""))).toFixed(2)}`);
    if (data[i + 1] == undefined || line[0] != data[i + 1].split(",")[0]) {
        const salesTax = Math.ceil((orderSubtotal * .06) * 100) / 100;
        const shipping = orderSubtotal > 50 ? 0 : 10;
        const grandTotal = orderSubtotal + salesTax + shipping;
        console.log(`\t\t\t\t\t\tSubtotal\t$${orderSubtotal.toFixed(2)}\n\t\t\t\t\t\tSales Tax\t$${salesTax.toFixed(2)}\n\t\t\t\t\t\tShipping\t$${shipping.toFixed(2)}\n\t\t\t\t\t\tGrand Total\t$${grandTotal.toFixed(2)}`);
    }
}
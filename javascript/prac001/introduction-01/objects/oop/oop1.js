// create object using function or object literal
function CoffeeShop(name) {
    this.name = name;
    this.printName = function() {
        console.log(`this is ${this.name}`)
    }
}

let shop1 = new CoffeeShop('PL');
let shop2 = new CoffeeShop('HL');
shop1.printName();
shop2.printName();

const ob1 = {
    name: "Coffee house",
    printName () {
        console.log(`this is ${this.name}`);
    }
};
ob1.printName()


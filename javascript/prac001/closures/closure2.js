// example1
function makeFunc() {
    const name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    return displayName;
}

const myFunc = makeFunc();
myFunc();

// explain: myFunc has reference to instance of displayName as makeFunc() is called ... Beside, myFunc
// also has the lexical env that contains variable name ... so when myFunc() is call, it knows the name 
// and print to console log


// example2
function makeAdder(x) {
    return function (y) {
        return x + y;
    };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
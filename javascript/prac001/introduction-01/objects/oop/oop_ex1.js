class Shape {

    name;
    sides;
    sideLength;

    constructor(name, sides, sideLength) {
        this.name = name;
        this.sides = sides;
        this.sideLength = sideLength;
    }

    calcPerimeter() {
        console.log(`The ${this.name}'s perimeter length is ${this.sides * this.sideLength}.`);
    }

}

const squareOb = new Shape('square', 4, 5);
squareOb.calcPerimeter();

const triangle = new Shape('triangle', 3, 3);
triangle.calcPerimeter();

class Square extends Shape {

    constructor(sideLength) {
        super('square', 4, sideLength);
    }

    calcArea() {
        console.log(`The ${this.name}'s area is ${this.sideLength * this.sideLength} squared.`);
    }

}

const square = new Square(4);

square.calcPerimeter();
square.calcArea();
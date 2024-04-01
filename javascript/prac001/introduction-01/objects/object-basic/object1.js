const cat = {
    name: 'Bertie',
    breed: 'Cut',
    color: 'white',
    greeting() {
        console.log('Meow!');
    }
}

let catName = cat["name"];
console.log(catName);

cat.greeting();
cat.color = 'black';
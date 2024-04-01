const cat = {
    name : 'Bertie',
    breed : 'Cymric',
    color : 'white',
    greeting: function() {
      console.log(`Hello, said ${ this.name } the ${ this.breed }.`);
    }
  }
  
  const cat2 = {
    name : 'Elfie',
    breed : 'Aphrodite Giant',
    color : 'ginger',
    greeting: function() {
      console.log(`Hello, said ${ this.name } the ${ this.breed }.`);
    }
  }
  
  cat.greeting();
  cat2.greeting();

  function CatObj(name, breed, color) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.greeting = function() {
      console.log(`Hello, said ${ this.name } the ${ this.breed }.`);
    }
  }
  
  const catOb1 = new CatObj('Bertie', 'Cymric', 'white');
  const catOb2 = new CatObj('Elfie', 'Aphrodite Giant', 'ginger');
  
  catOb1.greeting();
  catOb2.greeting();
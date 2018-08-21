class Animal {
    constructor(name = "Animal"){
        this.name = name;
    }

    getName(){
        return this.name;
    }
}

class Cat extends Animal {
    constructor(name = "Cat"){
        super(name);
    }
}

const cat = new Cat();

console.log(cat.getName()); // "Cat"
console.log(cat instanceof Cat); // true
console.log(cat instanceof Animal); // true
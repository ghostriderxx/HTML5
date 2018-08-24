class Parent{
    constructor(name = "Adam"){
        this.name = name;
    }

    say(){
        return this.name;
    }
}

class Child extends Parent{
    constructor(name){
        super(name);
    }
}

const child = new Child("Patrick");
console.log(child.name); // Patrick
console.log(child.say()); // Patrick
function Parent(name = "Adam"){
    this.name = name;
}
Parent.prototype.say = function () {
    return this.name;
};

function Child(){
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child = new Child();
console.log(child.name); // Adam
console.log(child.say()); // Adam

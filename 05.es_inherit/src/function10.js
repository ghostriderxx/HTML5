function Parent(name = "Adam"){
    this.name = name;
}
Parent.prototype.say = function () {
    return this.name;
};

function Child(name){
    Parent.call(this, name);
}
Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;

const child = new Child("Patrick");
console.log(child.name); // Patrick
console.log(child.say()); // Patrick
delete child.name;
console.log(child.say()); // undefined
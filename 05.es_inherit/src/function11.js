function Parent(name = "Adam"){
    this.name = name;
}
Parent.prototype.say = function () {
    return this.name;
};


function bridge(){}
bridge.prototype = Parent.prototype;


function Child(name){
    Parent.call(this, name);
}
Child.prototype = new bridge();
Child.prototype.constructor = Child;

const child = new Child("Patrick");
console.log(child.name); // Patrick
console.log(child.say()); // Patrick
function Person(name){
    this.name = name;
}
Person.prototype.myName = function () {
    return this.name;
};

const john = new Person("John");

Person.prototype = {};

console.log(john instanceof Person);
console.log(Person.prototype.isPrototypeOf(john));
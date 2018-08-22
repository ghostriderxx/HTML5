// Demo1
function Person(name){
    this.name = name;
}
Person.prototype.myName = function () {
    return this.name;
};

const john = new Person("John");

console.log(john.constructor === Person); // true
console.log(john.constructor.prototype === Person.prototype); // true

// Demo2
function Car(name){
    this.name = name;
}
Car.prototype = {
    myName: function () {
        return this.name;
    }
};

const benz = new Car("Benz");

console.log(benz.constructor === Car); // false
console.log(benz.constructor.prototype === Car.prototype); // false

console.log(benz.constructor === Object); // true
console.log(benz.constructor.prototype === Object.prototype); //true
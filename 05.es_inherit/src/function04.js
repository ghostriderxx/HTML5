function Person(name){
    this.name = name;
}
Person.prototype.myName = function () {
    return this.name;
};

const a = new Person("John");
const b = new Person("Mike");

console.log(a.myName()); // John
console.log(b.myName()); // Mike

console.log("name" in a); 
console.log("myName" in a); 
console.log(a.hasOwnProperty("name")); 
console.log(a.hasOwnProperty("myName"));
console.log(Person.prototype.hasOwnProperty("myName")); 
console.log(a.myName === b.myName); 

console.log(a.constructor === Person); 
console.log(a.constructor.prototype === Person.prototype); 

console.log(a.__proto__ === Person.prototype); 
console.log(Object.getPrototypeOf(a) === Person.prototype); 

console.log(a instanceof Person); 
console.log(Person.prototype.isPrototypeOf(a)); 


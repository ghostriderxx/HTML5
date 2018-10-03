var a = 42, b, c;

b = (a++, a);
c = a++, a;

console.log(b);
console.log(c);
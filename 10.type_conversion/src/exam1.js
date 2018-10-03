function add(...args) {

    let mem = [...args];

    const fn = function (...args) {
        return add(...[...mem, ...args]);
    };

    fn.valueOf = fn.toString = function () {
        return mem.reduce(function (a, b) {
            return a + b;
        });
    };

    return fn;
}

console.log(+add(1)(2));
console.log(+add(1, 2, 3)(10));
console.log(+add(1)(2)(3)(4)(5));
// undefined、null 都为 false
console.log(Boolean(undefined));
console.log(Boolean(null));

// boolean
console.log(Boolean(true));
console.log(Boolean(false));

// 只有 -0 +0 NaN 为 false
console.log(Boolean(-1));
console.log(Boolean(-0));
console.log(Boolean(+0));
console.log(Boolean(1));
console.log(Boolean(NaN));
console.log(Boolean(-Infinity));
console.log(Boolean(Infinity));

// 只有长度为 0 的字符串是 false
console.log(Boolean(""));
console.log(Boolean("false"));
console.log(Boolean("0"));
console.log(Boolean("''"));

// 所有对象都是 true
console.log(Boolean({}));
console.log(Boolean([]));
console.log(Boolean(function () {}));

// !!
const a = [0, "", null, {}, [], NaN, "false", new Boolean(false)];
const b = a.map(b => !!b);
console.log(b);
console.log(42 == "42");

// boolean 会先转为 number 再进行比较
console.log(42 == true); // 42 == true => 42 == 1

// 在 == 中，null 与 undefined 相等，
// 除此之外其他值都不和它们俩个相等；
const a = null;
let b;
console.log(a == b);
console.log(a == null);
console.log(b == null);
console.log(a == false);
console.log(b == false);
console.log(a == "");
console.log(b == "");
console.log(a == 0);
console.log(b == 0);

// String/Number 与 Object 相遇,
// Object 优先走 ToNumber 转为基本类型，
// 再继续比较
console.log(42 == [42]);

// 几个奇葩的例子
console.log([] == ![]); // [] == false => [] == 0 => "" == 0
console.log("0" == false); // "0" == 0
console.log([] == false); // [] == 0 => "" == 0

// 最后特别注意
const a1 = NaN;
const b1 = NaN;
console.log(a1 == b1); // NaN != NaN
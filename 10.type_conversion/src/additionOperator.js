const a = 123;
const b = a + ""; // 根据规则，"" 为字符串，进行字符串连接
console.log(b, typeof b);

const c = {
    toString() {return 42;},
    valueOf() {return 4;}
};
const d = c + ""; // c 将按照 toNumber 策略先尝试 valueOf 转基本类型，再转为字符串与 "" 连接；
console.log(d, typeof d);

const e = [1, 2]; // 数组的 valueOf 返回数组本身，进而会调用 toString() 得到 "1,2"
const f = [3, 4]; // 数组的 valueOf 返回数组本身，进而会调用 toString() 得到 "3,4"
const g = e + f;
console.log(g, typeof g);
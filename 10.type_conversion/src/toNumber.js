console.log(Number(true));
console.log(Number(false));

console.log(Number(null));
console.log(Number(undefined));

console.log(Number(""));
console.log(Number("123"));
console.log(Number("123.45"));
console.log(Number("456px"));
console.log(Number("0010"));
console.log(Number("0x10"));
console.log(Number("0o10"));
console.log(Number("0b1000"));
console.log(Number("1.07e3"));


const a = { // toString 与 valueOf 都返回基本数据类型
    toString() {
        return "666";
    },
    valueOf() {
        return "999";
    }
};
console.log(Number(a));

const b = { // 只有 toString 返回基本数据类型
    toString() {
        return "666";
    },
    valueOf() {
        return {};
    }
};
console.log(Number(b));

const c = { // toString 与 valueOf 都不返回基本数据类型
    toString() {
        return {};
    },
    valueOf() {
        return {};
    }
};
console.log(Number(c));


// an amazing example!
let t = 42;
const d = {
    valueOf() {
        return t++;
    }
};
if (d == 42 && t == 43) {
    console.log("Yep, this happened!");
}

// 显式强制类型转换
const e = +"42";
console.log(e, typeof e);
const f = - -"42";
console.log(f, typeof f);
console.log(parseInt("42"));
console.log(parseInt("42px")); // 解析到不是有效的数字字符为止
console.log(parseInt("0x10"));
console.log(parseInt(0.000008));  // !! parseInt(string, radix) !!
console.log(parseInt(0.0000008)); // !! 这几个例子都在提醒你，第一个参数应该是 string 类型
console.log(parseInt(false, 16)); // !! 如果不是...则自动强制转换为 string
console.log(parseInt(parseInt, 16));
console.log(parseInt(1/0, 19));


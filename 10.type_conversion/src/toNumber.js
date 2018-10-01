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


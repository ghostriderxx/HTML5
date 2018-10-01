console.log(String(undefined));
console.log(String(null));

console.log(String(true));
console.log(String(false));

console.log(String(-0));
console.log(String(+0));
console.log(String(3.14));
console.log(String(NaN));
console.log(String(Infinity));
console.log(String(Number.MAX_SAFE_INTEGER));
console.log(String(1.07 * Math.pow(1000, 7)));

console.log(String({a:1}));
console.log(String(function(){alert("webje2ee!")}));
console.log(String([1, 2, 3]));

const a = { // toString 与 valueOf 都返回基本数据类型
    toString(){
        return "toString()";
    },
    valueOf(){
        return "valueOf()";
    }
};
console.log(String(a));

const b = { // 只有 valueOf 返回基本数据类型
    toString(){
        return {};
    },
    valueOf(){
        return "valueOf()";
    }
};
console.log(String(b));

const c = { // toString 与 valueOf 都不返回基本数据类型
    toString(){
        return {};
    },
    valueOf(){
        return {};
    }
};
console.log(String(c));
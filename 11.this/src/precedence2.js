var object1 = {
    valueOf: function () {
        return 1;
    },
    toString: function () {
        return "object1";
    }
};

var object2 = {
    valueOf: function () {
        return 2;
    },
    toString: function () {
        return "object2";
    }
};

// 输出什么? 解释原因
console.log((object2 > object1 + --object1) + true);
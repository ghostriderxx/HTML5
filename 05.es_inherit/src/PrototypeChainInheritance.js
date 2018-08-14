// 动物类
function Animal(name = "Animal") {

    // 实例属性
    this.name = name;

    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}

// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};

////////////////////////////////////////////////////////////

// 猫类
function Cat() {
    this.name = "cat";
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
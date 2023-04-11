//Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
// console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

let add = function (a) {
    return function (b){
        return b? add(a+b):a;
    }
}

console.log(add(2)(5)(7)(1)(6)(5)(11)(12)(13)(14)(15)(16)(17)(18)(19)(20)());
console.log(add(2)(5)(7)(1)(6)(5)(11)());
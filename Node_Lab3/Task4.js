var cash = new Map();
function wrapper(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = JSON.stringify(args);
        if (cash.has(key)) {
            console.log(cash.get(key) + " from cash");
            return cash.get(key);
        }
        else {
            var result = fn.apply(void 0, args);
            cash.set(key, result);
            console.log(result + "new");
            return result;
        }
    };
}
function calc() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
}
var wrappedCalc = wrapper(calc);
console.log(wrappedCalc(2, 2, 3));
console.log(wrappedCalc(2, 5, 3));
console.log(wrappedCalc(2, 2, 3));

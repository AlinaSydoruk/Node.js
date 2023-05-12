var str = "Hello world!";
console.log(str);
var add = function (a) {
    function addTo(b) {
        return b ? (a = a + b, addTo) : a;
    }
    return addTo;
};
console.log(add(1)(2)(3)(4)(5)(6)(7)(8)(9)());

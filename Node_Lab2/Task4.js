const cash = new Map;
const wrapper = (...args) => {
    let sum = 0;
    if (!args.length) return 0;
    if (cash.size !== 0) {
        cash.forEach((value, key) => {
            if (JSON.stringify(value) ===JSON.stringify( args)) {
                console.log("from cash")
                return key
            }
        })
    }
    args.forEach((i) => sum += i)
    cash.set(sum, args)
    return sum;
};

console.log(wrapper(2, 2, 3));
console.log(wrapper(2, 6, 8));
console.log(wrapper(2, 2, 3));
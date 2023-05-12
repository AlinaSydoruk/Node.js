
let cash :  Map<string,number> = new Map();

function wrapper  (fn: (...args: number[]) => number) :((...args: number[]) => number)  {

    return function (...args :number[]):number {
            const key = JSON.stringify(args);

            if (cash.has(key)) {
                console.log(cash.get(key) + " from cash");
                return cash.get(key);
            } else {
                const result = fn(...args);
                cash.set(key, result);
                console.log(result + "new");
                return result;
            }
        };
}

function calc (...args: number[]) : number{
return args.reduce((accumulator:number , currentValue:number ) => accumulator+currentValue, 0)
}

const wrappedCalc =wrapper(calc)
console.log(wrappedCalc(2, 2, 3));
console.log(wrappedCalc(2, 5, 3));
console.log(wrappedCalc(2, 2, 3));


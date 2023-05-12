const str : string = "Hello world!"
console.log(str)

let add = function (a : number): Function{
function addTo (b?:number) : Function |number  {
    return b? (a= a+b ,addTo):a;
}
return addTo

};
console.log(add(1)(2)(3)(4)(5)(6)(7)(8)(9)()); //45
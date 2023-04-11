var object  = {
    a: "100000",
    b:{
        value :10

    },
    c:[1121,78,3,10],
    d:x=>x*5
}

function deepClone(obj){
    var clonedObject = {}
    for (i in obj) clonedObject[i] = typeof  obj[i] == 'object'?deepClone(obj[i]):obj[i]
    return clonedObject
}

var object2 = deepClone(object)
console.log(object);
console.log(object2);
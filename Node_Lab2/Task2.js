let string1 = "false";
let string2 = "false";
let mapString1 = new Map ;

function fillMap (string) {
    let mapString = new Map ;
    for (let i = 0; i < string.length; i++) {
        if (mapString.has(string[i])) {
            let variable = mapString.get(string[i]) + 1;
            mapString.set(string[i], variable)
        } else mapString.set(string[i], 1)
    }
    return mapString;
}

function isItAnagrams(string1, string2){
    let flag = true;
    if (string1.length === string2.length) {
        mapString1 = fillMap(string1);
        for (let i = 0; i < string2.length; i++){
            if(mapString1.has(string2[i])){
                let variable = mapString1.get(string2[i]) - 1;
                if (variable===0){
                    mapString1.delete(string2[i])
                }
            }else {
                flag = false;
                break
            }
        }
    } else flag = false;
    return flag


}
console.log(isItAnagrams(string1,string2));
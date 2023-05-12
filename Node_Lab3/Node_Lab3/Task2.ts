function isItAnagrams (string1 : string, string2 : string): boolean{
const sorted1 =string1.split('').sort().join('');
const sorted2 =string2.split('').sort().join('');
return sorted2===sorted1;
}
console.log(isItAnagrams("hello world!!!", "world help"));
console.log(isItAnagrams("hello world!!", "heorlllo wd!!"));
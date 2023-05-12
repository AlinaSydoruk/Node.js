function deepCopy(o) {
    return JSON.parse(JSON.stringify(o));
}
var user = {
    id: 1,
    email: "sydorukalina@gmail.com",
    description: {
        name: "Alina",
        surname: "Sydoruk",
        age: 18
    },
};
console.log(user === deepCopy(user));

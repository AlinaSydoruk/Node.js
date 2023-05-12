function deepCopy<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
}

interface User {
    readonly id: number
    email: string
    phone?: string
    description: {
        name: string
        surname: string
        age: number
    }
}
const user : User = {
    id: 1,
    email : "sydorukalina@gmail.com",
    description:{
        name: "Alina",
        surname: "Sydoruk",
        age: 18
    },
    }
console.log(user === deepCopy(user))

/*
2. Напишіть функцію, яка приймає будь-який тип масиву та правило для видалення елементів масиву. Функція змінює переданий масив, а усі видалені елементи функція повертає окремим масивом такого ж типу. Усі типи мають застосовуватися автоматично (функція шаблону). Приклад виклику:
    const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

IDE має розглядати змінні з прикладу так:
    item: number
deletedElements: Array
результат виклику:
    array = [1, 3, 7, 9]
deletedElements = [2, 6]
*/

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function changeArray<T> (array: T[], rule:(item:T)=>boolean) : T[]{
    const   deletedElem: T[]= []
            array.forEach((element, index) => {
                if (rule(element)) {
                    deletedElem.push(element);
                    array.splice(index, 1);
                }
            });
            return deletedElem
        }


console.log(changeArray(array, (item) => item % 2 === 0))
console.log(array)
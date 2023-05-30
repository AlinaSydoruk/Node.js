/*
1. Напишіть функцію, яка приймає будь-який тип масиву та
 асинхронний колбек, який викликається для кожного елемента
  масиву послідовно. Результатом виклику має бути масив результатів
   колбеку. Усі типи мають застосовуватися автоматично (функція шаблону).
   Приклад виклику:

    const array: Array<string> = ["one", "two", "three"];
const results = await runSequent(array, (item, index) =>
    Promise.resolve({
        item,
        index,
    })
);

IDE має розглядати змінні з прикладу так:
    item type = string
index type = number
results type = Array<{item: string, index: number}>*/


const array :Array<string> = ["one","two", "three"]

async function runSequent<T, R>(array: T[], callback: (item: T, index: number) => Promise<R>): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        const result = await callback(item, i);
        results.push(result);
    }

    return results;
}

async function example() {
    const results = await runSequent(array, (item, index) =>
        Promise.resolve({
            item,
            index,
        })
    );

    console.log(results);
}

example();
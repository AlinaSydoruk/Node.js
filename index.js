const {db} = require('./postgresDB/config/db')
const {createTables} = require('./postgresDB/creating/createTables')
const {task1, task2, task3, task4, task5, task6} = require('./postgresDB/queries')

db.connect();
createTables()
    .then(() => console.log('Tables created successfully.'))
    .catch(error => console.error('Error creating tables:', error));


for (let [index, task] of [task1, task2, task3, task4, task5, task6].entries()) {
    task()
        .then(data => console.log(`Query ${++index} result:`, data))
        .catch(error => console.error(`Error query ${++index}:`, error));
}
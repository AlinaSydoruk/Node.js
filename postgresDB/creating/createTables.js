
const fs = require('fs');
const path = require('path');
const {db} = require('../config/db')

async function runFileSql(filePath) {
    const sql = fs.readFileSync(filePath).toString();
    await db.query(sql);
}
async function dropIfExistsTables() {
    const tables = ['users', 'channels', 'videos', 'subscriptions', 'comments', 'likes'];
    for (const tableName of tables) {
        const query = `DROP TABLE IF EXISTS ${tableName};`;
        await db.query(query);
    }
}

const filepath = path.join(__dirname, 'sql');


async function createTables() {
    await dropIfExistsTables();

    await runFileSql(path.join(filepath, '0.schema.sql'));
    await runFileSql(path.join(filepath, '1.users.sql'));
    await runFileSql(path.join(filepath, '2.channels.sql'));
    await runFileSql(path.join(filepath, '3.videos.sql'));
    await runFileSql(path.join(filepath, '4.subscriptions.sql'));
    await runFileSql(path.join(filepath, '5.comments.sql'));
    await runFileSql(path.join(filepath, '6.likes.sql'));
}
module.exports = {
    createTables
};
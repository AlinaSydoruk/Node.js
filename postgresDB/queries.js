const {db} = require('./config/db')
/*
-- Список усіх користувачів із їхніми каналами з вказаними полями,
    -- відсортований за датою створення каналу (новіші вгорі): user id,
    -- user name, user avatar, channel photo, channel description, channel creation date.*/

async function task1() {
    const query = `  select user_id,
        name,
        avatar_url,
        photo_url,
        description,
        created_at
    from users JOIN channels c on users.id = c.user_id order by created_at ASC;`

    const result= await db.query(query)
    return result.rows;
}

/* -- Дані про 5 відео, які найбільше сподобалися.*/
async function task2() {
    const query =`
  
    select
        v.id ,
        v.title,
        v.description,
        v.preview_url,
        v.file_url,
        v.duration,
        v.published_at
         ,count(l.video_id)
    from videos v join likes l on v.id = l.video_id
    group by v.id
    order by count(l.video_id) DESC limit 5;
`
    const result= await db.query(query)
    return result.rows;
}

/*

--Список відео із такими полями: video id, video title, video preview, video duration,
    -- video publish date, взятий із підписок користувача Stephanie Bulger, упорядкований
-- за датою публікації (новіші вгорі).
*/

async function task3() {
    const query = ` select
     v.id,
     v.title,
     v.preview_url,
     v.duration,
     v.published_at
    from videos v join channels c on c.id = v.channel_id
    join subscriptions s on c.id = s.channel_id
    join users u on s.user_id = u.id
    where u.name = 'Stephanie Bulger'
    order by  v.published_at DESC;`

    const result= await db.query(query)
    return result.rows;
}
/*

--Дані каналу з ідентифікатором '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76' і кількість його підписників.
*/

async function task4() {
    const query = `  select
     c.id,
     c.description,
     c.photo_url,
     c.created_at,
    count(s.id)
    from channels c left join subscriptions s on c.id = s.channel_id

    where c.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76'
    group by (c.id, c.description,  c.photo_url, c.created_at);

`
    const result= await db.query(query)
    return result.rows;
}
/*

--5. Список із 10 найбільш оцінюваних відео (позитивні/негативні оцінки із тбл. likes),
-- починаючи з вересня 2021 року, серед тих відео, що мають понад 4 позитивні оцінки,
    -- відсортований за кількістю оцінок (найбільше угорі).
*/

async function task5() {
    const query =`select v.id,
           v.title,
           v.published_at,
           l.positive,
           count(l.positive)
    from videos v  join likes l on v.id = l.video_id
    where l.created_at >='2021-09-01' and l.positive = true
    group by (v.id, v.title, v.published_at, l.positive)
    having count(l.video_id)>4 order by count(l.positive) DESC limit 10;
`
    const result= await db.query(query)
    return result.rows;
}
/*


-- Список таких даних: channel (user) name, channel (user) avatar, channel photo,
    -- channel description, subscription level, subscription date, взятий з підписок
-- користувача Ennis Haestier, із сортуванням, по-перше, за рівнем підписки (порядок
-- рівнів підписки зверху вниз: vip, follower, fan, standard), і по-друге, за датою
-- підписки від новішої до старішої.

*/

async function task6() {
    const query =` select
        u.id,
        u.name,
        u.avatar_url,
    c.description,
    c.photo_url,
    s.level,
    s.subscribed_at
     from users u join channels c on u.id = c.user_id
    join   subscriptions s on c.id = s.channel_id
     join users subscriber on s.user_id = subscriber.id
     where u.name = 'Ennis Haestier'
    order by
        case
            s.level
            when  'vip' then 1
            when 'follower' then 2
            when 'fan' then 3
            else 4
    end,
        s.subscribed_at DESC


    `
    const result= await db.query(query)
    return result.rows;
}

module.exports ={
task1,
    task2,
    task3,
    task4,
    task5,
    task6
}
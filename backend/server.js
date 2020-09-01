var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        port: '',
        password: 'root',
        database: 'db'
    },
    debug: true
});

async function abc() {
    knex('users').then(result => {
        console.log(result);
    });
    let result = await knex('users');
    console.log(result);
};
abc();
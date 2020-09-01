
import connection from './connection'
const knex = require('knex')(connection);
const { getIo } = require('../soket_event.ts');


// knex.schema.createTable('flight_status', (table) => {
//     table.increments('id')
//     table.string('flight_status')
//     table.string('flight_time')
//     table.string('flight_cancel')
//     table.date('date')
//      table.updated_date('date')
// }).then(() => console.log("table created"))
// .catch((err) => { console.log(err); throw err })
// .finally(() => {
//     knex.destroy();
// });
// knex.schema.createTable('users', (table) => {
//     table.increments('id')
//     table.string('username')
//     table.string('password')
//     table.string('role')
//     table.date('date')
// }).then(() => console.log("table created"))
// .catch((err) => { console.log(err); throw err })
// .finally(() => {
//     knex.destroy();
// });


async function routes(fastify, opts, next) {
    // Get Weather Data
    fastify.get('/', async (req, res) => {
        knex.from('flight_status').select("*")
            .then((rows: any) => {
                res.status(200).send({ status: '200 Ok', message: rows });

            })
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
            });

    });

    fastify.post('/login', async (req, res) => {

        const username = req.body.username
        const password = req.body.password

        // Fetch data from DB
        knex.from('users').select("*").where('username', '=', username).where('password', '=', password)
            .then((rows: any) => {
                res.status(200).send({ status: '200 Ok', message: rows });
            })
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
            });


    });

    // Flight Update
    fastify.post('/:update', async (req, res) => {
        const io = getIo();

        var today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        knex('flight_status')
        .where('id', req.body.id)
        .update({
            flight_cancel: req.body.flight_cancel,
            flight_status: req.body.flight_status,
            flight_time: req.body.flight_time,
            updated_date : date
        })
        .then((rowss: any) => {
            knex.from('flight_status').select("*")
            .then((rows: any) => {
                console.log(rows);

                io.emit("recived_data", rows)

            })
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
            });
        })
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
        });


    });
}
module.exports = routes;
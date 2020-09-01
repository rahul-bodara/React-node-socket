
import connection from './connection'
const knex = require('knex')(connection);
const { getIo } = require('../soket_event.ts');


// knex.schema.createTable('flight_status', (table) => {
//     table.increments('id')
//     table.string('flight_status')
//     table.string('flight_time')
//     table.string('flight_cancel')
//     table.date('date')
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

    // Post WeatherData
    fastify.post('/update', async (req, res) => {


        const io = getIo();

        var today = new Date();
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date1 = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();


        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log(date);

        io.emit("recived_data", date)

        // Fetch data from DB
        // knex.from('weather').select("*").where('cityName', '=', cityName)
        //     .then((rows: any) => {
        //         res.status(200).send({ status: '200 Ok', message: rows });
        //     })
        //     .catch((err) => { console.log(err); throw err })
        //     .finally(() => {
        //     });

        // // Insert data in DB
        // knex('weather').insert(weatherData).then(() => console.log("data inserted"))
        //     .catch((err) => { console.log(err); throw err })
        //     .finally(() => {

        //     });
    });
}
module.exports = routes;
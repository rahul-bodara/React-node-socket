require('dotenv').config();

import fastify from 'fastify';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
const { intilize } = require('./soket_event.ts');

const app = fastify({ logger: false });

app.register(helmet);
app.register(cors);
app.register(require('fastify-rate-limit'), {
  max: +process.env.MAX_CONNECTION_PER_MINUTE || 1000,
  timeWindow: '1 minute'
});


app.register(require('./controllers/index'));


const start = async () => {
  const port = +process.env.PORT || 5000;
  try {
    const io = require('socket.io')(app.server);
    intilize(io)
    const address = await app.listen(port);
    console.log(`Server listening on ${address}`);

  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
require('dotenv').config();

const Hapi = require('@hapi/hapi')

var routes = require('./internalRoutes');

const app = new Hapi.Server({
    port: process.env.PORT, host: process.env.HOST,
    routes: { cors: false }
});

app.route(routes);

const init = async () => {
    await app.start();
    console.log(`Server running at: ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
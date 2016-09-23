import bootstrap from './bootstrap';

bootstrap((err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        const connection = server.select(['api']);
        const info = require('../package.json');

        server.log(['info', info.name], `started at: ${connection.info.uri}`);
    });
});

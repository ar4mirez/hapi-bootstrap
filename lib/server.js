'use strict';

const Bootstrap = require('./bootstrap');

Bootstrap((err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

        const info = require('../package.json');
        server.connections.map((connection) => {

            server.log(['info', info.name], `${connection.settings.labels} started at: ${connection.info.uri}`);
        });
    });
});

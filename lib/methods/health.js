'use strict';

const internals = module.exports = {};

internals.logAgent = {
    method: (data) => {

    // simulating save in database and returning saved data plus id
        data.id = '32871212j1b2voao1';

        return data;
    },
    options: {}
};

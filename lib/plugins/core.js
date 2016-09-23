import glob from 'glob';
import camelCase from 'camelcase';
import path from 'path';
import async from 'async';
import _ from 'lodash';

const internals = {};

internals.register = module.exports = (server, options, next) => {

    async.auto({
        methods: (callback) => {

            if (!options.methods) {
                return callback(null, false);
            }

            return internals.registerMethods(server, options.methods, callback);
        },
        preHandlers: (callback) => {

            if (!options.preHandlers) {
                return callback(null, false);
            }

            return internals.registerPreHandlers(server, options.preHandlers, callback);
        },
        handlers: (callback) => {

            if (!options.handlers) {
                return callback(null, false);
            }

            return internals.registerHandlers(server, options.handlers, callback);
        },
        routes: ['preHandlers', 'handlers', (data, callback) => {

            if (!options.routes) {
                return callback(null, false);
            }

            return internals.registerRoutes(server, options.routes, callback);
        }]
    }, (err, res) => {

        if (err) {
            return next(err);
        }

        server.log(['info', internals.register.attributes.pkg.name], 'core plugin loaded successfully.');

        return next();
    });
};

internals.register.attributes = {
    multi: false,
    pkg: require('../../package.json')
};

const loadFiles = (pattern, options) => {

    const files = glob.sync(pattern, options);

    return _.map(files, (file) => {

        const filePath = `${options.cwd}/${file}`;
        return filePath;
    });
};

internals.registerMethods = (server, options, callback) => {

    _.map(loadFiles(options.pattern, options.glob), (file) => {

        const methodName = camelCase(path.basename(file).replace(/.js/, ''));
        const methods = require(file);

        _.mapKeys(methods, (method, key) => {

            server.method(`${methodName}.${key}`, method.method, method.options || {});
        });

        server.log(['info', 'registerMethods'], `registered methods in file ${methodName}`);
    });

    return callback(null, true);
};

internals.registerPreHandlers = (server, options, callback) => {

    const pres = {};

    _.map(loadFiles(options.pattern, options.glob), (file) => {

        const preHandlerName = camelCase(path.basename(file).replace(/.js/, ''));
        const preHandlers = require(file);
        pres[preHandlerName] = {};

        _.mapKeys(preHandlers, (preHandler, key) => {

            pres[preHandlerName][key] = {
                method: preHandler,
                assign: key
            };
        });

        server.log(['info', 'registerPreHandlers'], `registered preHandlers in file ${preHandlerName}`);
    });

    server.decorate('server', 'preHandlers', pres);
    server.decorate('request', 'preHandlers', pres);

    return callback(null, true);
};

internals.registerHandlers = (server, options, callback) => {

    _.map(loadFiles(options.pattern, options.glob), (file) => {

        const handlerName = camelCase(path.basename(file).replace(/.js/, ''));
        const handlerFile = require(file);
        server.handler(handlerName, handlerFile);

        server.log(['info', 'registerHandlers'], `registered handler in file ${handlerName}`);
    });

    return callback(null, true);
};

internals.registerRoutes = (server, options, callback) => {

    _.map(loadFiles(options.pattern, options.glob), (file) => {

        const routeFileName = camelCase(path.basename(file).replace(/.js/, ''));
        const router = require(file);
        router(server);

        server.log(['info', 'registerRoutes'], `registered routes in file ${routeFileName}`);
    });

    return callback(null, true);
};

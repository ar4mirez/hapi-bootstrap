'use strict';

const Glue = require('glue');
const Confidence = require('confidence');
const Manifest = require('./manifest');

const criteria = {
    env: process.env.NODE_ENV
};

const store = new Confidence.Store(Manifest);

const composeOptions = {
    relativeTo: `${process.cwd()}/lib/plugins`
};

module.exports = Glue.compose.bind(Glue, store.get('/', criteria), composeOptions);

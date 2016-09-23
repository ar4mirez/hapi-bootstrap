const internals = module.exports = (route, options) => {

    return function (request, reply) {

        return internals[options.method](request, reply);
    };
};

internals.check = (request, reply) => {

    const healthService = request.server.methods.health;
    const agent = healthService.logAgent(request.pre.collectAgentInfo);

    return reply({
        ping: 'pong',
        name: 'health-service',
        agent
    });
};

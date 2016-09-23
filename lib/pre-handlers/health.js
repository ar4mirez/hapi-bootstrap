const internals = module.exports = {};

internals.collectAgentInfo = (request, reply) => {

    const agent = request.plugins.scooter.toJSON();
    const server = request.server;

    server.log(['info', 'preHandler', 'collecAgentInfo'], 'Extracting agent information.');

    return reply(null, agent);
};

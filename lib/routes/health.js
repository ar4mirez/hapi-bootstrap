module.exports = (server) => {

    server.route([
        {
            method: 'GET',
            path: '/health-check',
            config: {
                description: 'Health Check',
                notes: 'Verify if service is online.',
                tags: ['api'],
                pre: [
                    server.preHandlers.health.collectAgentInfo
                ],
                handler: { health: { method: 'check' } },
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            200: {
                                description: 'OK: service is online'
                            },
                            404: {
                                description: 'NOT_FOUND: service is not working properly.'
                            },
                            500: {
                                description: 'INTERNAL_SERVER_ERROR: application is complete down.'
                            }
                        }
                    }
                }
            }
        }
    ]);
};

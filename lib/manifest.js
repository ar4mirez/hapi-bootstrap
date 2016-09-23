export default {
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [
        {
            host: '127.0.0.1',
            port: 1337,
            labels: ['api']
        }
    ],
    registrations: [
        {
            plugin: {
                register: 'good',
                options: {
                    ops: {
                        interval: 5000
                    },
                    reporters: {
                        $filter: 'env',
                        $default: {
                            console: [
                                {
                                    module: 'good-squeeze',
                                    name: 'Squeeze',
                                    args: [{ log: '*', response: '*' }]
                                },
                                {
                                    module: 'good-console'
                                },
                                'stdout'
                            ]
                        },
                        production: {
                            file: [
                                {
                                    module: 'good-squeeze',
                                    name: 'Squeeze',
                                    args: [{ ops: '*' }]
                                },
                                {
                                    module: 'good-squeeze',
                                    name: 'SafeJson'
                                },
                                {
                                    module: 'good-file',
                                    args: [process.cwd() + '/logs/log.json']
                                }
                            ]
                        }
                    }
                }
            }
        },
    { plugin: 'inert' },
    { plugin: 'vision' },
    { plugin: 'hapi-swagger' },
    { plugin: 'blipp' },
    { plugin: 'scooter' },
        {
            plugin: {
                register: './core',
                options: {
                    routes: {
                        cwd: `${process.cwd()}/lib/routes`,
                        pattern: '**/*.js',
                        glob: {
                            cwd: `${process.cwd()}/lib/routes`
                        }
                    },
                    handlers: {
                        cwd: `${process.cwd()}/lib/handlers`,
                        pattern: '**/*.js',
                        glob: {
                            cwd: `${process.cwd()}/lib/handlers`
                        }
                    },
                    methods: {
                        pattern: '**/*.js',
                        glob: {
                            cwd: `${process.cwd()}/lib/methods`
                        }
                    },
                    preHandlers: {
                        cwd: `${process.cwd()}/lib/pre-handlers`,
                        pattern: '**/*.js',
                        glob: {
                            cwd: `${process.cwd()}/lib/pre-handlers`
                        }
                    }
                }
            }
        }
    ]
};

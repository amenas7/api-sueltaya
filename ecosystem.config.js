module.export = {
    apps: [{
        name: 'sueltaya-API',
        script: 'app.js',
        env_staging: {
            NODE_ENV: "production"
        },
    }],
};
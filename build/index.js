const merge = require('webpack-merge');

const common = require('./config/common');
const development = require('./config/development');
const production = require('./config/production');

const getConfig = (lifeCycle) => {
    switch (lifeCycle) {
        case 'start':
            console.log('Developing...');
            return merge.smart(development, common);

        case 'build':
            console.log('Creating production build...');
            return merge.smart(production, common);

        default:
            return merge.smart(production, common);
    }
};

const config = getConfig(process.env.npm_lifecycle_event);
module.exports = config;

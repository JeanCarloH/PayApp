const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    
    externals: [ 'aws-sdk', 'commonjs2 firebase-admin' ]
    
};
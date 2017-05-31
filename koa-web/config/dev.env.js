var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_ROOT: '"http://192.168.0.117:3000/api"',
    LOGIN_ROOT: '"http://192.168.0.117"'
})

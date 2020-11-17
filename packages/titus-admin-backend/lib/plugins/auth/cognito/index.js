'use strict'

const fp = require('fastify-plugin')

async function cognito(server, options) {
  server.register(require('./provider'), options.cognito)
}

module.exports = fp(cognito)
module.exports.autoload = false

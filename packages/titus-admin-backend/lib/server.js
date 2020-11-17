'use strict'

const path = require('path')

const autoLoad = require('fastify-autoload')
const fp = require('fastify-plugin')

const validateConfig = require('./pluginConfig')

async function plugin(fastify, config) {
  const options = validateConfig(config)

  fastify.register(autoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options
  })
}

module.exports = fp(plugin)

'use strict'

const envSchema = require('env-schema')
const S = require('fluent-schema')

const schema = S.object()
  .prop('provider', S.string().enum(['auth0', 'cognito']).required())
  .prop(
    'auth0',
    S.object()
      .prop('domain', S.string().required())
      .prop('clientId', S.string().required())
      .prop('clientSecret', S.string().required())
      .prop('connection', S.string().required())
  )
  .prop(
    'cognito',
    S.object()
      .prop('region', S.string().required())
      .prop('userPoolId', S.string().required())
  )
  .ifThenElse(
    S.object().prop('provider', S.const('auth0')),
    S.required(['auth0']),
    S.required(['cognito'])
  )

function validateConfig(data) {
  return envSchema({
    data,
    schema
  })
}

module.exports = validateConfig

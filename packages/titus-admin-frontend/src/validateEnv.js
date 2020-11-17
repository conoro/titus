'use strict'

const S = require('fluent-schema')

const schema = S.object().prop(
  'REACT_APP_API_PATH',
  S.string().minLength(1).required()
)

const validate = function () {
  require('env-schema')({
    schema,
    dotenv: true
  })
}

module.exports = {
  validate
}

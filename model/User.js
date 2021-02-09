const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'v_users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'username', 'password'],
      properties: {
        id: { type: 'integer' },
        firstName: { type: 'string', minLength: 3, maxLength: 50 },
        lastName: { type: 'string', minLength: 3, maxLength: 50 },
        email: { type: 'email' },
        username: { type: 'string', minLength: 3, maxLength: 50 },
        password: { type: 'string' },
      },
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}

module.exports = User;

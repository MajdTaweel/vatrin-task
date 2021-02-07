const config = require('config');

const db = config.get('db');

module.exports = {
  client: 'pg',
  connection: {
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.name,
  },
};

// module.exports = {
//   development: {
//     client: 'postgresql',
//     connection: {
//       database: 'postgres://vatrin:vatrin@localhost:5432/vatrin',
//     },
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'postgres://vatrin:vatrin@localhost:5432/vatrin',
//     },
//     // pool: {
//     //   min: 2,
//     //   max: 10,
//     // },
//   },
// };

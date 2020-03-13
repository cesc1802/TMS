const knex = require("knex");

const builder = knex({
    dialect: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    pool: { min: 0, max: 10 },
    debug: true
    // asyncStackTraces: true
});

module.exports = builder;

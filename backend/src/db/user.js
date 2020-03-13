const { queryBuilder } = require("./index");

const baseQuery = tableName => queryBuilder(tableName);

module.exports = () => baseQuery("users");

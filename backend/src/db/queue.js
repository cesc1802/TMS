const Queue = require("bull");

var dbQueue = new Queue("dbQueue", {
    redis: { port: 6379, host: "172.24.0.2" }
});

module.exports = dbQueue;

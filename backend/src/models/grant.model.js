const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

var grantSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    roleId: {
        type: Number,
        require: true,
        unique: true,
        ref: "Role"
    },
    subRoleId: {
        type: Number,
        unique: true,
        ref: "Role"
    },
    actions: {
        type: Array
    },
    createdAt: { type: Date, default: Date.now }
});

const Grant = mongoose.model("Grant", grantSchema);
autoIncrement.initialize(mongoose.connection);
grantSchema.plugin(autoIncrement.plugin, {
    model: "Grant",
    field: "id"
});

module.exports = {
    Grant
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

var roleSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    roleName: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { type: Date, default: Date.now }
});

const Role = mongoose.model("Role", roleSchema);
autoIncrement.initialize(mongoose.connection);
roleSchema.plugin(autoIncrement.plugin, {
    model: "Role",
    field: "id",
    startAt: 1,
    incrementBy: 1
});

module.exports = {
    Role
};

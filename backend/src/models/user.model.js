const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

var userSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: Number,
        ref: "Role"
    },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, { model: "User", field: "id" });

module.exports = {
    User
};

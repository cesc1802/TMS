const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

var resourceSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    resourceName: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { type: Date, default: Date.now }
});

const Resource = mongoose.model("Role", resourceSchema);
autoIncrement.initialize(mongoose.connection);
resourceSchema.plugin(autoIncrement.plugin, { model: "Resource", field: "id" });

module.exports = {
    Resource
};

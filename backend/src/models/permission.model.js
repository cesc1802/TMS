const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

var permissionSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    resourceId: {
        type: Number,
        ref: "Resource"
    },
    actions: {
        type: Array
    },
    createdAt: { type: Date, default: Date.now }
});

const Permission = mongoose.model("Permission", permissionSchema);
autoIncrement.initialize(mongoose.connection);
permissionSchema.plugin(autoIncrement.plugin, {
    model: "Permission",
    field: "id"
});

module.exports = {
    Permission
};

const actions = require("../db/queries");
const actionBaseQuery = require("../db/action");

async function getAll() {
    try {
        const applyGetAll = actions.getAll();
        const results = await applyGetAll(actionBaseQuery());
        return { actions: results };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll
};

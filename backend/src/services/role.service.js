const roles = require("../db/queries");
const roleBaseQuery = require("../db/role");

async function getAll() {
    try {
        const applyGetAll = roles.getAll();
        const results = await applyGetAll(roleBaseQuery());
        return { roles: results };
    } catch (error) {
        throw error;
    }
}

async function create({ rolename }) {
    const options = {
        field: "role_name",
        value: rolename
    };

    try {
        const applyFilterByName = roles.filterByName(options);
        const results = await applyFilterByName(roleBaseQuery());

        if (results.length > 0) {
            throw 'role name "' + rolename + '" is already taken';
        } else {
            const values = {
                role_name: rolename
            };
            const applyCreate = roles.create(values);
            const successed = await applyCreate(roleBaseQuery());

            if (successed > 0) {
                const roles = await getAll();
                return roles;
            }
        }
    } catch (error) {
        throw error;
    }
}

async function deleteById({ id }) {
    try {
        const applyDeleteById = roles.deleteById({ id });
        const numOfRowEffect = await applyDeleteById(roleBaseQuery());

        if (numOfRowEffect > 0) {
            const roles = await getAll();
            return roles;
        }
    } catch (error) {
        throw error;
    }
}

async function updateById({ id, rolename }) {
    const values = {
        role_name: rolename
    };
    try {
        const applyUpdateById = roles.updateById(id, values);
        const numOfRowEffect = await applyUpdateById(roleBaseQuery());
        if (numOfRowEffect > 0) {
            const roles = await getAll();
            return roles;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    create,
    deleteById,
    updateById
};

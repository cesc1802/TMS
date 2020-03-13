const query = require("../db/queries");
const permissionBaseQuery = require("../db/permission");
const actionBaseQuery = require("../db/action");
const resourceBaseQuery = require("../db/resource");

async function getAll() {
    try {
        const applyGetAll = query.getAll();
        const results = await applyGetAll(permissionBaseQuery());
        return { permissions: results };
    } catch (error) {
        throw error;
    }
}

async function create({ resource, action }) {
    try {
        const resourceId = await resourceBaseQuery()
            .select("id")
            .where("resource_name", resource);

        const actionId = await actionBaseQuery()
            .select("id")
            .where("action_name", action);

        console.log("resourceid, actionid", resourceId, actionId);
        const values = {
            resource,
            action,
            action_id: actionId[0].id,
            resource_id: resourceId[0].id
        };

        const applyCreate = query.create(values);
        const successed = await applyCreate(permissionBaseQuery());

        if (successed > 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                page_size: 4
            });
            return results;
        }
    } catch (err) {
        throw err;
    }
}

async function deleteById({ id }) {
    try {
        const numOfRowEffect = await permissionBaseQuery()
            .whereIn("id", id.split(","))
            .del();

        if (numOfRowEffect >= 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                page_size: 4
            });
            return results;
        }
    } catch (error) {
        throw error;
    }
}

async function updateById({ id, resource, action }) {
    const values = {
        resource,
        action
    };
    try {
        const applyUpdateById = query.updateById(id, values);
        const numOfRowEffect = await applyUpdateById(permissionBaseQuery());
        if (numOfRowEffect > 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                page_size: 4
            });
            return results;
        }
    } catch (error) {
        throw error;
    }
}

// SELECT * FROM tbl LIMIT 5,10;  # Retrieve rows 6-15
async function countTotalRecord() {
    try {
        const applyCount = query.countTotalRecord();
        const results = await applyCount(permissionBaseQuery());
        return results[0].TOTAL;
    } catch (err) {
        throw err;
    }
}

async function getRecordPerPage({ page, page_size }) {
    try {
        const applyRecordPerPageWithOrder = query.recordPerPageWithOrder({
            page,
            page_size,
            orderByColumn: "created_at"
        });
        const results = await applyRecordPerPageWithOrder(
            permissionBaseQuery()
        );

        return results;
    } catch (err) {
        throw err;
    }
}

async function countTotalAndGetRecordPerPage({ page, page_size }) {
    try {
        let permissionsPromise = getRecordPerPage({ page, page_size });
        let totalRecordPromise = countTotalRecord();

        const [permissions, totalRecord] = [
            await permissionsPromise,
            await totalRecordPromise
        ];
        return {
            permissions,
            totalRecord
        };
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAll,
    create,
    deleteById,
    updateById,
    countTotalRecord,
    getRecordPerPage,
    countTotalAndGetRecordPerPage
};

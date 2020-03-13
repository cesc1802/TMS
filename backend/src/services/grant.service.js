const query = require("../db/queries");
const grantBaseQuery = require("../db/grant");

async function getAll() {
    try {
        const applyGetAll = query.getAll();
        const results = await applyGetAll(grantBaseQuery());
        return results;
    } catch (error) {
        throw error;
    }
}

async function create({ roleId, permissionId }) {
    try {
        const values = {
            role_id: roleId,
            sub_role_id: roleId,
            permission_id: permissionId
        };

        const applyCreate = query.create(values);
        const successed = await applyCreate(grantBaseQuery());

        if (successed > 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                recordPerPage: 4
            });
            return results;
        }
    } catch (err) {
        throw err;
    }
}

async function deleteById({ id }) {
    try {
        const numOfRowEffect = await grantBaseQuery()
            .whereIn("id", id.split(","))
            .del();

        if (numOfRowEffect >= 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                recordPerPage: 4
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
        const numOfRowEffect = await applyUpdateById(grantBaseQuery());
        if (numOfRowEffect > 0) {
            const results = await countTotalAndGetRecordPerPage({
                page: 0,
                recordPerPage: 4
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
        const results = await applyCount(grantBaseQuery());
        return results[0].TOTAL;
    } catch (err) {
        throw err;
    }
}

async function getRecordPerPage({ page, recordPerPage }) {
    try {
        const applyRecordPerPage = query.recordPerPageWithJoin({
            page,
            recordPerPage
        });

        const results = await applyRecordPerPage(grantBaseQuery());

        return results;
    } catch (err) {
        throw err;
    }
}

async function countTotalAndGetRecordPerPage({ page, recordPerPage }) {
    try {
        const grants = await getRecordPerPage({ page, recordPerPage });
        const totalRecord = await countTotalRecord();

        return {
            grants,
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

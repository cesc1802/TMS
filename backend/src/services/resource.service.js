const resources = require("../db/queries");
const resourceBaseQuery = require("../db/resource");

async function getAll() {
    try {
        const applyGetAll = resources.getAll();
        const results = await applyGetAll(resourceBaseQuery());
        return { resources: results };
    } catch (error) {
        throw error;
    }
}

async function create({ resource, action }) {
    const values = {
        resource,
        action
    };

    try {
        const applyCreate = resources.create(values);
        const successed = await applyCreate(resourceBaseQuery());

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
        const applyDeleteById = resources.deleteById({ id });
        const numOfRowEffect = await applyDeleteById(resourceBaseQuery());

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

async function updateById({ id, resource, action }) {
    const values = {
        resource,
        action
    };
    try {
        const applyUpdateById = resources.updateById(id, values);
        const numOfRowEffect = await applyUpdateById(resourceBaseQuery());
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
        const applyCount = resources.countTotalRecord();
        const results = await applyCount(resourceBaseQuery());
        return results[0].TOTAL;
    } catch (err) {
        throw err;
    }
}

async function getRecordPerPage({ page, recordPerPage }) {
    try {
        const applyRecordPerPage = resources.recordPerPage({
            page,
            recordPerPage
        });

        const results = await applyRecordPerPage(resourceBaseQuery());

        return results;
    } catch (err) {
        throw err;
    }
}

async function countTotalAndGetRecordPerPage({ page, recordPerPage }) {
    try {
        const resources = await getRecordPerPage({ page, recordPerPage });
        const totalRecord = await countTotalRecord();

        return {
            resources,
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

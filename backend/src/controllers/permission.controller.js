const permissionService = require("../services/permission.service");

const getAll = (req, res) => {
    permissionService
        .getAll()
        .then(data => {
            return res.status(200).json({ status: "success", data });
        })
        .catch(error => {
            return res.status(400).json({ data: { message: error } });
        });
};

const create = (req, res) => {
    const { resource, action } = req.body;
    console.log(resource, action);
    permissionService
        .create({ resource, action })
        .then(data => {
            return res.status(200).json({ status: "success", data });
        })
        .catch(error => {
            return res.status(400).json({ data: { message: error } });
        });
};

const deleteById = (req, res) => {
    const { id } = req.params;
    permissionService
        .deleteById({ id })
        .then(data => {
            return res.status(200).json({ status: "success", data });
        })
        .catch(error => {
            return res.status(500).json({ status: "failure", error });
        });
};

const updateById = (req, res) => {
    const { id } = req.params;
    const { resource, action } = req.body;
    permissionService
        .updateById({ id, resource, action })
        .then(payload => {
            return res.status(200).json({ status: "success", payload });
        })
        .catch(error => {
            return res.status(400).json({ status: "failure", error });
        });
};

const countTotalAndGetRecordPerPage = (req, res) => {
    const { page, page_size } = req.params;

    permissionService
        .countTotalAndGetRecordPerPage({ page, page_size })
        .then(data => {
            return res.status(200).json({ status: "success", data });
        })
        .catch(err => {
            return res.status(400).json({ status: "failure", err });
        });
};

module.exports = {
    getAll,
    create,
    deleteById,
    updateById,
    countTotalAndGetRecordPerPage
};

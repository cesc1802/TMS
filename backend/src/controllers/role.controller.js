const roleService = require("../services/role.service");

const getAll = (req, res) => {
    roleService
        .getAll()
        .then(data => {
            return res.status(200).json({ status: "success", data });
        })
        .catch(error => {
            return res.status(500).json({ data: { message: error } });
        });
};

const create = (req, res) => {
    const { rolename } = req.body;
    roleService
        .create({ rolename })
        .then(roles => {
            return res.status(200).json({ status: "success", roles });
        })
        .catch(error => {
            return res.status(500).json({ data: { message: error } });
        });
};

const deleteById = (req, res) => {
    const { id } = req.params;
    roleService
        .deleteById({ id })
        .then(roles => {
            return res.status(200).json({ status: "success", roles });
        })
        .catch(error => {
            return res.status(500).json({ status: "failure", error });
        });
};

const updateById = (req, res) => {
    const { id } = req.params;
    const { rolename } = req.body;
    roleService
        .updateById({ id, rolename })
        .then(roles => {
            return res.status(200).json({ status: "success", roles });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ status: "success", error });
        });
};
module.exports = {
    getAll,
    create,
    deleteById,
    updateById
};

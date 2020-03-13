const userService = require("../services/user.service");

const getAll = (req, res) => {
    userService
        .getAll()
        .then(users => {
            return res.status(200).json({ status: "success", users });
        })
        .catch(error => {
            return res.status(500).json({ data: { message: error } });
        });
};

const register = (req, res) => {
    const { username, password, roleId } = req.body;
    // if (!username || !password)
    //     return res.status(400).json({
    //         message: "Username and password are required"
    //     });

    userService
        .register({ username, password, roleId })
        .then(data => {
            return res.status(200).json({ status: "success", data });
        })
        .catch(err => {
            return res.status(400).json({ data: { message: err } });
        });
};

const deleteById = (req, res) => {
    const { id } = req.params;
    userService
        .deleteById({ id })
        .then(data => {
            return res.status(200).json({ data });
        })
        .catch(error => {
            return res.status(500).json({ status: "failure", error });
        });
};

const updateById = (req, res) => {
    const { id } = req.params;
    const { username, password, role_id } = req.body;
    userService
        .updateById({ id, username, password, role_id })
        .then(users => {
            return res.status(200).json({ status: "success", users });
        })
        .catch(error => {
            return res.status(500).json({ status: "success", error });
        });
};

const countTotalAndGetRecordPerPage = (req, res) => {
    const { page, page_size } = req.params;
    userService
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
    register,
    deleteById,
    updateById,
    countTotalAndGetRecordPerPage
};

const actionService = require("../services/action.service");

const getAll = (req, res) => {
    actionService
        .getAll()
        .then(data => {
            return res.status(200).json({ status: "success", data });
        })
        .catch(error => {
            return res.status(500).json({ data: { message: error } });
        });
};

module.exports = {
    getAll
};

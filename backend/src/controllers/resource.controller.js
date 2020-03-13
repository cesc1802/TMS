const resourceService = require("../services/resource.service");

const getAll = (req, res) => {
    resourceService
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

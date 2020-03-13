const userService = require("../services/user.service");

const login = (req, res) => {
    const { username, password } = req.body;
    userService
        .login({ username, password })
        .then(token => {
            return res
                .status(201)
                .cookie("accessToken", token, {
                    expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
                    httpOnly: true
                })
                .json("ok");
        })
        .catch(error => {
            return res.status(401).json({ message: error });
        });
};

module.exports = {
    login
};

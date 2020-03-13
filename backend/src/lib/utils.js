const jwt = require("jsonwebtoken");

const genToken = ({ userId, roleId }) => {
    const token = jwt.sign(
        {
            id: userId,
            roleId: roleId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
    return token;
};

const verifyToken = (token, secret = process.env.JWT_SECRET) => {
    return jwt.verify(token, secret);
};

module.exports = {
    genToken,
    verifyToken
};

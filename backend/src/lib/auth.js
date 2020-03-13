const getRbac = require("../rbac/rbac");
const jwt = require("jsonwebtoken");

module.exports = config => {
    return (req, res, next) => {
        console.log("cookies cookies cookies cookies cookies", req.cookies);
        if (config.allowAnonymous) return next();

        const authorization = req.cookies.access_token;
        console.log(authorization);
        if (!authorization) {
            return res.status(401).json("token is invalid");
        }
        // const authorization = req.headers.authorization;
        // if (!authorization || !authorization.startsWith("Bearer")) {
        //     console.log("401 when token type are invalid");
        //     return res.status(401).send();
        // }

        const token = authorization.substring(7);
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            getRbac
                .can({
                    roleId: payload.roleId,
                    action: config.action,
                    resource: config.resource
                })
                .then(can => {
                    if (!can) {
                        return res.status(403).send({
                            status: "failure",
                            data: { error: "forbidden" }
                        });
                    }
                    // req.user = payload;
                    next();
                })
                .catch(err => {
                    res.status(401).send({
                        status: "failure",
                        data: { error: "unauthorize" }
                    });
                });
        } catch (error) {
            res.status(401).send({
                status: "failure",
                data: { error: error }
            });
        }
    };
};

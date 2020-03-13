const glob = require("glob");
const path = require("path");
const appRoot = require("app-root-path");

module.exports = app => {
    const files = glob.sync(
        path.normalize(appRoot + `/src/routes/**/*.routes.js`)
    );
    files.forEach(filePath => {
        let router = require(filePath);
        app.use("/api", router.getRouter());
    });
};

const resourceCtrl = require("../controllers/resource.controller");
const router = require("../lib/Api")({
    name: "resources",
    prefix: "/resources",
    option: {
        allowAnonymous: true
    }
});

router.get("/", resourceCtrl.getAll);

module.exports = router;

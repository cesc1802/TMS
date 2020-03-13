const actionCtrl = require("../controllers/action.controller");
const router = require("../lib/Api")({
    name: "actions",
    prefix: "/actions",
    option: {
        allowAnonymous: true
    }
});

router.get("/", actionCtrl.getAll);

module.exports = router;

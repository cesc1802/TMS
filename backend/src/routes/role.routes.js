const roleCtrl = require("../controllers/role.controller");
const router = require("../lib/Api")({
    name: "roles",
    prefix: "/roles",
    option: {
        allowAnonymous: true
    }
});

router.get("/", roleCtrl.getAll);
router.post("/", roleCtrl.create);
router.del("/:id", roleCtrl.deleteById);
router.put("/:id", roleCtrl.updateById);

module.exports = router;

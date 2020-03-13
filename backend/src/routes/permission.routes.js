const permissionCtrl = require("../controllers/permission.controller");
const router = require("../lib/Api")({
    name: "permissions",
    prefix: "/permissions",
    option: {
        allowAnonymous: true
    }
});

router.get("/", permissionCtrl.getAll);
router.post("/", permissionCtrl.create);
router.del("/:id", permissionCtrl.deleteById);
router.put("/:id", permissionCtrl.updateById);
router.get(
    "/search/page=:page&page_size=:page_size",
    permissionCtrl.countTotalAndGetRecordPerPage
);

module.exports = router;

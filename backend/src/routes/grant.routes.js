const grantCtrl = require("../controllers/grant.controller");
const router = require("../lib/Api")({
    name: "grants",
    prefix: "/grants",
    option: {
        allowAnonymous: true
    }
});

router.get("/", grantCtrl.getAll);
router.post("/", grantCtrl.create);
router.del("/:id", grantCtrl.deleteById);
router.put("/:id", grantCtrl.updateById);
router.get(
    "/search/page=:page&recordPerPage=:recordPerPage",
    grantCtrl.countTotalAndGetRecordPerPage
);

module.exports = router;

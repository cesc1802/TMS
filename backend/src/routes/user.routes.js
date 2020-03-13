const userCtrl = require("../controllers/user.controller");
const router = require("../lib/Api")({
    name: "users",
    prefix: "/users",
    option: {
        allowAnonymous: true
    }
});
router.get("/", userCtrl.getAll);
router.post("/", userCtrl.register);
router.del("/:id", userCtrl.deleteById);
router.put("/:id", userCtrl.updateById);
router.get(
    "/search/page=:page&page_size=:page_size",
    userCtrl.countTotalAndGetRecordPerPage
);
module.exports = router;

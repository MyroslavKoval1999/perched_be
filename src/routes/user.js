const router = require("express").Router();
const { userCtrl } = require("../controllers");
const { auth } = require("../middlewares");

router.get("/", auth, userCtrl.getUser);

module.exports = router;

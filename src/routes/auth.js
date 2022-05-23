const router = require("express").Router();
const { authCtrl } = require("../controllers");
const { validation, userExist, auth, refresh } = require("../middlewares");
const { authSchema } = require("../validators");


router.get("/refresh", refresh, authCtrl.refresh);



router.post(
  "/login/:publicAddress",
    validation(authSchema.loginSchema),
  userExist,
  authCtrl.login
);

router.get(
  "/:publicAddress",
  validation(authSchema.registerPublicAddressSchema),
  authCtrl.registerPublicAddress
);

module.exports = router;
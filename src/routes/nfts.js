const router = require("express").Router();

const { nftsCtrl } = require("../controllers");
const { auth } = require("../middlewares");

router.get("/bought", auth, nftsCtrl.getBoughtNfts);

router.get("/collection", auth, nftsCtrl.getCollection);
// router.get("/collection", nftsCtrl.getCollection);

router.get("/gallery", nftsCtrl.getNfts);

router.get("/types", nftsCtrl.getTypes);

module.exports = router;

const router = require("express").Router();

const { nftsCtrl } = require("../controllers");
const { auth } = require("../middlewares");

router.get("/bought", auth, nftsCtrl.getBoughtNfts);

router.get("/collection", auth, nftsCtrl.getCollection);

module.exports = router;

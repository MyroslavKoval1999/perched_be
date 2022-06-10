const router = require("express").Router();
const { OK } = require("../constants/statusCode");

// const { nftsCtrl } = require("../controllers");
const { auth } = require("../middlewares");
const eventController = require('../controllers/event/index');

router.post("/create", auth, eventController.create);

router.get("/", auth, eventController.getMany);

router.get('/:id', auth, eventController.getOne);

module.exports = router;

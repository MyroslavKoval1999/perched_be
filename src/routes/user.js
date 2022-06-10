const router = require("express").Router();
const userController = require('../controllers/user/index');
const { auth } = require("../middlewares");

router.post('/join-to-event', auth, userController.joinToEvent);

router.get("/", auth, userController.getUser);

module.exports = router;

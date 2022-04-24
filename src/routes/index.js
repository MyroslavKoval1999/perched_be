const apiRouter = require("express").Router();

const authRouter = require("./auth");
const userRouter = require("./user");

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);

module.exports.API = apiRouter;

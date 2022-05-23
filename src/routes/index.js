const apiRouter = require("express").Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const nftsRouter = require("./nfts");

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/nfts", nftsRouter);

module.exports.API = apiRouter;

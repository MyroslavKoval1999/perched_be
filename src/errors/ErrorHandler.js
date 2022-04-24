module.exports = (error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || error,
    error: error.error || "Internal Server Error",
  });
};

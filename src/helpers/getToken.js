module.exports = (req) => {
  const token = req.get("Authorization");
  if (token && token.toLowerCase().startsWith("bearer ")) {
    return token.slice(7);
  }
  return token;
};

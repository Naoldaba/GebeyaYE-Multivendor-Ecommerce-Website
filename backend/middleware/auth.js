const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send("You dont have Access");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("INVALID Token");
  }
}

module.exports = auth;

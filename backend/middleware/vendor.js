const jwt = require("jsonwebtoken");

function vendor(req, res, next) {
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send("You dont have Access");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role != "Vendor") {
      return res.status(401).send("Bad request");
    } else {
      next();
    }
  } catch (ex) {
    res.status(400).send("INVALID Token");
  }
}

module.exports = vendor;

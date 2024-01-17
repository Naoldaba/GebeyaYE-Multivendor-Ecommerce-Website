const jwt = require("jsonwebtoken");

function Premiumvendor(req, res, next) {
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).send("You dont have Access");
  }

  try {
    const decoded = jwt.verify(token, "jobman2008");
    console.log(decoded);

    if (!decoded.isPremium) {
      return res.status(401).send("you don't have Access");
    } else {
      next();
    }
  } catch (ex) {
    res.status(400).send("INVALID Token");
  }
}

module.exports = Premiumvendor;

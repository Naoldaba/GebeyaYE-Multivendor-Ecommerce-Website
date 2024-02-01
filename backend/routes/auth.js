const express = require("express");
const bcrypt = require("bcrypt");
const { User, UserValidater } = require("../models/User");
const router = express.Router();
const Joi = require("joi");
const upload = require("../middleware/Upload");

router.post("/", upload.none(), async (req, res) => {
  const { error } = UserValidater(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ username: req.body.name });
  if (!user) {
    return res.status(400).send("Invalid usename or password");
  }

  const isvalidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isvalidPassword) {
    return res.status(400).send("Invalid usename or password");
  }
  const token = user.generetAuthToken();
  res.status(200).send({ token });
});

function reqValidater(req) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(255),
    password: Joi.string().required().min(8).max(1024),
  });
  return schema.validate(req);
}

module.exports = router;

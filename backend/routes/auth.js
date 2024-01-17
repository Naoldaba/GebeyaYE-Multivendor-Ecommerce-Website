const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const router = express.Router();
const Joi = require("joi");
const upload = require("../middleware/Upload");

router.post("/", upload.none(), async (req, res) => {
  const { error } = reqValidater(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ username: req.body.name }); // frontend send name insted od username
  if (!user) {
    return res.status(400).send("Invalid usename or password");
  }

  // if (user.status == "pendding") {
  //   return res.status(400).send("You are in the pendding state");
  // }

  // if (user.payment == "pendding") {
  //   return res.status(400).send("The payment is in pending state");
  // }
  const isvalidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isvalidPassword) {
    return res.status(400).send("Invalid usename or password");
  }
  const token = user.generetAuthToken(); // we call the method in the user model on the instance of the model not exactly on the model
  res.status(200).send({ token });
});

function reqValidater(req) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(255), // name==username since front end is usning name
    password: Joi.string().required().min(8).max(1024),
  });
  return schema.validate(req);
}

module.exports = router;

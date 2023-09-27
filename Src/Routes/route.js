const express = require("express");
const router = express.Router();
const { createUsers } = require("../Controller/userController");

router.post("/users", createUsers);

module.exports = router;
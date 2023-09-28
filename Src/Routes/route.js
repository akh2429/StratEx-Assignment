const express = require("express");
const router = express.Router();
const { createUsers, getUsers, getUser, updateUser, deleteUser } = require("../Controller/userController");

router.post("/users", createUsers);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/tasks/:id", updateUser);
router.delete("/tasks/:id", deleteUser);

module.exports = router;
const router = require("express").Router();
const {
	createUser,
	getUser,
	getUsers,
	updateUser,
	deleteUser,
} = require("../controllers/user.controllers");

router
	.get("/", getUsers)
	.get("/:id", getUser)
	.post("/", createUser)
	.put("/:id", updateUser)
	.delete("/:id", deleteUser);

module.exports = router;

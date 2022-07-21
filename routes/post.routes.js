const router = require("express").Router();
const {
	createPost,
	getPosts,
	updatePost,
	deletePost,
} = require("../controllers/post.controllers");

router
	.get("/", getPosts)
	.post("/", createPost)
	.put("/:id", updatePost)
	.delete("/:id", deletePost);

module.exports = router;

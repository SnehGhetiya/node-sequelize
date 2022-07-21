const { User, Post } = require("../models");

const createPost = async (req, res, next) => {
	const { body, userId } = req?.body;

	try {
		const user = await User.findOne({ where: { uuid: userId } });
		const post = await Post.create({ body, userId: user.id });
		return res.status(201).json(post?.dataValues);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const getPosts = async (req, res, next) => {
	try {
		const post = await Post.findAll({ include: "user" });
		return res.status(201).json(post);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const updatePost = async (req, res, next) => {
	const { id } = req?.params;
	const { userId, ...rest } = req?.body;
	try {
		const user = await User.findOne({
			where: { uuid: userId },
		});
		await Post.update(
			{ ...rest, userId: user?.id },
			{
				where: { uuid: id },
			}
		);
		const updatedPost = await Post.findOne({ where: { uuid: id } });
		return res.status(200).json(updatedPost?.dataValues);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const deletePost = async (req, res, next) => {
	const { id } = req?.params;
	try {
		const post = await Post.findOne({ where: { uuid: id } });
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		await Post.destroy({ where: { uuid: id } });
		return res.status(200).json(post?.dataValues);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

module.exports = {
	createPost,
	getPosts,
	updatePost,
	deletePost,
};

const { User } = require("../models");

const createUser = async (req, res, next) => {
	const { name, email } = req?.body;

	try {
		const user = await User.create({ name, email });
		return res.status(201).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const getUsers = async (req, res, next) => {
	try {
		const users = await User.findAll({});
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const getUser = async (req, res, next) => {
	const { id } = req?.params;
	try {
		const user = await User.findOne({ where: { uuid: id } });
		res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const updateUser = async (req, res, next) => {
	const { id } = req?.params;
	try {
		await User.update({ ...req?.body }, { where: { uuid: id } });
		const user = await User.findOne({ where: { uuid: id } });
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

const deleteUser = async (req, res, next) => {
	const { id } = req?.params;
	try {
		const user = await User.findOne({ where: { uuid: id } });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		await User.destroy({ where: { uuid: id } });
		res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
};

module.exports = {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};

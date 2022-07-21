const { sequelize } = require("../models");

const connectToDB = async () => {
	try {
		await sequelize.authenticate();
	} catch (error) {
		console.log(error);
	}
};

module.exports = { connectToDB };

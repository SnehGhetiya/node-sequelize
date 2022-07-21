"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Post }) {
			// define association here
			this.hasMany(Post, { foreignKey: "userId" });
		}
		toJSON() {
			const values = super.toJSON();
			delete values.id;
			return values;
		}
	}
	User.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			tableName: "users",
			modelName: "User",
		}
	);
	return User;
};

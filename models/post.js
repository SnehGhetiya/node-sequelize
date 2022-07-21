"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User }) {
			// define association here
			this.belongsTo(User, { foreignKey: "userId", as: "user" });
		}
		toJSON() {
			const values = super.toJSON();
			delete values.id;
			delete values.userId;
			delete values.user.id;
			return values;
		}
	}
	Post.init(
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
			body: { type: DataTypes.STRING, allowNull: false },
		},
		{
			sequelize,
			tableName: "posts",
			modelName: "Post",
		}
	);
	return Post;
};

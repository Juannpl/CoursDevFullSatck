"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.belongsTo(models.Users, { foreignKey: "users_id" });
      models.Posts.hasMany(models.Comments, { foreignKey: "posts_id" });
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      pictures: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};

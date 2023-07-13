"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Posts, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });
      models.Users.hasMany(models.Comments, {
        foreignKey: "users_id",
        onDelete: "cascade",
      });
    }
  }
  Users.init(
    {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      is_admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};

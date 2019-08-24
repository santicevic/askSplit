"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      userImage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "uploads/defaultUser.png"
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: "userId" });
    User.hasMany(models.Reply, { foreignKey: "userId" });
    User.hasMany(models.PostVote, { foreignKey: "userId" });
    User.hasMany(models.ReplyVote, { foreignKey: "userId" });
  };
  return User;
};

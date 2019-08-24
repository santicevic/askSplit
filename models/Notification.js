"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      replyId: DataTypes.INTEGER,
      read: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      type: DataTypes.STRING
    },
    {}
  );
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Notification.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });
    Notification.belongsTo(models.Reply, {
      foreignKey: "replyId",
      onDelete: "CASCADE"
    });
  };
  return Notification;
};

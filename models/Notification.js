"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      replyId: DataTypes.INTEGER,
      type: DataTypes.STRING
    },
    {}
  );
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.User, { foreignKey: "userId" });
    Notification.belongsTo(models.Post, { foreignKey: "postId" });
    Notification.belongsTo(models.Reply, { foreignKey: "replyId" });
  };
  return Notification;
};

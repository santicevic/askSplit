"use strict";
const Role = require("../constants/roles");

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Hashed password: "password"
    const password =
      "$2b$09$YwqcM9ogJjiu5bys/TeR.OILfujbZXm4C.jiR1dmrJQ.QUoTdTdpS";

    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          username: "admin",
          email: "admin@gmail.com",
          password,
          role: Role.Admin,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          username: "mike23",
          email: "mike@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          username: "jude_12",
          email: "jude@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          username: "molly",
          email: "molly@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          username: "ivan",
          email: "ivan@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 6,
          username: "foxy",
          email: "foxy@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 7,
          username: "harry",
          email: "harry@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 8,
          username: "girly",
          email: "girly@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 9,
          username: "pete",
          email: "pete@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 10,
          username: "juke",
          email: "juke@gmail.com",
          password,
          role: Role.User,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};

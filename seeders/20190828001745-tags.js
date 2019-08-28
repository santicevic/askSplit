"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Tags", [
      {
        id: 1,
        name: "Nightlife",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Restaurants",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Accommodation",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { id: 4, name: "Travel", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: "Budget", createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tags", null, {});
  }
};

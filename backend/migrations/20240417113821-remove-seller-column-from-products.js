// migrations/<timestamp>-remove-seller-column-from-products.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'seller');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'seller', {
      type: Sequelize.STRING,
    });
  },
};

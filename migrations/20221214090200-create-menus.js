'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      // id_menu_type: {
      //   type: Sequelize.INTEGER.UNSIGNED,
      //   references:{
      //     model:'menu_types',
      //     key:'id'
      //   }
      // },
      starter: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      main_course: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      dessert: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      menu_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menus');
  }
};
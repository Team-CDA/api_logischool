'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('menus', [
      {
        starter: 'Salade d\'automne',
        main_course: 'Poulet rôti aux herbes',
        dessert: 'Tarte aux pommes',
        menu_date: '2023-10-16',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Velouté de potiron',
        main_course: 'Filet de saumon grillé',
        dessert: 'Crème brûlée',
        menu_date: '2023-10-17',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Carpaccio de betteraves',
        main_course: 'Risotto aux champignons',
        dessert: 'Moelleux au chocolat',
        menu_date: '2023-10-18',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Tartine de chèvre chaud',
        main_course: 'Entrecôte grillée',
        dessert: 'Panna cotta aux fruits rouges',
        menu_date: '2023-10-19',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Ceviche de crevettes',
        main_course: 'Pavé de boeuf sauce au poivre',
        dessert: 'Tiramisu',
        menu_date: '2023-10-20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Salade de quinoa',
        main_course: 'Poisson du jour en croûte',
        dessert: 'Mousse au citron vert',
        menu_date: '2023-10-23',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Millefeuille de légumes',
        main_course: 'Rôti de porc à la moutarde',
        dessert: 'Île flottante',
        menu_date: '2023-10-24',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Soupe à l\'oignon',
        main_course: 'Pâtes carbonara',
        dessert: 'Tartelette aux fruits',
        menu_date: '2023-10-25',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Salade niçoise',
        main_course: 'Magret de canard aux airelles',
        dessert: 'Fondant au caramel',
        menu_date: '2023-10-26',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        starter: 'Tartare de saumon',
        main_course: 'Steak frites',
        dessert: 'Crêpe Suzette',
        menu_date: '2023-10-27',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menus', null, {});
  }
};

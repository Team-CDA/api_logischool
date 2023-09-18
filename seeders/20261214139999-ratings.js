'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const appreciations = [
      'Luke a fait des progrès significatifs en orthographe.',
      'Les chiffres sont des amis, pas des ennemis.',
      'L\'Histoire est une science humaine qui permet de comprendre le présent. Luke est dans le futur.',
      'La géographie ne se cantone pas à l\'étude des plans de l\'étoile noire. Luke a encore des progrès à faire.',
      'Attention à ahuster sa force pour passer le ballon.',
      'Les grenouilles ne sont pas des aliens. Luke doit revoir ses classiques.',
      'Luke a tendance à confondre l\'anglais et le wookie.',
      'La chimie n\'est pas une science obscure.',
      'Les particules élémentaires ne sont pas des sabres lasers.'
    ];

    const reyAppreciations = [
      'Rey démontre une excellente maîtrise des concepts en orthographe.',
      'Rey a une intuition naturelle pour les chiffres et excelle en mathématiques.',
      'L\'enthousiasme de Rey pour l\'Histoire est contagieux; elle pose des questions approfondies et pertinentes.',
      'Rey a une compréhension impressionnante des régions géographiques et des cultures.',
      'Rey montre un engagement exceptionnel en éducation physique et démontre d\'excellentes compétences en équipe.',
      'Rey a une curiosité naturelle pour la biologie et montre un grand intérêt pour la faune et la flore.',
      'Rey communique avec aisance en anglais et montre une grande capacité d\'adaptation dans les discussions.',
      'Rey a réalisé des expériences fascinantes en chimie et démontre une compréhension profonde des réactions chimiques.',
      'Rey pose des questions approfondies en physique et démontre une passion pour les particules et la mécanique quantique.'
    ];
    

    const ratings = [];

    for (let i = 0; i < appreciations.length; i++) {
      ratings.push({
        id_student: 1,
        id_teacher: i + 1,
        id_subject: i + 1,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-12-31'),
        appreciation: appreciations[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 0; i < reyAppreciations.length; i++) {
      ratings.push({
        id_student: 2,  // Assuming Rey's id is 2
        id_teacher: i + 1,
        id_subject: i + 1,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-12-31'),
        appreciation: reyAppreciations[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('ratings', ratings);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ratings', null, {});
  },
};

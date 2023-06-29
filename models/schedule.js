module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('schedule', {
    // Définissez vos champs ici, ils doivent correspondre à ceux de votre vue
    users_id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
    },
    role_user: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER,  // Ajout de l'ID de la leçon
    lesson_date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    subject_name: DataTypes.STRING,
    classes_name: DataTypes.STRING,
    class_type: DataTypes.STRING,
    rooms_name: DataTypes.STRING,
    room_type: DataTypes.STRING,
    buildings_name: DataTypes.STRING,

    // etc.
  }, {
      timestamps: false,  
      freezeTableName: true,

  });

  return Schedule;
};

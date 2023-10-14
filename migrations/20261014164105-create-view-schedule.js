'use strict';

const viewName = 'schedule';
const viewQuery = `CREATE OR REPLACE VIEW ${viewName} AS 
SELECT 
-- USER
users.id AS users_id,
users.id_role AS role_user,
-- LESSON
lessons.id AS lesson_id,
lessons.lesson_datetime AS lesson_date,
-- timeslot
timeslots.slot_duration AS duration,
-- subject
subjects.subject_name AS subject_name,
-- classes
classes.id AS class_id,  -- Ajout de l'id de la classe
classes.name AS classes_name,
-- classtypes
class_types.class_type AS class_type,
-- rooms
rooms.name AS rooms_name,
-- rooms_type
room_types.room_type AS room_type,
-- building
buildings.name AS buildings_name
FROM lessons
RIGHT JOIN timeslots ON lessons.id_timeslot = timeslots.id
RIGHT JOIN users ON lessons.id_user = users.id
RIGHT JOIN subjects ON lessons.id_subject = subjects.id
JOIN classes ON lessons.id_class = classes.id
RIGHT JOIN class_types ON classes.id_class_type = class_types.id
RIGHT JOIN rooms ON lessons.id_room = rooms.id
RIGHT JOIN room_types ON rooms.id_room_type = room_types.id
RIGHT JOIN buildings ON rooms.id_building = buildings.id;
`;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(viewQuery);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP VIEW IF EXISTS ${viewName}`);
  }
};


'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const viewDefinition = `
            CREATE VIEW profClass AS 
            SELECT 
            users.id AS users_id,
            users.id_role AS role_user,
            users.firstname AS firstname_users,
            users.lastname AS lastname_users,
            users_subjects.id_user AS id_user_subject,
            users_subjects.id_subject AS id_subject,
            subjects.subject_name AS subject_name,
            users_classes.id_class AS id_class,
            users_classes.id_user AS id_user_classes,
            classes.name AS classes_name,
            classes.scolarity_year AS scolarity_year,
            classes.id_class_type AS id_class_type_classes,
            class_types.class_type AS class_type,
            professors_classes.id_professor AS id_professor,
            professors_classes.id_class AS id_class_professors_classes
            FROM users
            LEFT JOIN lessons ON users.id = lessons.id_user
            LEFT JOIN users_classes ON users.id = users_classes.id_user
            LEFT JOIN classes ON users_classes.id_class = classes.id
            LEFT JOIN class_types ON classes.id_class_type = class_types.id
            LEFT JOIN professors_classes ON users.id = professors_classes.id_professor
            LEFT JOIN users_subjects ON users.id = users_subjects.id_user
            LEFT JOIN subjects ON users_subjects.id_subject = subjects.id
    `;

        await queryInterface.sequelize.query(viewDefinition);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query('DROP VIEW IF EXISTS profClass');
    }
};

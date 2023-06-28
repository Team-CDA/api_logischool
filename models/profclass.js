module.exports = (sequelize, DataTypes) => {
    const ProfClass = sequelize.define('profclass', {
        // Définissez vos champs ici, ils doivent correspondre à ceux de votre vue
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role_user: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        firstname_users: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        lastname_users: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        id_user_subject: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_subject: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_subject: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subject_name: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        id_class: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_user_classes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_class: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        classes_name: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        scolarity_year: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        id_class_type_classes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_class_type_classes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        class_type: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    return ProfClass;
};

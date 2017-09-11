'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                username: {
                    type: Sequelize.STRING,
                    unique: true,
                    notNull: true,
                    notEmpyt: true
                },
                password: {
                    type: Sequelize.STRING,
                    notNull: true,
                    notEmpyt: true
                },
                email: {
                    type: Sequelize.STRING,
                    notNull: true,
                    notEmpyt: true
                },
                webcamscollectionsId: {
                    type: Sequelize.STRING,
                    notNull: true,
                    notEmpyt: true
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }

            }
        );
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('Users');
    }
};
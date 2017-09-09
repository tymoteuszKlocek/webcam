'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('WebcamsCollections',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                title: {
                    type: Sequelize.STRING
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
                UserId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'Users',
                        key: 'id'
                    }
                },
                ownerId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'Users',
                        key: 'id'
                    }
                }
            }
        )
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('WebcamsCollections')
    }
};
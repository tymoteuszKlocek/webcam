'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Webcams',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                },
                city: {
                    type: Sequelize.STRING
                },
                country: {
                    type: Sequelize.STRING
                },
                countryCode: {
                    type: Sequelize.STRING
                },
                views: {
                    type: Sequelize.INTEGER
                },
                lat: {
                    type: Sequelize.FLOAT
                },
                lng: {
                    type: Sequelize.FLOAT
                },
                position: {
                    type: Sequelize.STRING
                },
                thumbnail: {
                    type: Sequelize.STRING
                },
                type: {
                    type: Sequelize.STRING
                },
                title: {
                    type: Sequelize.STRING
                },
                link: {
                    type: Sequelize.STRING
                },
                webcamID: {
                    type: Sequelize.INTEGER
                },
                userID: {
                    type: Sequelize.INTEGER
                },
                collectionID: {
                    type: Sequelize.INTEGER
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                WebcamsCollectionId: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'WebcamsCollections',
                        key:'id'
                    },
                }

            }
        );
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('Webcams');
    }
};
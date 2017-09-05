'use strict';

module.exports = function (sequelize, DataTypes) {

    const WebcamsCollections = sequelize.define('WebcamsCollections', {
        title: DataTypes.STRING,
        userID: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                WebcamsCollections.hasMany(models.Webcams);
            }
        }
    });

    return WebcamsCollections;
};
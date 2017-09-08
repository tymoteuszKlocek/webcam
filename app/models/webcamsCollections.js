'use strict';

module.exports = function (sequelize, DataTypes) {

    const WebcamsCollections = sequelize.define('WebcamsCollections', {
        title: DataTypes.STRING
    });

    WebcamsCollections.associate = function (models) {
        WebcamsCollections.belongsTo(models.User, {as: 'owner'}), 
        WebcamsCollections.hasMany(models.Webcams, {as: 'webcam'});
    };

    return WebcamsCollections;
};
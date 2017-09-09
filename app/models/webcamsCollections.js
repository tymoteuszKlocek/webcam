'use strict';

module.exports = (sequelize, DataTypes) => {

    const WebcamsCollections = sequelize.define('WebcamsCollections', {
        title: DataTypes.STRING
    });

    WebcamsCollections.associate = (models) => {
        WebcamsCollections.belongsTo(models.User, { as: 'owner' }),
        WebcamsCollections.hasMany(models.Webcams, { as: 'webcam' });
    };

    return WebcamsCollections;
};
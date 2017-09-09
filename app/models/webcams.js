'use strict';

module.exports = (sequelize, DataTypes) => {

    const Webcams = sequelize.define('Webcams', {
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        countryCode: DataTypes.STRING,
        views: DataTypes.INTEGER,
        lat: DataTypes.FLOAT,
        lng: DataTypes.FLOAT,
        position: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        type: DataTypes.STRING,
        title: DataTypes.STRING,
        link: DataTypes.STRING,
        webcamID: DataTypes.INTEGER,
        userID: DataTypes.INTEGER,
        collectionID:DataTypes.INTEGER,
    });
    
    Webcams.associate = (models) => {
        Webcams.belongsTo(models.WebcamsCollections);
    };
 
    return Webcams;
};
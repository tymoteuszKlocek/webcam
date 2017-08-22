'use strict';

module.exports = function (sequelize, DataTypes) {
    
    var Webcams = sequelize.define('Webcams', {
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
    }, {
            classMethods: {
                associate: function (models) {
                    console.log(12121212)
                   Webcams.belongsToMany(models.WebcamsCollections);
                }
            }
        });
    return Webcams;
};
'use strict';
module.exports = function (sequelize, DataTypes) {
    var WebcamCollection = sequelize.define('WebcamCollection', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Webcams);
                }
            }

        });
    return WebcamCollection;
};
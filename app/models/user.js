'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        webcamscollectionsId: DataTypes.STRING
    }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.WebcamsCollections);
                }
            }
        });
    return User;
};
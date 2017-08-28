'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true },
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
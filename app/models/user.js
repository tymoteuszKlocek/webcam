'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, validate: {notNull: true, notEmpyt: true} },
        password: { type: DataTypes.STRING, validate: {notNull: true, notEmpyt: true} },
        email: { type: DataTypes.STRING, validate: {notNull: true, notEmpyt: true} },
        webcamscollectionsId: { type: DataTypes.STRING, validate: {notNull: true, notEmpyt: true} }
    }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.WebcamsCollections);
                }
            }
        });
    return User;
};
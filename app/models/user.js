'use strict';
const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, notNull: true, notEmpyt: true },
        password: { type: DataTypes.STRING,  notNull: true, notEmpyt: true },
        email: { type: DataTypes.STRING,  notNull: true, notEmpyt: true },
        webcamscollectionsId: { type: DataTypes.STRING, notNull: true, notEmpyt: true }
    }, {
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.WebcamsCollections);
                },
                // createPass: function(password, callback) {
                //     bcrypt.genSaltSync(10, function(err, salt) {
                //         bcrypt.hashSync(password, salt, function(err, hash) {
                //             password = hash;
                //             passwrod.save(callback);
                //         });
                //     });
                // }
            }
        });
    return User;
};


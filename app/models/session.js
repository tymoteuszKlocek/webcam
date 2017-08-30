'use strict';

module.exports = function (sequelize, DataTypes) {
    var Session = sequelize.define('Session', {
        userID: { type: DataTypes.STRING, notNull: true, notEmpyt: true },
        sessionID: { type: DataTypes.STRING, notNull: true, notEmpyt: true },
    }, {
            classMethods: {
                associate: function (models) {
                    //Session.belongsTo(models.userID);
                }
            }
        });
    return Session;
};
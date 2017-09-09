'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, notNull: true, notEmpyt: true },
        password: { type: DataTypes.STRING,  notNull: true, notEmpyt: true },
        email: { type: DataTypes.STRING,  notNull: true, notEmpyt: true },
        webcamscollectionsId: { type: DataTypes.STRING, notNull: true, notEmpyt: true }
    });
    
    User.associate = (models) => {
        User.hasMany(models.WebcamsCollections, {as: 'collection'});
    };

    return User;
};


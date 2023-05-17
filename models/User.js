const Sequelize = require('sequelize');

const sequelise = require('../util/database');
const User = sequelise.define('user',{
    id:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    email:{
        type:Sequelize.STRING,
        unique: true
    },
    number:{
        type:Sequelize.INTEGER,
        unique:true
    }
});

module.exports = User;

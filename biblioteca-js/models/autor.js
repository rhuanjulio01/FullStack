const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Autor = sequelize.define('Autor', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nacionalidade: DataTypes.STRING
});

module.exports = Autor;

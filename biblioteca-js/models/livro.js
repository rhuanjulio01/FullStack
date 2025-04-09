const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Autor = require('./autor');

const Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano: DataTypes.INTEGER
});

Livro.belongsTo(Autor);

module.exports = Livro;

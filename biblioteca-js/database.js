const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'biblioteca.sqlite'
});

module.exports = sequelize;

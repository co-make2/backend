const knex = require('knex');

const knexConfig = require('../knexfile.js');

const enviornment = process.env.DB_ENV || "development";

module.exports = knex(knexConfig[enviornment]);
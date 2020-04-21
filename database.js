const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('./config');
const host = config.mongodb[config.env];
mongoose.Promise = bluebird;
mongoose.connect(host, config.mongoose);

const db = mongoose.connection;

db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

module.exports = mongoose;
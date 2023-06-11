const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/placeyou-development');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error while connecting to db.."));
db.once('open', () => {
    console.log("Connected to DB..");
});

module.exports = db;
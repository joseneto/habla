const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const currentEnv = (process.env.NODE_ENV || 'development').trim();
const envUrl = {
    test: "mongodb://127.0.0.1:27017/habla_test",
    development: "mongodb://127.0.0.1:27017/habla"
}

mongoose.connect(envUrl[currentEnv], {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

module.exports = mongoose;
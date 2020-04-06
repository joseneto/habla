const autenticator = require('../middlewares/autenticator');

module.exports = (app) => {
    const {chat} = app.controllers;
    app.get('/chat', autenticator,chat.index);

};
const autenticator = require('../middlewares/autenticator');

module.exports = (app) => {
    const {contacts} = app.controllers;
    app.get('/contacts', autenticator, contacts.index);
    app.get('/contact/:id', autenticator, contacts.show);
    app.post('/contact', autenticator, contacts.create);
    app.get('/contact/:id/edit', autenticator, contacts.edit);
    app.put('/contact/:id', autenticator, contacts.update);
    app.delete('/contact/:id', autenticator, contacts.destroy);
 
};
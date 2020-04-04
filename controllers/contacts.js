module.exports = (app) => {
    const ContactsController = {
        index: function (req, res){
            const {user} = req.session;
            const {contacts} = user;
            res.render('contacts/index', {user, contacts});
        },
        create: function(req, res){
            const {contact} = req.body;
            const {user} = req.session;
            user.contacts.push(contact);
            res.redirect('/contacts');
        },
        show: function (req, res){
            const {id} = req.params;
            const {user} = req.session;
            const contact = user.contacts[id];
            res.render('contacts/show', {id, contact, user});

        },
        edit: function(req, res){
            const {id} = req.params;
            const {user} = req.session;
            const contact = user.contacts[id];
            res.render('contacts/edit', {id, contact, user});
        },
        update: function(req, res){
            const {contact} = req.body;
            const {user} = req.session;
            user.contacts[req.params.id] = contact;
            res.redirect('/contacts');
        },
        destroy: function(req, res){
            const {id} = req.params;
            const {user} = req.session;
            user.contacts.splice(id, 1);
            res.redirect('/contacts');
        }
    };

    return ContactsController;
}
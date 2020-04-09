
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (app) => {

    const User = app.models.user;

    const ContactsController = {
        index: function (req, res){
            const {_id} = req.session.user;
            User.findById(_id)
                .then((user) => {
                    const {contacts} = user;
                    res.render('contacts/index', {user, contacts});
                }).catch(() =>  res.redirect('/'));
           
           
        },
        create: function(req, res){
            const {contact} = req.body;
            const {_id} = req.session.user;
            const set = {$push: {contacts: contact}};
            User.findByIdAndUpdate(_id, set)
                .then((user) => {
                    res.redirect('/contacts');
                }).catch(() =>  res.redirect('/'));
           
        },
        show: function (req, res){
            const {_id} = req.session.user;
            const contactId = req.params.id;
            User.findById(_id)
                .then((user) => {
                    const {contacts} = user;
                    const contact = contacts.find((ct) => {
                        return ct._id.toString() === contactId;
                    })

                    res.render('contacts/show', {contact, user});
                }).catch(() =>  res.redirect('/'));

        },
        edit: function(req, res){
            const {_id} = req.session.user;
            const contactId = req.params.id;
            User.findById(_id)
                .then((user) => {
                    const {concatcs} = user;
                    const contact = contacts.find((ct) => {
                        return ct._id.toString() === contactId;
                    })

                    res.render('contacts/edit', {contact, user});
                }).catch(() =>  res.redirect('/'));
        },
        update: function(req, res){
            const contactId = req.params.id;
            const {contact} = req.body;
            const {user} = req.session;
            const where = {_id: user._id, 'contacts._id': contactId };
            const set = { $set: {'contacts.$': contact}};
            
            User.update(where, set)
                .then(() => {
                  res.redirect('/contacts');
                }).catch(() =>  res.redirect('/'));
        },
        destroy: function(req, res){
            const contactId = req.params.id;
            const {_id} = req.session.user;
            const where = {_id};
            const set = {$pull: 
                { contacts: {_id: ObjectId(contactId)  }}
            };
            User.updateOne(where, set)
                .then(() => {
                    res.redirect('/contacts');
                }).catch(() =>  res.redirect('/'));          
        }
    };

    return ContactsController;
}
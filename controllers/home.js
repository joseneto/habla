module.exports = (app) => {
    
    const User = app.models.user;

    const HomeController = {
        index: function(req, res) {            
            res.render('home/index');
        },
        login: function(req, res){
            
            const {user} = req.body;
            const {name, email} = user;
            const where = {name, email};
            const set = {
                $setOnInsert: {name, email, contacts: []}
            };
            const options = {
                upsert: true, runValidators: true, new: true
            };

            User.findOneAndUpdate(where, set, options)
                .select('name email')
                .then((user) => {
                    req.session.user = user;
                    res.redirect('/contacts');
                }).catch(() =>{
                    res.redirect('/');
                })

        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/');
        }
    };

    return HomeController;
};
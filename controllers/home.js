module.exports = (app) => {
    const HomeController = {
        index: function(req, res) {            
            res.render('home/index');
        },
        login: function(req, res){
            
            const {user} = req.body;
            const {name, email} = user;

            if(name && email){
                user.contacts = [];
                req.session.user = user;
                res.redirect('/contacts');
            }else{
                res.redirect('/');
            }
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/');
        }
    };

    return HomeController;
};
const crypto = require('crypto');

module.exports = (app) => {
    const ChatController = {
        index: function(req, res) {
            const {room} = req.query;
            const {user} = req.session;

            let roomHash = room;
            if(!roomHash){
                const timestamp = Date.now().toString();
                const md5 = crypto.createHash('md5');
                roomHash = md5.update(timestamp).digest('hex');
            }
            res.render('chat/index', {user, room: roomHash});
        }
    }

    return ChatController;
}
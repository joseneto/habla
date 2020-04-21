const config = require('../config');
const redis = require('redis').createClient(config.redis);

module.exports = (app, io) => {
    
    let defaultMessage =  {id: -1, name: "user", text: "disconnect" ,time: new Date(), avatar: "", position:"left"};
    io.on('connection', (client) => {

        const { session } =	client.handshake;
        const { user } = session;

        redis.sadd('onlines', user._id, () => {
            redis.smembers('onlines',(err, ids) => {
                ids.forEach((id) => {
                    client.emit('notify-onlines', id);
                    client.broadcast.emit('notify-onlines',	id);
                });
            })
        });

        client.on('send-server', (room, data) => {
          const response = data;
          const newMessage = {name: user.name, room: room};
          session.room = room;
          
          redis.lpush(room, JSON.stringify(response));
          client.broadcast.emit('new-message', newMessage);
          io.to(room).emit('send-client', response);
         
        });

        client.on('create-room', (data) => {
            const randomId = Math.random();
            session.room = data;
            client.join(data);
            defaultMessage.id= randomId;    
            defaultMessage.text='User enter the chat';
            defaultMessage.name=user.name;
            redis.lpush(data, JSON.stringify(defaultMessage), () => {
                redis.lrange(data, 0, -1, (err, msgs) => {
                    msgs.forEach((msg) => {
                        io.to(data).emit('send-client', JSON.parse(msg));
                    });
                });
            });

        });

        client.on('disconnect', () => {
            const randomId = Math.random();
            const {room} = session;
          
            defaultMessage.id= randomId;  
            redis.lpush(room, defaultMessage, () => {
                session.room = null;
                redis.srem('onlines', user._id);
                client.broadcast.emit('notify-offlines', user.name);
                io.to(room).emit('send-client', defaultMessage);
                client.leave(room);
            });
          
        });

    }); 
}

  
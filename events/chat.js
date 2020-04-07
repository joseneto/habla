module.exports = (app, io) => {
    const onlines = [];
    let disconnectMessage =  {id: -1, name: "user", text: "disconnect" ,time: new Date(), avatar: "", position:"left"};
    io.on('connection', (client) => {

        const { session } =	client.handshake;
        const { user } = session;

        onlines[user.name] = user.name;

        for(let name in onlines){
            client.emit('notify-onlines', name);
            client.broadcast.emit('notify-onlines', name);
        }

        client.on('send-server', (room, data) => {
          const response = data;
          const newMessage = {name: data.name, room: room};
          session.room = room;
          
          client.broadcast.emit('new-message', newMessage);
          io.to(room).emit('send-client', response);
         
        });

        client.on('create-room', (data) => {
        
            session.room = data;
            client.join(data);
        });

        client.on('disconnect', () => {
            const {room} = session;
            delete onlines[user.name];
            session.room = null;
            
            client.broadcast.emit('notify-offlines', user.name);
            io.to(room).emit('send-client', disconnectMessage);
            client.leave(room);
        });

    }); 
}

  
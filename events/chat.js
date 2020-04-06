module.exports = (app, io) => {
    io.on('connection', (client) => {

        const { session } =	client.handshake;
        const { user } = session;

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
        
            session.room = null;
            client.leave(room);
        });

    }); 
}

  
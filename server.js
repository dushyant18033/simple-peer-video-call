var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendFile('index.html',{ root: __dirname });
});


const users = {};

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

   if (!users[socket.id]) {
      users[socket.id] = socket.id;
      socket.emit('ID',socket.id);
   }

   socket.on("callUser", (data) => {
      io.to(data.to_ID).emit('callOffer', {offer_data: data.offer_data, from_ID: data.from_ID, to_ID: data.to_ID});
      console.log(data);
  });

  socket.on('AcceptOffer', (data) => {
     console.log(data);
     io.to(data.from_ID).emit('callAnswered', {accept_data: data.accept_data});
  });
   

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});
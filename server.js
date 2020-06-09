var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/begin', function(req, res) {
   res.sendFile('instructor.html',{ root: __dirname });
});

app.get('/join', function(req, res) {
   res.sendFile('student.html',{ root: __dirname });
});


// res.sendFile(path.join(__dirname, '../public', 'index1.html'));
// res.sendFile('index1.html', { root: path.join(__dirname, '../public') });

const instructors = {};
const students = {};
list_students = [];


app.get('/', function(req, res) {
   let response = {'students':students, 'instructors':instructors}
   res.send(response);
});


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

   socket.on('student',(data) => {
      students[socket.id] = socket.id;
      socket.emit('ID',socket.id);
      list_students.push(socket.id);
   });

   socket.on('instructor',(data) => {
      instructors[socket.id] = socket.id;
      socket.emit('ID',socket.id);

      socket.on('getStudents',(data)=>{
         console.log('getList');
         socket.emit('studentsList', {'list_students':list_students});
      });

      socket.on('invite', (data) => 
      {
         console.log('invited '+data);
         io.to(data).emit('Invitation',{instructor:socket.id, student:data});
      });
   });



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
      if(instructors[socket.id])
         delete instructors[socket.id];
      else if(students[socket.id])
      {
         delete students[socket.id];
         list_students.pop(socket.id);
      }
   });
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});
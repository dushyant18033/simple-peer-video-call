# simple-peer-video-call

### How to run the server
_1. Clone this repository into your local machine._  
_2. Change into this cloned directory using cd command._  
_3. Run the command "node server.js"._  

_This will start a local web server that can be accessed within this local machine at the address http://localhost:3000._  
_You can host a proxy server to provide public access to this server._


### Main routes in the WebApp
_1. http://localhost/ returns a json string with ids of all the connected users, separately for student and teacher types._  
_2. http://localhost/begin opens up a teacher page and a session is started with the teacher's id as the session id._  
_3. http://localhost/join opens up a student page._



### How to start/join a session
_1. The teacher upon opening the begin page can fetch currently logged in users and send them an invite to join the session._
_2. The student upon opening the join page can either manually enter a session id or accept an invitation followed by clicking on connect to join a session._

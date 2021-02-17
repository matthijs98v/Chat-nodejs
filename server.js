var express = require('express');
var app = express();

var http = require('http').createServer(app);

var io = require('socket.io')(http);

var Online = 0;
var usercount = 0;

//static server
app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

var usernames = [];

if(true){
	//Connection
	io.on('connection', (socket) => {
		
		Online++;
		usercount++;
		
		socket.on('name', (name) => {
			console.log('Name: '+ name);
			
			usernames[socket.id] =  name+'#'+usercount;
			console.log[usernames];
			io.emit('con', '<b>'+usernames[socket.id]+'</b> Connected!');
		});

		io.emit('people', 'Connected '+Online);
		
		console.log('User: '+socket.id+' connected! '+Online);

		socket.on('chat message', (msg) => {
			console.log('message: '+ msg);
			io.emit('chat message', [usernames[socket.id],msg]);
			
		});

		socket.on('disconnect', () => {
			Online--;
			
			io.emit('people', 'Connected '+Online);
			io.emit('dis','<b>'+usernames[socket.id]+'</b> disconnected!');
			io.emit('users', usernames);
			
			console.log('User: '+socket.id+' disconnect!');
			
			io.emit('users', usernames);
			
			delete usernames[socket.id];
		});
	});
}

http.listen(5000, function () {
	console.log('Welcome to my test '+Date.now());
});
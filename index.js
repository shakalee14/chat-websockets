var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.set('view engine', 'pug');
app.use(express.static('public'))

app.get('/', function(request, response){
  response.render('index')
});

app.get('/login', function(request, response){
  response.render('login')
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  })
})

http.listen(2222, function(){
  console.log('listening on *:2222')
})

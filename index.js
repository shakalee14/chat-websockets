var express = require('express')
var app = require('express')();
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var http = require('http').Server(app);
var io = require('socket.io')(http)

var jwt = require('jsonwebtoken')
var config = require('./config')
var User = require('./app/models/users')

mongoose.Promise = global.Promise;

mongoose.createConnection(config.database);
app.set('superSecret', config.secret)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json)

app.use(morgan('dev'))

app.set('view engine', 'pug');
app.use(express.static('public'))

app.get('/', function(request, response){
  response.render('index')
});

app.get('/login', function(request, response){
  response.render('login')
})

app.get('/users/setup', function(request, response){
  var shaka = newUser({
    name: 'Shaka',
    password: 'password',
    admin: true
  })

  shaka.save(function(err){
    if(err) throw err;

    console.log('user saved successfully');
    response.json({success: true})
  })
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  })
})

http.listen(2222, function(){
  console.log('listening on *:2222')
})

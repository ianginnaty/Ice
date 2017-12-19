//Import Modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require ('body-parser');
var cors = require('cors');
var path = require ('path');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var database = require('./database/config');

var app = express();

const client = require('./routes/routes');
const user = require('./routes/user/user');

//Connect to MongoDb
mongoose.connect(database.database);

//On Connection
mongoose.connection.on('connected',()=>{
    console.log('We are connected, Good Sir');
});

mongoose.connection.on('error',(err)=>{
    if(err){
      console.log("Houston We have an Error!"+err);
    }
});
//port no
const port = 3000;

//add middleware - cors
app.use(cors());

//body parser
app.use(bodyparser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./auth/auth')(passport);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api', client);
app.use('/api', user);

//testing
app.get('/', (req, res, )=>{
  res.send('Here We Go');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port,()=>{
  console.log('Server has started on port:'+port);
});

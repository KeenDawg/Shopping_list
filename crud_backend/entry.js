//importing modules
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require('path');

var app = express();

const route = require('./route/routes');

//Connecting to mongodb
mongoose.connect('mongodb+srv://testuser123:testuser123@cluster0-j6gtz.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true
});

//on connection
mongoose.connection.on('connected', ()=>{
  console.log('MongoDB connected to port 27017');
});

mongoose.connection.on('error', (err)=>{
  console.log(err);
});

//port number
const PORT = process.env.PORT || 8080;

//middleware - cors
app.use(cors());

//middleware- body parser
app.use(bodyparser.json());

app.use('/api',route);

//setting a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, "public/index.html"));
});


app.get('/', (req,res)=>{
  res.send('foobar');
});

//start server
app.listen(PORT, ()=>{
  console.log("Server has been started at port: " +PORT);
});

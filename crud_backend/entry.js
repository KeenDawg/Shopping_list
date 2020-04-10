//importing modules
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require('path');
var passport = require('passport')

var app = express();

const route = require('./route/routes');
//app.set('view-engine', 'ejs');

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

//displays login page at /login
app.get('/login',(req,res) =>{
  res.render('login.ejs');
});

//posting register request
app.post('/login' , (req,res) =>{
  //todo later
})

//displays register page at /register
app.get('/register',(req,res) =>{
  res.render('register.ejs');
});


//posting register request
app.post('/register' , async (req,res) =>{
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users
  } catch (e) {

  } finally {

  }
})


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

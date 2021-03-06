var express=require("express");
var session = require("express-session"); //Variabel de sesion
var bodyParser=require("body-parser"); //Jalar Info del post
var app=express();
var fs = require('fs'); //Jalar archivos
var server = require('http').Server(app);  //Se le puedan hacer request .http
//var io = require('socket.io')(server);   //Sockets


app.use(session({secret: 'ssshhhhh'})); //Sesion secreta

app.use(express.static('public'));  //No me acuero pero parece necesario


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","jade"); //Arhcivos Jade como visualizador

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css2', express.static(__dirname + '/Css')); // redirect CSS bootstrap

server.listen(7071, function() {
    console.log('Servidor corriendo en http://localhost:7071');
});

app.get("/",function(req,res){
	res.render("registro");
});


app.get("/Registro",function(req,res){
	res.render("registro");
});

app.post("/Registro",function(req,res){
    res.render("registro");
});



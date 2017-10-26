var express=require("express");
var session = require("express-session"); //Variabel de sesion
var bodyParser=require("body-parser"); //Jalar Info del post
var app=express(); 
var fs = require('fs'); //Jalar archivos
var server = require('http').Server(app);  //Se le puedan hacer request .http
//var io = require('socket.io')(server);   //Sockets

var mysql = require('mysql');
var connection = mysql.createConnection(
   {
     host     : '192.168.1.13',
     user     : 'root',
     password : '52525',
     database : 'seats',
   }
);

app.use(session({secret: 'ssshhhhh'})); //Sesion secreta

app.use(express.static('public'));  //No me acuero pero parece necesario


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","jade"); //Arhcivos Jade como visualizador

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css2', express.static(__dirname + '/Css')); // redirect CSS bootstrap

server.listen(7070, function() {  
    console.log('Servidor corriendo en http://localhost:7070');
});

app.get("/",function(req,res){
	res.render("login");
});

app.get("/Login",function(req,res){
	res.render("login");
});

app.get("/Cerrar",function(req,res){


	//aqui pone el codigo para determinar la hora en el cual finalizo

	res.render("login");
});

app.get("/Registro",function(req,res){
	res.render("registro");
});

app.get("/Menu",function(req,res){
	res.render("menu");
});

app.get("/Lugar",function(req,res){
	res.render("lugar");
});

app.get("/Codigo",function(req,res){
	res.render("codigo");
});

app.post('/Login', function (req, res) {
    req.session.user_id = "Admin";//Guardar dato en variable de sesion
    connection.connect();
    var queryString = 'SELECT count(*) as cantidad FROM client where user=\''+req.body.user+'\' and pass=\''+req.body.pass+'\'';
    connection.query(queryString, (err,rows) =>{
        if(err) throw err;
        console.log(rows[0].cantidad);
        // rows.forEach( (row) => { 
        //     console.log(`Cuadraron: ${row.cantidad}`); 
        //   });
      });

    res.render("login");
});
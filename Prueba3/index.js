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
     host     : 'localhost',
     user     : 'root',
     password : '52525',
     database : 'Seats',
   }
);

function getTime(){
    var a = new Date();
    var startTime = a.toJSON().replace(/T/, ' ').replace(/\..+/, '');
    return startTime;
}

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

app.post('/Login', function (req, res) {
    req.session.user_id = "Admin";//Guardar dato en variable de sesion
    var queryString = 'SELECT count(*) as cantidad FROM client where email=\''+req.body.mail+'\' and pass=\''+req.body.pass+'\'';
	console.log(queryString);
    connection.query(queryString, (err,rows) =>{
        if(err) console.log(err.message);
        else if(rows[0].cantidad>0){
            console.log("Ingresa");
            req.session.mail = req.body.mail;
            req.session.signin = getTime();
            queryString = 'INSERT INTO sesion_client(user,signin) values (\''+req.body.mail+'\',\''+req.session.signin+'\');';
            console.log(queryString);
            connection.query(queryString);
            res.redirect("/Menu");
        }else{
            console.log("No Ingresa");
            res.render("login");
        }
      });
});

app.get("/Cerrar",function(req,res){
    //aqui pone el codigo para determinar la hora en el cual finalizo
    var queryString = "update sesion_client set signout = '"+getTime()+"' where user = '"+req.session.mail+"' and signin='"+req.session.signin+"'";
    console.log(queryString);
    connection.query(queryString);
    req.session.destroy(function(err) {
        if(err) {
            console.log(err.message);
        }
    });
	res.redirect("/Login");
});

app.get("/Registro",function(req,res){
	res.render("registro");
});

app.post("/Registro",function(req,res){
    console.log("entro a registro");
    var usuario = req.body.user;
    var password = req.body.pass;
    var email = req.body.email;
    if(password != req.body.pass2){
        res.render('registro');
    }else{
        var queryString = 'insert into client(user,email,pass) values (\''+usuario+'\',\''+email+'\',\''+password+'\');';
        connection.query(queryString, (err,rows) =>{
            if(err){
                res.render('registro');
                console.log(err.message);
            }else{

                res.render('menu');
            }
        });
    }
});



app.get("/Menu",function(req,res){
    res.render("menu");
});

app.get("/Lugar",function(req,ras){
	res.render("lugar");
});

app.get("/Codigo",function(req,res){
	res.render("Codigo");
});


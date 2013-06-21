
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongo = require('./mongo');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function(req, res, next){
    res.render('error', {status: 404, url: req.url});//error 404
    });

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/foro', routes.foro);
//app.get('/game', routes.game);
app.get('/notice', routes.notice);

app.post('/login', routes.Login);
app.post('/registro', routes.Reg);


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var socket = require('socket.io').listen(server/*, {log: false}*/);

//---------------------------------------------SOCKET.IO----------------------------------------
var players = new Array();

socket.on('connection', function(io){

  //-----------------------Nou usuari conectat------------------------
  console.log("Se ha connectado: %s", io.id);
  io.on('nou jugador', function(n){
      var posX = n.x;
      var posY = n.y;
      for (var i in players) {
          io.emit('connectados', {'id': i, 'xi': players[i][0], 'yi': players[i][1], 'xf': players[i][2], 'yf': players[i][3], nom: players[i][4], imatge: players[i][5], 'map': players[i][6]});
      }
      io.broadcast.emit('nouPj', {'idNou': io.id, 'posX': posX, 'posY': posY, nom: n.nom, imatge: n.imatge});
      players[io.id]=[posX, posY, posX, posY, n.nom, n.imatge, "map01"];//xInicial, yInicial, xFinal, yFinal, nom
    });
  //------------------------------------------------------------------
  //-------------------------Desconexio d'un usuari-------------------
  io.on('disconnect', function(){
    console.log(io.id + " se ha desconectado");
    mongo.jugadores.update({'Nombre': players[io.id][4]}, {$set: {Posicion: {x: players[io.id][0], y: players[io.id][1]}}},function(err){
          if(err) console.log(err);
      });
    delete players[io.id];
    players.splice(io.id, 1);
    io.broadcast.emit('desconectat', {'id': io.id});
    });
  //------------------------------------------------------------------

    io.on('controla posicion', function(pos){
        players[io.id][0]=pos.x;
        players[io.id][1]=pos.y;
        //io.broadcast.emit('otherMove', {'id': io.id, 'x': pos.x, 'y': pos.y});
    });

    io.on('pjMove', function(moveTo){
      players[io.id][2]=moveTo.x;
      players[io.id][3]=moveTo.y;
      io.broadcast.emit('otherMove', {'id': io.id, 'x': moveTo.x, 'y': moveTo.y});
      });

    /*
    io.on('xyInicial', function(pos){
      players[io.id][0] = pos.x;
      players[io.id][1] = pos.y;
      })*/

    io.on('chatEmit', function(texto){
        //console.log(io.id);
        //if(texto.per=="")
        io.broadcast.emit('chatOn', {'data': players[io.id][4]+": " + texto.data});
        io.emit('chatOn', {'data': players[io.id][4]+": " + texto.data});
        /*
        else
        {
            io.sockets.socket(texto.per).emit({'data': texto.data});
            //console.log(io.clients);
            //socket.clients[texto.per].send({'data': texto.data});
            //io(texto.per).emit({'data': texto.data});
        }*/
    });

    io.on('miPers', function(n){
        io.broadcast.emit('otherPers', {'id': io.id, 'nImage':n.nPj});
        mongo.jugadores.update({'Nombre': players[io.id][4]}, {$set: {Imagen: n.nPj}},function(err){
            if(err) console.log(err);
        });
    });

    io.on('ATK', function(e){
        io.emit('ATK', {'atk':e.atk});
        io.broadcast.emit('ATK', {'atk':e.atk});
    });

    io.on('die', function(){
        io.broadcast.emit('die', {'id': io.id});
    });

    io.on('mapChange', function(m){
        io.broadcast.emit('mapChange', {'id': io.id, 'map':m.map, 'x': m.x, 'y':m.y});
    });
  });
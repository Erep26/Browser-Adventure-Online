/*
 * Arxiu de rutes
 * Una cosa interesant de node.js es que
 */

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'index' });
};
exports.foro = function(req, res){
  res.render('foro', { title: 'foro' });
};
exports.notice = function(req, res){
  res.render('notice', { title: 'notice' });
};
/*exports.game = function(req, res){
  res.render('game', { title: 'game' });
};*/

/*
 * POST
 */
var mongo = require('./mongo')

exports.Login = function(req, res){
    //console.log(req.body.User + " " + req.body.Pass);
    mongo.jugadores.findOne({'Nombre': req.body.User
                            ,'Password': req.body.PassEncryp}, function(err, docs){
        if(!err)
        {
            if(!docs){
                //console.log("no se ha encontrado el usuario");
                res.json({ errr: 'Los datos introducidos no corresponden con ningun usuario@'});
            }
            else{
                //console.log(docs);
                //res.json({ resp: 'Loguin correcto', STATUS: 1});
                res.render('game', {title: 'game'
                                    ,name: req.body.User
                                    ,'x': docs.Posicion.x
                                    ,'y': docs.Posicion.y
                                    ,imgPers: docs.Imagen
                                    ,VIDA: docs.Vida
                                    ,MANA: docs.Mana
                                    ,MAP: req.body.mapa});
            }
        }
    });
    //res.render('index', { title: 'index' });
}

exports.Reg = function(req, res){
    mongo.jugadores.findOne({'Nombre': req.body.User}, function(err, docs){
        if(!err)
        {
            if(!docs){
                new mongo.jugadores({Nombre: req.body.User
                                    ,Password: req.body.PassEncryp
                                    ,Email: req.body.Mail
                                    ,Posicion: {x: 10,
                                                y: 10}
                                    ,Imagen: 1
                                    ,Vida: 100
                                    ,Mana: 100
                        }).save(function(err){
                    if(!err) res.json({ resp: 'Usuario introducido correctamente@'});
                    else throw err;
                });
            }
            else{
                res.json({ errr: 'Este usuario ya se encuentra registrado@'});
            }
        }
        else throw err;
    });
}

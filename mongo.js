/*
 * En este archivo se guardan los esquemas y la conexxion a la base de datos.
 * El archivo esta preparado para trabajar con mas modelos ademas de los jugadores pero como aun no se han implementado estan comentados para futuras versiones.
 *
 * Aunque MongoDB no necesite esquemas ni respete ninguna norma, Mongoose pide un esquema
 * para basarse al escribir un documento
 *
 * Tipos de datos:
 *  String
 *  Number
 *  Boolean | Bool
 *  Array
 *  Buffer
 *  Date
 *  ObjectId | Oid
 *  Mixed
 */

var mongoose = require("mongoose"); //moongoose es el modulo de node.js que usraemos para conectarnos a la base de datos
//mongodb://ip del servidor donde esta nuestra base de datos / nuestra base de datos
mongoose.connect("mongodb://erep:erepqwerty@ds029828.mongolab.com:29828/baogame" , function(err){
    if(!err) console.log("Mongoose conectado");
    else throw err;
});

//Los esquemas son parecidos al JSON, esto es por que MongoDB trabaja con BSON que viene a ser lo mismo pero en binario
var jugadores = mongoose.Schema({
    Nombre          :   String,
    Password        :   String,
    Email           :   String,
    Nivel           :   Number,
    Posicion        :   {x: Number,
                         y: Number},
    Vida            :   Number,
    Mana            :   Number,
    Imagen          :   Number/*,
    Habilidades     :   Oid,
    Objetos         :   Oid,
    Fuerza          :   Number,
    Defensa         :   Number,
    Inteligencia    :   Number,
    Destreza        :   Number,
    Agilidad        :   Number,
    Suerte          :   Number
    */
});
/*
 var enemigos = mongoose.Schema({
     Nombre         :   String,
     SpriteImg      :   String,
     Fuerza         :   Number,
     Defensa        :   Number,
     Inteligencia   :   Number,
     Destreza       :   Number,
     Agilidad       :   Number,
     Suerte         :   Number
 });

 var habilidades = mongoose.Schema({
     Nombre         :   String,
     Descripcion    :   String,
     Imagen         :   String
 });

 var objetos = mongoose.Schema({
     Nombre         :   String,
     Descripcion    :   String,
     Imagen         :   String
 });

 var NPC = mongoose.Schema({
     Nombre         :   String,
     Dialogos       :   String,
     Posicion       :   Number
 });
 */

//de los esquemas creamos los modelos los cuales nos indican en que coleccion se guardan los datos
var jugadores = mongoose.model('jugadores', jugadores);
/*var enemigos = mongoose.model('enemigos', enemigos);
var habilidades = mongoose.model('habilidades', habilidades);
var objetos = mongoose.model('objetos', objetos);
var NPC = mongoose.model('NPC', NPC);*/

//exportamos el modelo para usarlo en otros ficheros
exports.jugadores = jugadores;
/*exports.enemigos = enemigos;
exports.habilidades = habilidades;
exports.objetos = objetos;
exports.NPC = NPC;*/
//Canvas que serveixen com a buffers on es dibuixa i despres es copia el contingut al canvas que es veu
var canvasBuffer = document.createElement('canvas');
canvasBuffer.width = 1000;
canvasBuffer.height = 500;
var ctxBuff = canvasBuffer.getContext('2d');

var canvas = document.getElementById('canvasPJ'),
    ctx = canvas.getContext('2d');
//------------------------------------------------

var mousex = mousey = 0;//variables pel control del ratoli
var player;//variable del jugador
var canvasMap = new Array();//array on estan els canvas
var otherPlayers = new Array();//aray on es guarden els jugadors remots
var fireballs = new Array();
var deleteFire;
var collision = new Array();
var maps = new Array();

//mides imatges sprites globals
var sXImg = 128;//eix X
var sYImg = 192;//eix Y
var tileSize = 32;
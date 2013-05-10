/*
 *En aquest arxiu es desenvolupa la logica del joc
*/
//Canvas que serveixen com a buffers on es dibuixa i despres es copia el contingut al canvas que es veu
var canvas = document.createElement('canvas'),
    canvas2 = document.createElement('canvas');
    canvas.width = canvas2.width = 1000;
    canvas.height = canvas2.height = 500;
var ctx = canvas.getContext('2d'),
    ctx2 = canvas2.getContext('2d');
//------------------------------------------------

var mousex = mousey = 0;//variables pel control del ratoli
var player;//variable del jugador
var canvasMap = new Array();//array on estan els canvas
var otherPlayers = new Array();//aray on es guarden els jugadors remots

window.onload = function(){
    canvasMap[0] = document.getElementById('canvasBot').getContext('2d');
    canvasMap[1] = document.getElementById('canvasMid').getContext('2d');
    canvasMap[2] = document.getElementById('canvasTop').getContext('2d');

    //ctx2 es un dels buffers que em definit abans que farem servir per pintar el mapa
    drawTiles(canvasMap[0],ctx2,canvasMap[2]);

    events();//event
    carregaInterficie();//la interfaz d'usuari

    //Creem l'usiuari
    player = new pj($('x').text(), $('y').text(), "/images/game/char/" + $('input:radio[name=pers]:checked').val() + ".png", $('name').text());

    //Bucle del joc
    run();
    };

function run()
{
    /*
    es pinta el mapa --> canvas2 (fora del bucle)
    bucle:
         ___________________________
        |                           |
        v                           |
    canvaMap[1] (el que es veu)     |
        |                           |
        |es borra i pintem...       |
        v                           |
     canvas                         |
        |                           |
        |es borra i pintem          |
        v                           |
     canvas2                        |
        i                           |
    personatjes                     |
        |___________________________|
     */
    canvasMap[1].clearRect(0, 0, canvas.width, canvas.height);
    canvasMap[1].drawImage(canvas, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvas2, 0, 0);

    ctx.strokeRect(mousex,mousey,wCanvas,wCanvas);

    //per veure els fps calculats
    //$('#fps').text("fps: " + fpscal())

    player.move();//moviment personatje
    for(var n in otherPlayers)//mobiment altres personatges
        otherPlayers[n].move();
    
    window.requestAnimationFrame(run);
}
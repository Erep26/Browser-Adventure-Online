/*
 *En aquest arxiu es desenvolupa la logica del joc
*/
window.onload = function(){

    modStatus(0,0);
    player = new pj($('x').text(), $('y').text(), eval("img.p" + $('input:radio[name=pers]:checked').val()) , $('name').text());

    canvasMap[0] = document.getElementById('canvasBot').getContext('2d');
    canvasMap[1] = document.getElementById('canvasMid').getContext('2d');

    drawTiles(canvasMap[0],canvasMap[1]/*,canvasMap[2]*/);

    events();//event
    //carregaInterficie();//la interfaz d'usuari

    //Creem l'usuari
    //


    //console.log(collision);

    //Bucle del joc
    run();
    };

function run()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasBuffer, 0, 0);
    ctx.strokeRect(mousex,mousey,32,32);

    //per veure els fps calculats
    //$('#fps').text("fps: " + fpscal())

    ctxBuff.clearRect(0, 0, canvasBuffer.width, canvasBuffer.height);
    player.move();//moviment personatje
    for(var n in otherPlayers)//mobiment altres personatges
        if(otherPlayers[n].map == player.map)
            otherPlayers[n].move();

    warp();

    deleteFire = new Array();
    for(var n in fireballs)
    {
        if(fireballs[n].map == player.map)
        {
            fireballs[n].mou();

            for(var per in otherPlayers)
            {
                if(Math.floor(otherPlayers[per].x/tileSize) == Math.floor(fireballs[n].posX/tileSize) &&
                    Math.floor(otherPlayers[per].y/tileSize) == Math.floor(fireballs[n].posY/tileSize))
                    deleteFire.push(n);
            }

            if(Math.floor(player.x/tileSize) == Math.floor(fireballs[n].posX/tileSize) &&
                Math.floor(player.y/tileSize) == Math.floor(fireballs[n].posY/tileSize))
            {
                deleteFire.push(n);
                modStatus(-25, 0);
            }
        }
    }

    deleteFire.forEach(function(f){
        fireballs.splice(f, 1);
    });


    window.requestAnimationFrame(run);
}
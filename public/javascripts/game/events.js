//Aqui es tracten tots els events del joc
function events()
{
//-----------------------------------------------EVENTS DE RATOLI-------------------------------------------------------
    var divCanvas = document.getElementById("divCanvas");
    
    divCanvas.addEventListener("click", function(e){//event on click del canvas
            var canvas = ctx.canvas;
            var clickX = e.clientX - divCanvas.offsetLeft  + document.body.scrollLeft-wCanvas;//posicio click eix X
            var clickY = e.clientY - divCanvas.offsetTop + document.body.scrollTop-hCanvas;//posicio click eix Y
            //alert(clickX + " " + clickY);
            
            player.setPos(clickX, clickY);//canviem la posicio final del nostre personatge
            socket.emit('pjMove', {'x': clickX, 'y': clickY});//i informem al servidor
        }, false);
        
    divCanvas.addEventListener("mousemove", function(e){//event que controla la posicio del cursor per el dibuix del cuadre
            //canvas.width=canvas.width;
            mousex = e.clientX - divCanvas.offsetLeft + document.body.scrollLeft-wCanvas;
            mousey = e.clientY - divCanvas.offsetTop + document.body.scrollTop-wCanvas;
            //console.log(mousex + " " + mousey);
        }, false);
    // *Nota: scrolltop no funciona del tot be en firefox
//----------------------------------------------------------------------------------------------------------------------
}



//-------------------------------------EVENTS DE CONEXIO, DESCONEXIO I MOVIMENT-----------------------------------------
    socket.on("connect", function(){//cuan el client es conecta al servido
        //s' envia una informacio sobre aquest al servidor
        socket.emit('nou jugador', {'x': $('x').text(), 'y': $('y').text(), 'nom': $('name').text(), imatge: $('input:radio[name=pers]:checked').val()});
    });

    socket.on('connectados', function(pjs){//event que rep el client que s'acaba de conecta com a resposta del anterior event 'nou jugador' NOMES EL QUE S'ACAVA DE CONECTA
        //Reb els personatges que ja estaben conectats
        otherPlayers[pjs.id] = new pj(pjs.xi, pjs.yi, "/images/game/char/" + pjs.imatge + ".png", pjs.nom); //x, y, img, nom
        otherPlayers[pjs.id].setPos(pjs.xf,pjs.yf);
    });

    socket.on('nouPj', function(pjs){//event que reven els client que ja estaven conectats com a resposta del anterior event 'nou jugador' que prove d'un altre client
        //reven el personatje que s'acaba de conectar
        otherPlayers[pjs.idNou] = new pj(pjs.posX, pjs.posY, "/images/game/char/" + pjs.imatge + ".png", pjs.nom);
    });

    socket.on('otherMove', function(e){//event que reven tots el jugadors com a resposta d'un altre que s'esta movent
        //canbia la posicio final del usuari que es mou
        otherPlayers[e.id].setPos(e.x, e.y);
    });

    socket.on('desconectat',function(e){//event que reven tots el clients en desconectarse un
        //borra de l'array el personatge que s'ha desconectat
        delete otherPlayers[e.id];
        otherPlayers.splice(e.id, 1);
    });
//----------------------------------------------------------------------------------------------------------------------




//----------------------------------------------------EVENTS DE CHAT----------------------------------------------------
    socket.on("chatOn", function(texto){//funcio que escolta l'entrada de missatges del servidor
        chatAudio();
        $('#conversacion').append($('<p>'+ texto.data +'</p>'));//afeim el text rebut al div
        $('#conversacion').scrollTop(100000);//baixem l'scroll del div on es mostren els missatges
        document.getElementById('conversacion').scrollIntoView(true);
    });

function enviaChat(e)//funcio que emiteix el text cap el servidor
{
    socket.emit('chatEmit', {data: e.text.value});//enviem la cadena que escriu l'usuari
    e.text.value = "";//i esborrem el contingut del cuadre de text
    return false;//return false per no recargar la pagina
}
//----------------------------------------------------------------------------------------------------------------------

//-------------------------------------------CANVI PERSONATGE-----------------------------------------------------------
function guardaPers(e)
{
    socket.emit('miPers', {nPj: e});//envia el numero de personatge al servidor
}
//----------------------------------------------------------------------------------------------------------------------
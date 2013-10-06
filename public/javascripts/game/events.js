//Aqui es tracten tots els events del joc
function events()
{
//-----------------------------------------------EVENTS DE RATOLI-------------------------------------------------------
    var divCanvas = document.getElementById("divCanvas");
    
    divCanvas.addEventListener("click", function(e){//event on click del canvas
            var clickX;
            var clickY;

            if (e.pageX != undefined && e.pageY != undefined)
            {
                clickX = e.pageX;
                clickY = e.pageY;
            }
            else
            {
                clickX = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                clickY = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            clickX -= divCanvas.offsetLeft;
            clickY -= divCanvas.offsetTop;

            clickX = parseInt(clickX/32)*32;
            clickY = parseInt(clickY/32)*32;
                player.setPos(clickX, clickY);//canviem la posicio final del nostre personatge
        console.log("x: " + clickX + " y: " + clickY);
        }, false);
        
    divCanvas.addEventListener("mousemove", function(e){//event que controla la posicio del cursor per el dibuix del cuadre
            if (e.pageX != undefined && e.pageY != undefined)
            {
                mousex = e.pageX;
                mousey = e.pageY;
            }
            else
            {
                mousex = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                mousey = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            mousex -= divCanvas.offsetLeft;
            mousey -= divCanvas.offsetTop;

            mousex = parseInt(mousex/32)*32;
            mousey = parseInt(mousey/32)*32;
        }, false);

    divCanvas.addEventListener("keypress", function(e) {
        //alert(e.charCode);
        if(e.charCode == 32) //space
        {
            player.attack();
        }
        if(e.charCode == 49) //1
            func1();
        if(e.charCode == 50) //2
            func2();
    })
//----------------------------------------------------------------------------------------------------------------------
}

    function func1()
    {
        //alert("1");
        if(parseInt($("#sp1").text()) > 0)
        {
            $("#sp1").text(parseInt($("#sp1").text()-1));
            modStatus(25,0);
        }
    }
    function func2()
    {
        //alert("2");
        if(parseInt($("#sp2").text()) > 0)
        {
            $("#sp2").text(parseInt($("#sp2").text()-1));
            modStatus(0,25);
        }
    }

//-------------------------------------EVENTS DE CONEXIO, DESCONEXIO I MOVIMENT-----------------------------------------
    socket.on("connect", function(){//cuan el client es conecta al servido
        //s' envia una informacio sobre aquest al servidor
        socket.emit('nou jugador', {'x': $('x').text(), 'y': $('y').text(), 'nom': $('name').text(), imatge: $('input:radio[name=pers]:checked').val()});
    });

    socket.on('connectados', function(pjs){//event que rep el client que s'acaba de conecta com a resposta del anterior event 'nou jugador' NOMES EL QUE S'ACAVA DE CONECTA
        //Reb els personatges que ja estaben conectats
        otherPlayers[pjs.id] = new pj(pjs.xi, pjs.yi, eval("img.p" + pjs.imatge), pjs.nom); //x, y, img, nom
        otherPlayers[pjs.id].map = pjs.map;
        otherPlayers[pjs.id].otherSetPos(pjs.xf,pjs.yf);
    });

    socket.on('nouPj', function(pjs){//event que reven els client que ja estaven conectats com a resposta del anterior event 'nou jugador' que prove d'un altre client
        //reven el personatje que s'acaba de conectar
        otherPlayers[pjs.idNou] = new pj(pjs.posX, pjs.posY, eval("img.p" + pjs.imatge), pjs.nom);
    });

    socket.on('otherMove', function(e){//event que reven tots el jugadors com a resposta d'un altre que s'esta movent
        //canbia la posicio final del usuari que es mou
        otherPlayers[e.id].otherSetPos(e.x, e.y);
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
    player.imgPlayer = eval("img.p" + $('input:radio[name=pers]:checked').val());
    socket.emit('miPers', {nPj: e});//envia el numero de personatge al servidor
}

socket.on('otherPers', function(e){
    otherPlayers[e.id].imgPlayer = eval("img.p" + e.nImage);
});
//----------------------------------------------------------------------------------------------------------------------

socket.on('ATK', function(e){
    //alert(e.atk);
    fireballs.push(eval(e.atk));
});

function modStatus(v, m)
{
    $("vida").text(parseInt($("vida").text())+v);
    $("mana").text(parseInt($("mana").text())+m);
    $("#vidaBar").css("width", $("vida").text());
    $("#manaBar").css("width", $("mana").text());
    if(parseInt($("vida").text())>100)
        modStatus(-(parseInt($("vida").text())-100),0);
    if(parseInt($("mana").text())>100)
        modStatus(0, -(parseInt($("mana").text())-100))

    if(parseInt($("vida").text()) <= 0)
    {
        $("vida").text(0);
        player.alife = false;
        socket.emit('die', {});
    }
}

socket.on('die', function(n){
    otherPlayers[n.id].alife = false;
});

socket.on('mapChange', function(m){
    otherPlayers[m.id].map = m.map;
    otherPlayers[m.id].x = m.x;
    otherPlayers[m.id].y = m.y;
    otherPlayers[m.id].fx = m.x;
    otherPlayers[m.id].fy = m.y;
});
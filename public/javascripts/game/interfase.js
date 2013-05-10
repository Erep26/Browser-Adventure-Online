/*
 * Funcio on es dibuxa la interficie del joc, de moment sense cap utilitat
 */
function carregaInterficie()
{
    var ctxInterface = document.getElementById('canvasInterface').getContext('2d');//agafa el context 2d del canvas
    var bolsa = new Image();
    bolsa.src="images/game/bolsa.png";
    // fill    --> color de fons
    // stroke  --> color de linea
    
    //establim el colors per la següent figura
    ctxInterface.strokeStyle = "#000000";
    ctxInterface.fillStyle = "gray";
    ctxInterface.beginPath();//indiquem comenci una ruta de dibuix
    ctxInterface.moveTo(0,375);//indiquem on comença la ruta
    ctxInterface.lineTo(300,375);//tirem linees cap on bulguem
    ctxInterface.lineTo(400,425);
    ctxInterface.lineTo(1000,425);
    ctxInterface.lineTo(1000,500);
    ctxInterface.lineTo(0,500);
    ctxInterface.closePath();//tanquem la ruta de dibuix
    ctxInterface.stroke();//hi li diem que pinti
    ctxInterface.fill();


    /*
     ctxInterface.arc(posX, posY, midaRadi, Angle d'inici, Angle final);

     RECORDATORI DE MATEMATIQUES
     2Pi = una volta de circumferencia
     per tant:
     Primer quart 0.5Pi
     Segon quart Pi
     Tercer quart 1.5Pi
     Quart quart 2Pi
     */
    //mig cercle per la vida
    ctxInterface.fillStyle = "red";
    ctxInterface.beginPath();
    ctxInterface.arc(300,400,75,Math.PI*0.5,Math.PI*1.5);
    ctxInterface.closePath();
    ctxInterface.stroke();
    ctxInterface.fill();

    //l'altre mig cercle pel mana
    ctxInterface.fillStyle = "blue";
    ctxInterface.beginPath();
    ctxInterface.arc(300,400,75,Math.PI*1.5,Math.PI*0.5);
    ctxInterface.closePath();
    ctxInterface.stroke();
    ctxInterface.fill();
    //-------------------------------------------------------------------

    //cuadres per habilitats i objectes
    ctxInterface.strokeStyle = "black";
    ctxInterface.strokeRect(450,440,50,50);
    ctxInterface.strokeRect(510,440,50,50);
    ctxInterface.strokeRect(570,440,50,50);
    ctxInterface.strokeRect(640,440,50,50);
    ctxInterface.strokeRect(700,440,50,50);
    ctxInterface.strokeRect(760,440,50,50);
    //ctxInterface.drawImage(bolsa, 0, 0, 700, 300);
    /*ctx.drawImage(        bolsa,             //imagen
                          0, //posicion x en la imagen
                          0,     //posicion y en la imagen
                          456,              //ancho enla imagen
                          454,              //alto en la imagen
                          0,               //posicion x en canvas
                          0,               //posicion y en canvas
                          10,              //ancho en canvas
                          10               //alto en canvas
                          );*/
}
/*
 * La clase pj s'utilitza per crea el objectes player(el nostre jugador), i otherPlayers(els jugadors remots)
 */
//mides imatges sprites globals
var sXImg = 128;//eix X
var sYImg = 192;//eix Y
var wCanvas = 128/4;
var hCanvas = 192/4;

var pj = function(posX, posY, img, nombre)
{
    this.x = posX;//posicio actual eix x
    this.y = posY;//posicio actual eix y
    
    this.fx = posX;//posicio final eix x
    this.fy = posY;//posicio final eix y

    this.nombre = nombre;
    
    this.timer=0;
    this.t=0;
    this.dir=0;
    this.img = new Image();
    this.img.src = img;
    
    
    this.sprAnim=function()
        {
            ctx.drawImage(this.img,             //imagen
                          this.timer%4*sXImg/4, //posicion x en la imagen
                          this.dir*sYImg/4,     //posicion y en la imagen
                          sXImg/4,              //ancho enla imagen
                          sYImg/4,              //alto en la imagen
                          this.x,               //posicion x en canvas
                          this.y,               //posicion y en canvas
                          wCanvas,              //ancho en canvas
                          hCanvas               //alto en canvas
                          );
            if(this.t==5){this.timer++;this.t=0;}
        }
    
    this.move = function()//funcio que mou el personatge
    {
        if(this.x!=this.fx || this.y!=this.fy)
            {
                if(this.x>this.fx){this.x--; this.dir=1;}
                if(this.x<this.fx){this.x++; this.dir=2;}
                if(this.y>this.fy){this.y--; this.dir=3;}
                if(this.y<this.fy){this.y++; this.dir=0;}
                this.t++;
                socket.emit('controla posicion', {'x': this.x, 'y': this.y});//informem al servidor de la nostra posicio
            }
        else
            {
                this.timer=0;
            }
        this.sprAnim();

        //Escriurem el nom del nostre usuari a sobre del personatge
        ctx.font = '10pt Calibri';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText(this.nombre, this.x+wCanvas/2, this.y);
    }
    
    this.setPos = function(fx,fy)
    {
        this.fx=fx;
        this.fy=fy;
    }
}

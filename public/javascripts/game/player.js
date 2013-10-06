/*
 * La clase pj s'utilitza per crea el objectes player(el nostre jugador), i otherPlayers(els jugadors remots)
 */

var pj = function(posX, posY, imgPlayer, nombre)
{
    this.x = Math.floor(posX/tileSize)*tileSize;//posicio actual eix x
    this.y = Math.floor(posY/tileSize)*tileSize;//posicio actual eix y
    
    this.fx = posX;//posicio final eix x
    this.fy = posY;//posicio final eix y

    this.nombre = nombre;
    
    this.timer=0;
    this.t=0;
    this.dir=0;
    this.imgPlayer = imgPlayer;
    this.alife = true;
    this.map = 'map01';
    
    
    this.sprAnim=function()
        {
            ctxBuff.drawImage(this.imgPlayer,             //imagen
                          this.timer%4*sXImg/4, //posicion x en la imagen
                          this.dir*sYImg/4,     //posicion y en la imagen
                          sXImg/4,              //ancho enla imagen
                          sYImg/4,              //alto en la imagen
                          this.x,               //posicion x en canvas
                          this.y,               //posicion y en canvas
                          tileSize,              //ancho en canvas
                          tileSize               //alto en canvas
                          );
            if(this.t==5){this.timer++;this.t=0;}

            //Escriurem el nom del nostre usuari a sobre del personatge
            ctxBuff.font = '10pt Calibri';
            ctxBuff.textAlign = 'center';
            ctxBuff.fillStyle = 'black';
            ctxBuff.fillText(this.nombre, this.x+tileSize/2, this.y);
        }

    this.attack = function()
    {
        var mana = parseInt($("mana").text())
        if(mana>=25)
        {
            socket.emit('ATK', {'atk': "new arrowAttack(" + this.x + ", " + this.y + ", " + this.dir +  ", '" + this.map + "')"});
            modStatus(0,-25);
        }

    }

    this.AStar = function()
    {
        var x  = Math.floor(this.x/tileSize);
        var y  = Math.floor(this.y/tileSize);
        var fx = Math.floor(this.fx/tileSize);
        var fy = Math.floor(this.fy/tileSize);

        console.log(x + " " + y + " " + fx + " " + fy);

        var U = 9999;
        var D = 9999;
        var L = 9999;
        var R = 9999;

        try{
            if(collision[y-1][x]==0 || collision[y-1][x]==2) U=Math.abs(fy-y+1)+Math.abs(fx-x);
        }catch(e) {U = 9999;}

        try{
            if(collision[y+1][x]==0 || collision[y+1][x]==2) D=Math.abs(fy-y-1)+Math.abs(fx-x);
        }catch(e) {D = 9999;}

        try{
            if(collision[y][x-1]==0 || collision[y][x-1]==2) L=Math.abs(fy-y)  +Math.abs(fx-x+1);
        }catch(e) {L = 9999;}

        try{
            if(collision[y][x+1]==0 || collision[y][x+1]==2) R=Math.abs(fy-y)  +Math.abs(fx-x-1);
        }catch(e) {R = 9999;}

        //console.log("U="+U);
        //console.log("D="+D);
        //console.log("L="+L);
        //console.log("R="+R);

        if(U<=D && U<=L && U<=R) {this.y--; this.dir=3;}
        else if(D<=U && D<=L && D<=R) {this.y++; this.dir=0;}
        else if(L<=D && L<=U && L<=R) {this.x--; this.dir=1;}
        else if(R<=D && R<=L && R<=U) {this.x++; this.dir=2;}
    }

    this.move = function()//funcio que mou el personatge
    {
        if(this.alife)
        {
            if(this.x!=this.fx || this.y!=this.fy)
                {
                    if(this.x%tileSize == 0 && this.y%tileSize == 0) this.AStar();

                    if(this.dir==1)this.x--;
                    else if(this.dir==2)this.x++;
                    else if(this.dir==3)this.y--;
                    else if(this.dir==0)this.y++;

                    this.t++;
                    socket.emit('controla posicion', {'x': this.x, 'y': this.y});//informem al servidor de la nostra posicio
                }
            else
                {
                    this.timer=0;
                }
            this.sprAnim();
        }
        else
        {
            var posImgDied = this.imgPlayer.getAttribute('src').match(/\d+/)[0] -1;

            ctxBuff.drawImage(img.died,             //imagen
                posImgDied * sXImg/4, //posicion x en la imagen
                0,     //posicion y en la imagen
                sXImg/4,              //ancho enla imagen
                sYImg/4,              //alto en la imagen
                this.x,               //posicion x en canvas
                this.y,               //posicion y en canvas
                tileSize,              //ancho en canvas
                tileSize               //alto en canvas
            );
        }

    }
    
    this.setPos = function(fx,fy)
    {
        if(this.alife)
        {
            this.otherSetPos(fx,fy);
            socket.emit('pjMove', {'x': this.fx, 'y': this.fy});//informem al servidor d'un cambi de posicio final
        }
    }

    this.otherSetPos = function(fx, fy)
    {
        this.fx = fx;
        this.fy = fy;
    }
}

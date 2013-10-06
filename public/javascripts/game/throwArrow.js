var arrowAttack = function(posX, posY, dir, map)
{
    this.vel = 10;
    this.posX = posX;
    this.posY = posY;
    this.dir = dir;
    this.map = map;

    switch (this.dir)
    {
        case 0:
            this.posY+=32;
            break;
        case 1:
            this.posX-=32;
            break;
        case 2:
            this.posX+=32;
            break;
        case 3:
            this.posY-=32;
            break;
    }


    this.drawArrow = function()
    {
        ctxBuff.drawImage(img.fireball,             //imagen
            this.dir*54, //posicion x en la imagen
            0,     //posicion y en la imagen
            54,              //ancho enla imagen
            54,              //alto en la imagen
            this.posX,               //posicion x en canvas
            this.posY,               //posicion y en canvas
            32,              //ancho en canvas
            32               //alto en canvas
        );
    }

    this.mou = function()
    {
        this.drawArrow();
        switch (this.dir)
        {
            case 0:
                this.posY+=this.vel;
                break;
            case 1:
                this.posX-=this.vel;
                break;
            case 2:
                this.posX+=this.vel;
                break;
            case 3:
                this.posY-=this.vel;
                break;
        }
    }
}
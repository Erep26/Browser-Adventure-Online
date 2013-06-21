/*var oImage = new Image();
oImage.src= "tile.png"*/
//Funcio que pinta el mapa (variable TileMap) en les seves diferents capes
function drawTiles(ctx0, ctx1/*, ctx2*/) {//rep 3 context 2d del canvas on volem pintar


    var mapImg = maps[player.map][0];
    var TileMap =  maps[player.map][1];

	var ctxCanvasMap = new Array();
	ctxCanvasMap[0]=ctx0;
	ctxCanvasMap[1]=ctx1;
	//ctxCanvasMap[2]=ctx2;
	
	var TileWidth = TileMap.tilewidth,
	nTileHeight = TileMap.tileheight,
	nMapWidth = TileWidth * TileMap.width,
	Layers = TileMap.layers,
	aLayersLen = Layers.length,
	nImageCols = mapImg.width / TileWidth,
	CurrentLayer,
	nTileId,
	nTileX,
	nTileY;

    for (var nLayers = 0; nLayers < aLayersLen; nLayers++)
    {
        CurrentContext = ctxCanvasMap[Layers[nLayers].name];
        CurrentLayer = Layers[nLayers].data;

        var PosX = 0;
        var PosY = 0;
        if(Layers[nLayers].name != 2)
        {
            for (var nDataCount = 0; nDataCount < CurrentLayer.length; nDataCount++)
            {
                nTileId = CurrentLayer[nDataCount];
                nTileX = Math.floor(nTileId % nImageCols) -1;
                if (nTileX !== -1)
                {
                    nTileX *= TileWidth;
                    nTileY = Math.floor(nTileId / nImageCols);
                    nTileY *= nTileHeight;

                    CurrentContext.drawImage(mapImg, nTileX, nTileY, TileWidth, nTileHeight, PosX, PosY, TileWidth, nTileHeight);
                }

                PosX += TileWidth;
                if (PosX === nMapWidth)
                {
                    PosX = 0;
                    PosY += nTileHeight;
                }
            }
        }
        else
        {
            for(var nfila = 0; nfila < TileMap.height; nfila++)
                collision[nfila] = new Array();
            for (var nDataCount = 0; nDataCount < CurrentLayer.length; nDataCount++)
                collision[Math.floor(nDataCount / TileMap.width)].push(CurrentLayer[nDataCount]);
        }
    }
};
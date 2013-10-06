function Chmap(fromMap, fromX, fromY, toMap, toX, toY)
{
    if(player.map == fromMap && Math.floor(player.x/tileSize) == fromX && Math.floor(player.y/tileSize) == fromY)
    {
        player.map = toMap;
        player.x = toX * tileSize;
        player.y = toY * tileSize;
        player.fx = player.x;
        player.fy = player.y;
        canvasMap[0].clearRect(0, 0, canvas.width, canvas.height);
        canvasMap[1].clearRect(0, 0, canvas.width, canvas.height);
        drawTiles(canvasMap[0],canvasMap[1]);
        socket.emit("mapChange", {'map': player.map, 'x': player.x, 'y': player.y});
    }
}

function warp()
{
    Chmap('map01', 11, 7, 'casa', 14, 13);
    Chmap('casa', 14, 14, 'map01', 11, 8);
}
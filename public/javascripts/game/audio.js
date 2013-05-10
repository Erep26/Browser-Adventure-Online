var musicPlaying = true;
var chatPlaying = true;

function musicOnOff()//apaga o encen depen com entigui la variable
{
    if(musicPlaying)
    {
        musicPlaying = false;
        $('#btnAudioMusic').attr('class','icon-volume-off');//cambiem la clase que en modifica la imatge del boto
        document.getElementById('bgm').pause();//pausa la musica
    }
    else
    {
        musicPlaying = true;
        $('#btnAudioMusic').attr('class','icon-volume-up');
        document.getElementById('bgm').play();//reprodueix la musica
    }
}

function chatOnOff()
{
    if(chatPlaying)
    {
        chatPlaying = false;
        $('#btnAudioChat').attr('class','icon-volume-off');
    }
    else
    {
        chatPlaying = true;
        $('#btnAudioChat').attr('class','icon-volume-up');
    }
}

//si la variable esta a true sonara un so al moment de rebre un missatge
function chatAudio(){ if(chatPlaying) document.getElementById('chs').play();}
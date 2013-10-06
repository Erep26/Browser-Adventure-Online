$('#NAV' + document.title).addClass('active');//segons el titol de la pagina activa l'element corresponent de la nabvar

function funcAjax(data)//tractament de la cadena de text que retorna el servidor
{
    if(data.substring(0, "<!DOCTYPE".length)=="<!DOCTYPE")//en aquet cas el loguin es correcte y entra al joc
        return true;
    else
    {
        var str = data.substring(data.indexOf(':')+3, data.indexOf('@"'))

        //aqui es comprova el json rebut, aquesta part donava problemes si es feia directament data.resp per aixo s'ha tractat com si fosin cadenes normals y corrents
        if(data.substring(data.indexOf(':')-5,data.indexOf(':')-1) == "resp")
            apprise(str, location.href="index");//aquest es el cas de registre, en cas d'anar be es mostra un missatge a l'usuari y carrega l'index
        else//en cas d'error tant en el loggin com el registre es mostra el missatge d'error
            apprise(str);
        return false
        //apprise es una llibreria de javascript que permet mostrar alerts dins de la web y no com a missatges del navegador, també permet personalitzarlos amb diferents opcions(confirm, verify, input, YesNo...)
    }
}

$(document).on('submit', '.formAjax', function(e) {
    var form = e.currentTarget;
    //CryptoJS son una serie de llibreries que s'encarreguen de l'encriptacio de cadenes, estan separats en diferents arxius els diferents metodes d'encriptacio, aqui nomes he inclos l'md5
    form.PassEncryp.value = CryptoJS.MD5(form.Pass.value);//per tal de mostrar la contraseña encriptada ja que encara que es mostrin com * que lleig i es confus per l'usuari que l'allargada d'aquesta augmenti

    var ajx = $.ajax({
        url:form.action,
        type:form.method,
        data:$(form).serialize(),
        async: false//es important que sigui sincron per tal de tractar l'informacio que retorna ja que si fos asincron s'executaria el nostre codi abans d'arriva la resposta del servidor
    });
    return funcAjax(ajx.responseText);//cridem la funcio amb la que tractem la cadena retornada pel servido
});
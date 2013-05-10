/* El requestAnimationFrame es una funcio bastant nova de javascript que encara no funciona en tots el navegadors o
 * s'ha de cambiar una mica per cada un d'ells, es tracta d'una evolucio del setTimeOut o el setInterval, aquesta
 * a diferencia de les anteriors que generaven la iteneracio inclos quan encara no habia acavat l'altre i per tant
 * consumien memoria innecesaria, aquesta en comptes d'aixo completa la itineracio i despres en fa una de nova, pero
 * en canvi no podem varia la velocitat, sempre anira a 60 fps(mes o menys).

 * Com podem veure el que ha fet l'autor es intentar utilitzar una a una cada funcio i si cap de'elles funciona
 * acava per fer servir un setTimeOut
*/

window.requestAnimationFrame = (function(){
    //Check for each browser
    //@paul_irish function
    //Globalises this function to work on any browser as each browser has a different namespace for this
    return  window.requestAnimationFrame       ||  //Chromium 
            window.webkitRequestAnimationFrame ||  //Webkit
            window.mozRequestAnimationFrame    || //Mozilla Geko
            window.oRequestAnimationFrame      || //Opera Presto
            window.msRequestAnimationFrame     || //IE Trident?
            function(callback, element){ //Fallback function
                window.setTimeout(callback, 1000/60);       
            };
})();
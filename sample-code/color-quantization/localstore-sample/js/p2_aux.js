/*Funciones auxiliares para practica de AMM 2011*/

//Funcion auxiliar para pasar de tiempo en formato "HH:mm:ss,mmm" a milisegundos
function timestampToMillis(tc){
	var tc1 = tc.split(',');
	var tc2 = tc1[0].split(':');
	var millis = (new Number(tc2[0]*60*60) + new Number(tc2[1]*60) + new Number(tc2[2]))*1000 + new Number(tc1[1]);
	return millis;
}

//Parseo del fichero de subs
function parseSrt(data){
	var subs = [];
	// trim white space start and end
	var srt = data.replace(/^\s+|\s+$/g, '');
    var caplist = srt.split('\n\n'); 
    for (var i = 0; i < caplist.length; i=i+1) {
    	//get timecode
    	var timecode = caplist[i].match(/(\d+):(\d+):(\d+),(\d+)\s-->\s(\d+):(\d+):(\d+),(\d+)/g).join();
    	var tcpair = timecode.split(' --> ');
    	//get subtitle
        var subtitle = caplist[i].replace(/(\d+)\s(\d+):(\d+):(\d+),(\d+)\s-->\s(\d+):(\d+):(\d+),(\d+)/g, "").replace(/\n/, "");
    	subs[i] = [timestampToMillis(tcpair[0]), timestampToMillis(tcpair[1]), subtitle];
    }
    return subs;
}

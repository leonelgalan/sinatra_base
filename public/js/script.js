// http://dustindiaz.com/smallest-domready-ever
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

r(function(){
	document.getElementsByTagName('h1')[0].innerHTML = 'Hello World!'
});
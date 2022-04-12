// Configutacion para servidor local y remoto para acceso a programas Js y php

var servidor_svr_local = "/svr_local/httpdocs/";
var servidor_arhsi_local = "/arhsi_admon_local/httpdocs/";
var servidor_notaria_local = "/notaria_local/httpdocs/";
//var servidor_web = "https://svr.itbp.com.mx/httpdocs/";
var servidor_web = "https://admonarh.arhsi.com.mx/";
var servidor;
/*
window.onload = function () {
    servidor = servidor_web;
    alert("Servidor Arhsi: " + servidor);
};
*/
function elige_servidor() {
    servidor = servidor_web;
    //        alert("Servidor X1: "+servidor);
}
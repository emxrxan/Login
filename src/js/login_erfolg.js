"use-strict"

try{

    const daten = JSON.parse(document.cookie.replace("User=", ""));
    document.getElementsByClassName("welcome")[0].innerText += ` ${daten[0]}`;
    document.getElementsByTagName("title")[0].innerText += `${daten[0]}`;

} catch(fehler){

    alert("Es ist ein Fehler aufgetreten! Bitte erneut anmelden.");
    window.location.assign("index.html");
    
}
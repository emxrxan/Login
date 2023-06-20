"use-strict";

//Neues Klasse mit loginaccounts bereitstellen
const login = new Login();

//Daten vom localstorage wiederherstellen und in Login() speichern
login.registrierung.widerherstellen();

//Neue Registrierungsdaten holen
login.registrierung.hole_daten();

//Login Fromular ausfürhen
login.input_holen();

//Paswort anzeigen lassen
password_anzeigen();
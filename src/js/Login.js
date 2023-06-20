"use-strict";

class Login{
    /**
     * erzeugt ein neues Registrierungsobjekt
     */
    constructor(){
        this.registrierung = new Registraition()
    }

    /**
     * 
     * @param {cookie=key} name 
     * @param {cookie=value} wert 
     * @param {gibt an wie lange ein cookie halten kann} haltbarkeit 
     * erstellt ein neues Cookie nach einem Erfolgreichem Login
     */
    _set_cookie(name, wert, haltbarkeit){
        let cookie = `${(name)}=`;

        if (wert !== null){
            cookie += `${JSON.stringify(wert)};max-age=${haltbarkeit}; `;
        }

        document.cookie = cookie;
    }

    /**
     * 
     * @param {ein registrierter Account} element 
     * leitet zu login_erfolg.html Seite weiter
     */
    _weiterleiten(element){
        this._set_cookie("User", element, 60*60*24);
        window.location.assign("login_erfolg.html");
    }

    /**
     * 
     * @param {Eingabedaten im Login-Formular} daten 
     * überprüft ob Username und Passwort korrekt eingegben sind
     */
    _check_user(daten){
        let ceck = false;

        for(let element of this.registrierung.users){
            if(element[0] === daten.target.elements.user.value && element[1].password === daten.target.elements.password.value){
                this._weiterleiten(element);
                ceck = true;
            }
        }

        if(ceck === false){
            alert("User existier nicht oder Falsche Eingabe von Username oder Password!");
        }
    }
    
    //löscht ein bestehendendes Account
    _delete_account=  function(){
        delete_anzeigen();
        delete_option_hinzufügen(this.registrierung.users);
        delete_option_anzeigen();
        deleteAcc(this.registrierung);
    }

    //holt die eingegebenen Daten vom Login Formular
    input_holen = function(){

        const form = document.querySelectorAll(".formular > #eingabeformular-login");
        
        form.forEach((formular)=>{

            this._delete_account();
            try{
                formular.addEventListener("submit", (daten)=>{
                    daten.preventDefault();
                    this._check_user(daten);
                });

            } catch(fehler){
                alert("Es ist ein Fehler aufgetreten! Bitte später nochmal versuchen.");
                console.log(fehler);
            }
            
        });
    }

    
}
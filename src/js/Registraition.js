"use-strict";

class Registraition{
    constructor(){
        this.users = new Map();
    }

    //löscht ein Account aus this.users und speichert die liste im localstorage
    _delete_from_localstorage(value){
        this.users.delete(value);
        this._speichere_daten();
    }

    /**
     * 
     * @param {eingegebenen Daten im Formular} daten 
     * Es wird ein neuer Account in this.useres gespeichert
     */
    _user_hinzufügen = function(daten){

        if(!this.users.has(`${daten.target.elements.user.value}`)){
            this.users.set(`${daten.target.elements.user.value}`,
            {
                first_name:daten.target.elements.first_name.value,
                last_name:daten.target.elements.last_name.value,
                user:daten.target.elements.user.value,
                password:daten.target.elements.password.value
            });
            daten.target.reset();
            alert("Erfolgreich registriert.");
        } else {
            alert(`${daten.target.elements.user.value} existiert bereits!!!`);
        }
    }

    //Es wird ein neuer Account im localstorage gespeichert
    _speichere_daten = function(){
        const list = []
        localStorage.removeItem("Registraition_daten");

        for(let element of this.users){
            list.push({
                name: element[0],
                daten: element[1]
            })
        }

        localStorage.setItem("Registraition_daten", JSON.stringify(list));
    }

    //holt die daten aus dem localstorage und speichert die Daten in this.users
    widerherstellen = function(){
        const daten = localStorage.getItem("Registraition_daten");
        
        if(daten !== null){
            JSON.parse(daten).forEach(element => {
                this.users.set(`${element.name}`, element.daten);
            });
        }
    }

    //holt die eingegebenen Daten vom Regristierungs Formular
    hole_daten = function(){
        const form = document.querySelectorAll(".formular > #eingabeformular-registraition");
        
        form.forEach((formular)=>{
            formular.addEventListener("submit", (daten)=>{
                daten.preventDefault();
                this._user_hinzufügen(daten);
                this._speichere_daten();
            });
        });
    }
}
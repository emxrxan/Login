"use-strict";

//selektiert die Klasse .material-symbols-outlinedß -> funktion lässt input als text anzeigen durch klicke
const password_anzeigen = function(){
    const eye = document.querySelectorAll(".passwort-container > .material-symbols-outlined");
    eye.forEach((element) =>{
        element.addEventListener("click", (symbol)=>{
            if (symbol.target.innerText === "visibility"){
                document.getElementById("check_password").setAttribute("type", "text");
                symbol.target.innerText = "visibility_off";
            } else {
                document.getElementById("check_password").setAttribute("type", "password");
                symbol.target.innerText = "visibility";
            }
        });
    });
}

//zeigt im Delete Formular an
const delete_anzeigen = function(){
    const form = document.querySelectorAll("#eingabeformular-login > .foot-container > span");
    
    form.forEach((formular)=>{
        formular.addEventListener("click", ()=>{
            document.getElementsByClassName("delete")[0].style.display = "block";
        });
    });
}

//fügt dem delete-formular ein neues Regristiertes Account
const delete_option_hinzufügen = function(registrierung_liste){
    document.querySelector(".auswahl > .option").remove();

    let ul = document.createElement("ul");
    ul.setAttribute("class", "option");
    ul.insertAdjacentHTML("afterbegin", `<li style="display: none;"><input type="radio" name="auswahl" value="" checked></li>`)

    for(let element of registrierung_liste){
        let li = document.createElement("li");
        const input = `<input type=\"radio\" form=\"delete_account\" name=\"auswahl\" value=\"${element[0]}\" hidden>${element[0]}`;
        li.insertAdjacentHTML("afterbegin", input);
        ul.insertAdjacentElement("beforeend", li);
    }

    document.querySelector(".auswahl").insertAdjacentElement("beforeend", ul);
}

//zeigt alle möglichen Accounts im Delete Formular an die gelöscht werden könne
const delete_option_anzeigen = function(){
    document.querySelector(".auswahl > span").addEventListener("click",(a)=>{
        document.querySelector(".auswahl > .option").classList.toggle("option_anzeigen");
        const inputs = document.querySelectorAll(".auswahl > .option > li");
        inputs.forEach((input)=>{
            input.addEventListener("click",(data)=>{
                const wert = data.target.children.auswahl.value;
                input.querySelector("input").checked = true;
                document.querySelector(".auswahl > span").innerHTML = `${wert} <span id="button">&#9660;</span>`;
                document.querySelector(".auswahl > .option").classList.remove("option_anzeigen");
            });
        });
    });
}

/**
 * 
 * @param {Regristierte Accounts} users 
 * @param {gibt die eingegebenen Daten vom Delete_formular zurück} data 
 * @returns gibt einen Wahrheitswert zurück ob das Passwort mit von den Regristierungsdaten.Passowrt übereinstimmt
 */
const checkPassword = function(users, data){
    const password = users.get(data.target.elements.auswahl.value).password;
    return data.target.check_password.value === password ? true : false;
};

/**
 * 
 * @param {Regristierter Accounts} registraition 
 * Ein Account wird gelöscht sowohl im registraition und im localstorage
 */
const deleteAcc = function(registraition){
    document.querySelector("#delete_account").addEventListener("submit", (data)=>{
        data.preventDefault();
        if(data.submitter.innerText === "Delete" && data.target.elements.auswahl.value !== "" && checkPassword(registraition.users, data)){
            registraition._delete_from_localstorage((data.target.elements.auswahl.value));
            delete_option_hinzufügen(registraition.users);
            document.getElementsByClassName("delete")[0].style.display = "none";
            document.querySelectorAll(".auswahl > .option > li")[0].querySelector("input").checked = true;
            document.querySelector(".auswahl > span").innerHTML = `Choose an account: <span id="button">&#9660;</span>`;
        } else if (data.submitter.innerText === "Break") {
            document.getElementsByClassName("delete")[0].style.display = "none";
            document.querySelector(".auswahl > span").innerHTML = `Choose an account: <span id="button">&#9660;</span>`;
            data.target.reset();
        } else {
            alert("Kein ein Account auswählen oder Passwort falsch!");
        }
        data.target.reset();
    });
}
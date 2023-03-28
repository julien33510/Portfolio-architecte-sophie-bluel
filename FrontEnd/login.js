//au click sur le bouton se connecter

    const boutonSeConnecter = document.querySelector("#boutonSeConnecter");
    boutonSeConnecter.addEventListener("click", async function(event){
        event.preventDefault();
        let emailConnection = document.querySelector("#email").value;
        let passConnection = document.querySelector("#pass").value;
        
        let user = {
            "email": emailConnection,
            "password": passConnection
        };

        try {
            let reponseConnect = await fetch('http://localhost:5678/api/users/login',{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (reponseConnect.status == 200) {
                console.log ("200");
                reponseConnect = await reponseConnect.json();
                let token = reponseConnect.token;
                console.log(token);
                window.localStorage.setItem("tokenSession", token);
                document.location.href="index.html"; 
                
            } else if (reponseConnect.status == 401) {
                // Mauvais mot de passe

                //On remet les label "Email" et "Mot de passe" comme au départ
                const userNotFound = document.querySelector("form div.divChamp label[for='email']");
                userNotFound.innerHTML = "E-mail";
                const userNotAuthorized = document.querySelector("form div.divChamp label[for='pass']");
                userNotAuthorized.innerHTML = "Mot de passe";
                // on indique l'erreur sur l'email
                let span = document.createElement("span");
                span.classList.add("error");
                span.innerText = " - Mot de passe incorrect";
                userNotAuthorized.appendChild(span);
            } else {
                //Utilisateur inconnu - Reponse 404

                //On remet les label "Email" et "Mot de passe" comme au départ
                const userNotFound = document.querySelector("form div.divChamp label[for='email']");
                userNotFound.innerHTML = "E-mail";
                const userNotAuthorized = document.querySelector("form div.divChamp label[for='pass']");
                userNotAuthorized.innerHTML = "Mot de passe";
                // on indique l'erreur sur le user
                userNotFound.innerHTML = "E-mail"; // Si on ne le fait pas à chaque essai on ajoute le txt d'erreur
                let span = document.createElement("span");
                span.classList.add("error");
                span.innerText = " - Utilisateur inconnu";
                userNotFound.appendChild(span);
            } } catch (e) {
                const errorDiv = document.querySelector("section.SectionLogin");
                let errorAlert = document.createElement("div");
                errorAlert.classList.add("error");
                errorAlert.innerText = "Problème de connexion serveur";
                errorDiv.appendChild(errorAlert);
            }
    });

//Affichage du password

    const boutonEye = document.querySelector(".field-icon");
    boutonEye.addEventListener("click",function(){
        
        let inputField = document.querySelector("div.divChamp input#pass");
        let inputType = inputField.getAttribute("type");
        let iconEye = document.querySelector("div.divChamp span.field-icon i");
        
        if (inputType == "password") {
            inputField.removeAttribute("type");
            inputField.setAttribute("type","text");
            iconEye.classList.remove("fa-eye");
            iconEye.classList.add("fa-eye-slash");
        } else {
            inputField.removeAttribute("type");
            inputField.setAttribute("type","password");
            iconEye.classList.remove("fa-eye-slash");
            iconEye.classList.add("fa-eye");
        };
    })




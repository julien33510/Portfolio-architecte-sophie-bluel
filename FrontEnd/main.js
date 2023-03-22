//import des fonctions et variables
import {getWorks,worksWiew,getCategory,createFilter,filterBouton,modeEdition,openModal} from "./function2.js";

//Déclaration des variables
export let reponseWorks ; // contient un array avec les travaux issus du back-end
export let reponseWorksCategory ; // contient un array avec les travaux issus du back-end
export let token ; //token de connexion attribué par l'API


// ----------------------- //


//fonction de modification de la variable reponseWorks depuis un autre module
export function modifyreponseWorks (value) {
    reponseWorks = value;
}

//Fonction d'ajout de valeur dans reponseWorks depuis un autre module
export function pushreponseWorks (value) {
    reponseWorks.push(value)
}

// récupération des catégories de travaux dans le back-end
reponseWorksCategory = await getCategory ();
// construction des filtres par catégorie dans l'index
createFilter(reponseWorksCategory)



// récupération des travaux du back-end
reponseWorks = await getWorks ();
// construction de la vue des travaux
worksWiew(reponseWorks);


//Gestion des boutons filtres
    const boutonFiltre = document.querySelectorAll('.filter');
    boutonFiltre.forEach(element => {
        element.addEventListener('click', filterBouton);
    });

//gestion du token
token = window.localStorage.getItem("tokenSession");
    if (token !== null) {
        //modification de la nav login en logout et insertion de la fonction logout

        const loginNavElement = document.querySelector("#login");
        loginNavElement.innerHTML = "logout";
        loginNavElement.removeAttribute("href");
        loginNavElement.addEventListener("click", function(){
            localStorage.clear();
            document.location.href="index.html"; 
        });

        //ajout des éléments html du mode édition 
        modeEdition();
        const boutonModal = document.querySelectorAll(".js-modal").forEach(a => {
            a.addEventListener("click", openModal);
        });

    

}
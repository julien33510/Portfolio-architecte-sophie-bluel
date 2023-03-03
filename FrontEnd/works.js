//import de fonction
    import { modeEdition } from "./modeEdition.js";
    import { openModal } from "./modal.js";
    import { closeModal } from "./modal.js";
    import {stopPropagation} from "./modal.js";
    import {createModal} from "./modal.js"; 



// Récupération des travaux depuis le backend
    export let reponseWorks ;
    try { 
        const reponse = await fetch ("http://localhost:5678/api/works");
        reponseWorks = await reponse.json();
    } catch (error) {
        reponseWorks = "Problème de connexion serveur";
    }

    export function modifyreponseWorks (value) {reponseWorks = value}



//Affichage des travaux
    function worksWiew(works) {
        let gallery = document.querySelector(".gallery");
        gallery.innerHTML = '';
        if (reponseWorks == "Problème de connexion serveur") {
            const errorAlert = document.createElement("div");
            errorAlert.classList.add("error");
            errorAlert.innerHTML = "Problème de connexion serveur";
            gallery.appendChild(errorAlert);
        } else {
            for (let i = 0 ; i < works.length ; i++ ) {
                const workElement = document.createElement("figure");
                workElement.id = "id"+ works[i].id;
                const workImg = document.createElement("img");
                workImg.crossOrigin = "anonymous";
                workImg.src = works[i].imageUrl;
                workImg.title = works[i].title;
                const workFigcaption = document.createElement("figcaption");
                workFigcaption.innerText = works[i].title;
                workElement.appendChild(workImg);
                workElement.appendChild(workFigcaption);

                gallery.appendChild(workElement);
            }
        }
        
    }

    worksWiew(reponseWorks);


//bouton filtres
    //fonction de suppression de la classe "Activate" dans l'ensemble des boutons "filtre"
    function supprActivate () {
        let allChildrenFilter = document.querySelectorAll(".filter");
        allChildrenFilter.forEach((item)=>item.classList.remove("activate"));
    }
    //bouton Filtre => Tous
    const boutonFiltreTous = document.querySelector("#tous");
    boutonFiltreTous.addEventListener("click", function(){
        worksWiew(reponseWorks);
        supprActivate ();
        boutonFiltreTous.classList.add("activate");
    })
    //bouton Filtre => Objets
    const boutonFiltreObjet = document.querySelector("#objets");
    boutonFiltreObjet.addEventListener("click", function(){
        const reponseWorksObjet = reponseWorks.filter(i => i.categoryId == 1);
        worksWiew(reponseWorksObjet);
        supprActivate ();
        boutonFiltreObjet.classList.add("activate");
    })
    //bouton Filtre => appartements
    const boutonFiltreAppartements = document.querySelector("#appartements");
    boutonFiltreAppartements.addEventListener("click", function(){
        const reponseWorksAppartements = reponseWorks.filter(i => i.categoryId == 2);
        worksWiew(reponseWorksAppartements);
        supprActivate ();
        boutonFiltreAppartements.classList.add("activate");
    })
    //bouton Filtre => hotels
    const boutonFiltreHotels = document.querySelector("#hotels");
    boutonFiltreHotels.addEventListener("click", function(){
        const reponseWorksHotels = reponseWorks.filter(i => i.categoryId == 3);
        worksWiew(reponseWorksHotels);
        supprActivate ();
        boutonFiltreHotels.classList.add("activate");
    })




//Gestion du token

    export let token = window.localStorage.getItem("tokenSession");

    if (token !== null) {
        //modification de la nav login en logout et insertion de la fonction logout

        const loginNavElement = document.querySelector("nav ul li a");
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


//récupération des catégories de travaux
export let reponseWorksCategory ;
try {
    const category = await fetch ("http://localhost:5678/api/categories");
    reponseWorksCategory = await category.json();
} catch (error) {
    
}

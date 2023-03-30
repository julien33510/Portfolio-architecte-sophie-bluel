//Import de fonction d'autre module
import {modifyreponseWorks, pushreponseWorks} from "./main.js";

//Déclaration des variables
import {reponseWorks, token, reponseWorksCategory} from "./main.js";
let cardSelect ; //on stocke l'id de la card sélectionnée dans la modale
let asideModalOrigine //la précédente modale

// ----------------------------------- //

// récupère les travaux depuis le back-end. Renvoie un message d'erreur en cas d'échec
export async function getWorks () {

    let reponseWorks;
    try { 
        const reponse = await fetch ("http://localhost:5678/api/works");
        reponseWorks = await reponse.json();
    } catch (error) {
        reponseWorks = "Problème de connexion serveur";
    }
    return reponseWorks;
}


// récupération des catégories de travaux dans le back-end
export async function getCategory () {

    let uniqueReponseCategory;
    try {
        const category = await fetch ("http://localhost:5678/api/categories");
        let reponseCategory = await category.json();
        
        // construction d'un objet Set pour s'assurer de l'unicité des valeurs de catégorie
        uniqueReponseCategory = [...new Set(reponseCategory)];


    } catch (error) {
        uniqueReponseCategory = "Problème de connexion serveur"
    }
    return uniqueReponseCategory;
}

//crée des filtres à partir de l'array en paramètre
export function createFilter (category) {
    const filter = document.querySelector('.filters');

    if (category != "Problème de connexion serveur") {
        for (let i = 0; i < category.length; i++) {
            const div = document.createElement('div');
            div.id = category[i].id;
            div.classList.add('filter');
            div.innerHTML=category[i].name;
            filter.appendChild(div);
        } 
    } else {
        const div = document.createElement('div');
        div.classList.add('error');
        div.innerHTML=category;
        filter.appendChild(div);
    }  
}

//fonction de création d'une card travaux dans la page index
export function createWorksView (worksModalID, worksModalURL, worksModalTitle) {
    
    const workElement = document.createElement("figure");
    workElement.id = "id"+ worksModalID;
    const workImg = document.createElement("img");
    workImg.crossOrigin = "anonymous";
    workImg.src = worksModalURL;
    workImg.title = worksModalTitle;
    const workFigcaption = document.createElement("figcaption");
    workFigcaption.innerText = worksModalTitle;
    workElement.appendChild(workImg);
    workElement.appendChild(workFigcaption);
    return workElement;

}

// Construit l'affichage de tous les travaux centenus dans le paramètre "works".
export function worksWiew(works) {

// utilise la fonction "createWorksView" qui construit une card pour chaque élément.
    let gallery = document.querySelector(".gallery");
    if (works == "Problème de connexion serveur") {
        const errorAlert = document.createElement("div");
        errorAlert.classList.add("error");
        errorAlert.innerHTML = "Problème de connexion serveur";
        const galleryParent = gallery.parentNode;
        galleryParent.insertBefore(errorAlert,gallery);
        // gallery.appendChild(errorAlert);
    } else {
        gallery.innerHTML = '';
        for (let i = 0 ; i < works.length ; i++ ) {
            let workElement = createWorksView(works[i].id, works[i].imageUrl, works[i].title);
            gallery.appendChild(workElement);
        }
    }
}

// gestion des boutons filtres
export function filterBouton(e){

    //recupérer quel filtre a été cliqué
    let filterID = e.target.getAttribute('id');


    if (filterID == 'tous') {
        // Activation du bouton 'tous'
        const boutonFiltreTous = document.querySelector("#tous");
        worksWiew(reponseWorks);
        supprActivate ();
        boutonFiltreTous.classList.add("activate");
    } else {
        const reponseWorksFiltered = reponseWorks.filter(i => i.categoryId == filterID);
        worksWiew(reponseWorksFiltered);
        supprActivate ();
        const buttonFiltered = document.getElementById(filterID);
        buttonFiltered.classList.add("activate");

    }
};

//fonction de suppression de la classe "Activate" dans l'ensemble des boutons "filtre"
export function supprActivate () {

    let allChildrenFilter = document.querySelectorAll(".filter");
    allChildrenFilter.forEach((item)=>item.classList.remove("activate"));
}

// ajoute les éléments du mode édition
export function modeEdition() {
   
    //bannière en haut de page
    const divBanniere = document.createElement("div");
    divBanniere.classList.add("divModeEdition");

    const iBanniere = document.createElement("i");
    iBanniere.classList.add("fa-regular", "fa-pen-to-square", "fontModeEdition");
    divBanniere.appendChild(iBanniere);

    const pBanniere = document.createElement("p");
    pBanniere.classList.add("fontModeEdition");
    pBanniere.innerHTML="Mode édition";
    divBanniere.appendChild(pBanniere);

    const buttonBanniere = document.createElement("div");
    buttonBanniere.classList.add("buttonModeEdition");
    buttonBanniere.innerHTML="publier les changements";
    divBanniere.appendChild(buttonBanniere);

    const body = document.querySelector("body");
    body.prepend(divBanniere);

    //Creation du couple "icon" et "modifier"
    const coupleIconModifier = document.createElement("div");
    coupleIconModifier.classList.add("modeEditionMain", "js-modal");
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    const pModifier = document.createElement("p");
    pModifier.classList.add("fontModeEditionMain");
    pModifier.innerHTML="modifier";
    coupleIconModifier.appendChild(icon);
    coupleIconModifier.appendChild(pModifier);

    //ajout du couple créer ci-dessus au-dessus du texte d'intro
    const ajout1 = document.querySelector("main section#introduction article");
    ajout1.prepend(coupleIconModifier);

    //ajout d'un clone du couple créer ci-dessus au-dessous de la photo d'intro
    const ajout2 = document.querySelector("main section#introduction figure");
    const coupleIconModifierClone1 = coupleIconModifier.cloneNode(true);
    coupleIconModifierClone1.setAttribute("style","margin-left: 50px; margin-top: 5px;");
    ajout2.appendChild(coupleIconModifierClone1);

    //ajout du couple à droite du titre h2 "Mes projets"
        //clone du couple et ajout d'un h2 en début de div
    const coupleIconModifier2 = document.createElement("div");
    coupleIconModifier2.classList.add("modeEditionMain2");
    coupleIconModifier2.append(coupleIconModifier.cloneNode(true));
    const titreH2 = document.createElement("h2");
    titreH2.innerHTML = "Mes Projets";
    titreH2.setAttribute("style", "padding-right: 15px;")
    coupleIconModifier2.prepend(titreH2);
        //remplacement du h2 inital
    const h2Initial = document.querySelector("section#portfolio h2");
    const h2InitialParent = h2Initial.parentNode;
    h2InitialParent.replaceChild(coupleIconModifier2,h2Initial);
    
}

//fonction de selection de card
export function listernerDivCard (e){
    let idSelectCardModal = e.target.closest('div.card').getAttribute('id');
    if (cardSelect == null) { //premier clic
        cardSelect = idSelectCardModal ;
        modalSelectCard(cardSelect);
    } else if (cardSelect == idSelectCardModal) { //clique 2 fois sur le même
        modalDeselectcard (cardSelect);
        cardSelect = null;
    } else { //clique sur une autre card
        modalDeselectcard (cardSelect);
        cardSelect = idSelectCardModal ;
        modalSelectCard(cardSelect);
    }   
}
    
//Création d'un loader
export function getLoader() {
    const divLoader = document.createElement('div');
    divLoader.classList.add('loader');
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('loader__spinner');
    divLoader.appendChild(divSpinner);
    return divLoader;
}
 
//modal si suppression SANS selection de card
function suppWithoutCard () {
    const aside = document.createElement('aside');
    aside.classList.add('modal');
    aside.id='modal2';
    const modalMini = document.createElement('div');
    modalMini.classList.add('modalMini','js-stop-propagation');
    aside.appendChild(modalMini);
    const pTitre = document.createElement('p');
    pTitre.classList.add('modalTitreAlert');
    pTitre.innerHTML="Supprimer une gallerie";
    modalMini.appendChild(pTitre);
    const divIcon = document.createElement('div');
    divIcon.style.color = ('indianred');
    modalMini.appendChild(divIcon);
    const iconAlert = document.createElement('i');
    iconAlert.classList.add('fa-solid', 'fa-circle-exclamation', 'fa-2xl');
    divIcon.appendChild(iconAlert);
    const pText = document.createElement('p');
    pText.innerHTML="Vous devez sélectionner un projet.";
    modalMini.appendChild(pText);
    const bouton = document.createElement('button');
    bouton.classList.add('okBouton');
    bouton.type = 'button';
    bouton.innerHTML='OK';
    modalMini.appendChild(bouton);
    
    document.querySelector('body').appendChild(aside);

    const eventBouton = document.querySelector('.okBouton');
    eventBouton.addEventListener('click', function fermrtureModalSuppWithoutCard(e) {
        e.preventDefault();
        const target = document.querySelector('#modal2');
        eventBouton.removeEventListener('click', fermrtureModalSuppWithoutCard);
        document.querySelector('body').removeChild(target);
    })
}
    
//modal si suppression AVEC selection de card
async function suppWithCard (i) {
    //filtre reponseWorks pour trouver 
    const filtreReponseWorks = reponseWorks.filter( r => r.id == i);

    const aside = document.createElement('aside');
    aside.classList.add('modal');
    aside.id='modal3';
    const modalMini = document.createElement('div');
    modalMini.classList.add('modalMini','js-stop-propagation');
    aside.appendChild(modalMini);
    const pTitre = document.createElement('p');
    pTitre.classList.add('modalTitreAlert');
    pTitre.innerHTML="Supprimer une gallerie";
    modalMini.appendChild(pTitre);
    const divImg = document.createElement('div');
    divImg.classList.add('js-loader');
    divImg.style='position: relative;';
    const imgSupp = document.createElement('img');
    imgSupp.crossOrigin ='anonymous';

    imgSupp.src = filtreReponseWorks[0].imageUrl;
    imgSupp.title = filtreReponseWorks[0].title ;
    imgSupp.style = 'width: 100%';
    divImg.appendChild(imgSupp);
    modalMini.appendChild(divImg);
    const pText = document.createElement('p');
    pText.innerHTML="Voulez-vous supprimer la gallerie <br><span style='text-decoration: underline;'>" + filtreReponseWorks[0].title +"</span>";
    modalMini.appendChild(pText);
    const divButton = document.createElement('div');
    const annulBouton = document.createElement('button');
    annulBouton.classList.add('okBouton');
    annulBouton.type = 'button';
    annulBouton.innerHTML='Annuler';
    annulBouton.id ='annulBouton';
    divButton.appendChild(annulBouton);
    const suppBouton = document.createElement('button');
    suppBouton.classList.add('suppBouton');
    suppBouton.type = 'button';
    suppBouton.innerHTML='Supprimer';
    suppBouton.id ='suppBouton';
    divButton.appendChild(suppBouton);
    modalMini.appendChild(divButton);
    
    
    document.querySelector('body').appendChild(aside);

    //Bouton annuler
    const annulerBouton = document.querySelector('#annulBouton');
    annulerBouton.addEventListener('click', function fermetureModalSuppWithCard(e) {
        e.preventDefault();
        const target = document.querySelector('#modal3');
        target.classList.add('modalFadeOut');
        cardSelect = null ;
        modalDeselectcard(i);
        window.setTimeout(function(){
            annulerBouton.removeEventListener('click', fermetureModalSuppWithCard);
            document.querySelector('body').removeChild(target);
        },500)

        
    })

    //bouton Supprimer
    const eventSuppBouton = document.querySelector('#suppBouton');
    eventSuppBouton.addEventListener('click',async function suppBoutonModalSuppWithCard(e) {
        e.preventDefault();
        let loader = getLoader();
        const addLoader = document.querySelector('.js-loader');
        addLoader.appendChild(loader);
        addLoader.classList.add('modalSelectCard');

        let reponseApiSupp ;

        //Interrogation du fetch
        try { 
            let reponseDelete = await fetch ('http://localhost:5678/api/works/'+i, {
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token
            }
            });
            if (reponseDelete.ok == true) {
            const divSupp = document.querySelector('.modalSelectCard');
            document.querySelector('.modal-galerie').removeChild(divSupp);
            let idWork = "figure#id"+i;
            const figureSupp = document.querySelector(idWork);
            document.querySelector('#portfolio .gallery').removeChild(figureSupp);
            reponseApiSupp = filtreReponseWorks[0].title + " a bien été supprimé.";
            cardSelect = null ;
            //modification de reponseWorks
            modifyreponseWorks(reponseWorks.filter (r => r.id != i));
            
            
            }
            else {
            reponseApiSupp = "Erreur 401 - Une erreur s'est produite ! Merci d'essayer à nouveau";
            cardSelect = null ;
            modalDeselectcard(i);
            }
            
        } catch (error) {
            reponseApiSupp = "Erreur 500 - Le serveur est indisponible ! Merci d'essayer à nouveau";
            cardSelect = null ;
            modalDeselectcard(i);
        }

        const target = document.querySelector('#modal3');
        target.classList.add('modalFadeOut');
        window.setTimeout(function(){
            eventSuppBouton.removeEventListener('click', suppBoutonModalSuppWithCard);
            document.querySelector('body').removeChild(target);
        },500)

        const insertMessage = document.createElement('p');
        insertMessage.classList.add('error', 'modalFadeOut2s');
        insertMessage.innerHTML = reponseApiSupp;
        const targetInsertMessage = document.querySelector('#modal1 .modal-wrapper hr');
        const parentTargetInsertMessage = targetInsertMessage.parentNode;
        parentTargetInsertMessage.insertBefore(insertMessage,targetInsertMessage);


        window.setTimeout(function(){
            parentTargetInsertMessage.removeChild(insertMessage);
        },2000)     

    })


}
    
//Sélection d'une carte dans la modale de modification des travaux
function modalSelectCard (newId) {
    let newIdCard = ".js-cardId"+newId;
    let newCard = document.querySelector(newIdCard);
    newCard.classList.add('modalSelectCard');
}
    
//Désélection d'une carte dans la modale de modification des travaux
function modalDeselectcard (oldId) {
    let oldIdCard = ".js-cardId"+oldId;
    let oldCard = document.querySelector(oldIdCard);
    oldCard.classList.remove('modalSelectCard');
}
    
//Création des cartes dans la modale de modification
export async function createAllCardsModal(worksModal) {
//construction de la balise div.modal-galerie
    const divModalGalerie = document.createElement('div');
    divModalGalerie.classList.add('modal-galerie');

    try {

        for (let i = 0 ; i < worksModal.length ; i++ ) {
            let divCard = createCardModal(worksModal[i].id, worksModal[i].imageUrl, worksModal[i].title);
            
            divModalGalerie.appendChild(divCard);
            }

    } catch (error) {
        const errorAlert = document.createElement("div");
        errorAlert.classList.add("error");
        errorAlert.innerText = "Problème de connexion serveur";
        divModalGalerie.appendChild(errorAlert);
    }

    return divModalGalerie;
}
    
//Création de la modale de modification
export async function createModal (){

    //la balise aside
    const aside = document.createElement ('aside');
    aside.setAttribute("id","modal1");
    aside.setAttribute("class","modal");
    // la balise div.modal-wrapper
    const divModalWrapper = document.createElement ('div');
    divModalWrapper.classList.add('modal-wrapper','js-stop-propagation');
    aside.appendChild(divModalWrapper)
    //la balise div.cross
    const cross = document.createElement('div');
    cross.classList.add('cross');
    const crossLogo = document.createElement('i');
    crossLogo.classList.add('fa-solid','fa-xmark','fa-xl');
    cross.appendChild(crossLogo);
    divModalWrapper.appendChild(cross);
    //la balise p.modalTitre
    const pModalTitre = document.createElement('p');
    pModalTitre.classList.add('modalTitre');
    pModalTitre.innerHTML="Galerie Photo";
    divModalWrapper.appendChild(pModalTitre);
    
    const divModalGalerie = await createAllCardsModal(reponseWorks);
    divModalWrapper.appendChild(divModalGalerie);

    //ligne de separation
    const ligne = document.createElement('hr');
    divModalWrapper.appendChild(ligne);

    //bouton
    const bouton = document.createElement('div');
    bouton.classList.add('divBouton');
    const inputBouton = document.createElement('input');
    inputBouton.id = 'boutonAjouter';
    inputBouton.type = 'submit';
    inputBouton.value ='Ajouter une photo';
    bouton.appendChild(inputBouton);
    divModalWrapper.appendChild(bouton);

    //bouton supprimer 
    const supp = document.createElement('div');
    supp.classList.add('divBouton');
    const inputSupp = document.createElement('p');
    inputSupp.id = 'boutonSupp';
    inputSupp.innerHTML ='Supprimer la galerie';
    supp.appendChild(inputSupp);
    divModalWrapper.appendChild(supp);

    return aside;
}
    
//Gestion de l'ouverture de la modale
export async function openModal (e){
    e.preventDefault();
    
    //suppression des filtres en pages d'accueil
        //Creation d'un evenement 'click' sur le bouton filtre 'Tous' pour réinitialiser les filtres
        //Sinon, on aura du mal à supprimer dans la page un travail qui n'apparaît pas
        const clickTous = new CustomEvent('click', {
            detail: {
                id: 'tous'
            }
        });
        document.querySelector('#tous').dispatchEvent(clickTous);

    //génération de la modale entièrement en js avec createModal
    const asideModal = await createModal();
    const bodyBalise = document.querySelector('body');
    bodyBalise.appendChild(asideModal);

    //fermeture de la modal
    const boutonFermetureModal = document.querySelector(".cross");
    boutonFermetureModal.addEventListener("click", closeModal);
    const target = document.querySelector("#modal1");
    target.addEventListener('click', closeModal);
    document.querySelector('.js-stop-propagation').addEventListener('click', stopPropagation);

    //event listener de sélection de card
    const selectCardModal = document.querySelectorAll('div.card').forEach(a =>{
        a.addEventListener('click', listernerDivCard)
    })

    //event listener de suppression de card
    const suppCard = document.querySelector('#boutonSupp');
    suppCard.addEventListener('click', function(e){
    
        e.preventDefault();
        if (cardSelect === undefined || cardSelect ===  null) {
            suppWithoutCard();
        } else {
            suppWithCard(cardSelect);
        }
    })

    //event listener ajout de travaux
    const ajoutCard = document.querySelector('#boutonAjouter');
    ajoutCard.addEventListener('click', addWorkModal);

}  
    
//Gestion de la fermeture de la modale 
export function closeModal (e){
    e.preventDefault();

    const target = document.querySelector("#modal1");
    target.classList.add('modalFadeOut');
    window.setTimeout(function(){
        target.style = "display:none";
        //target.classList.remove('modalFadeOut');
        target.removeEventListener('click',closeModal);
        document.querySelector('.js-stop-propagation').removeEventListener('click',stopPropagation);
        const boutonFermetureModal = document.querySelector(".cross");
        boutonFermetureModal.removeEventListener('click', closeModal);
        document.querySelector('body').removeChild(target);
    },500);
}
    
//Fonction d'arrêt de propagation d'un évènement
export function stopPropagation (e) {
    e.stopPropagation();
}


// fonction de création de card dans la modale "Modifier"
export function createCardModal (worksModalID, worksModalURL, worksModalTitle) {
    const divCard = document.createElement('div');
    divCard.classList.add('card', 'js-cardId'+ worksModalID);
    divCard.id = worksModalID;
    const divCardPhoto = document.createElement('div');
    divCardPhoto.classList.add('cardPhoto');
    divCard.appendChild(divCardPhoto);
    const workImg = document.createElement('img');
    workImg.crossOrigin = "anonymous";
    workImg.src = worksModalURL;
    workImg.title = worksModalTitle;
    divCardPhoto.appendChild(workImg);
    const divGarbage = document.createElement('div');
    divGarbage.classList.add('garbage');
    const divGarbageIcon = document.createElement('i');
    divGarbageIcon.classList.add('fa-solid','fa-trash-can', 'fa-xs');
    divGarbage.appendChild(divGarbageIcon);
    divCardPhoto.appendChild(divGarbage);
    const divEditer = document.createElement('div');
    divEditer.classList.add('editer');
    divEditer.innerHTML="éditer";
    divCard.appendChild(divEditer);
    return divCard
}

async function ajoutProjet (e) {
    e.preventDefault();
    
    //Vérification des inputs :
    //Présence d'une image, d'un titre (il y a toujours une catégorie)
    //ajout de message alerte 
    let formImage = document.querySelector('#boutonAjouterPhoto').files;
    let formTitle = document.querySelector('#title').value;
    let formCategory = document.querySelector('#category').value;

    if (formImage.length === 0) {  //Pas d'image sélectionnée
        const message = "Vous devez sélectionner une photo";
        const ajoutPhotoForm = document.querySelector('.ajoutPhotoForm');
        alert(message, ajoutPhotoForm, 5, 'after');
    }
    if (formTitle === '') {
        const message = "Vous devez ajouter un titre";
        const ajoutFormTitle = document.querySelector('label[for="title"]');
        alert(message, ajoutFormTitle, 5, 'after');
    }
    if (formImage.length === 0 || formTitle === '') {
        return
    }

    let formData = new FormData();

    formData.append('image', formImage[0], formImage[0].name);
    formData.append('title', formTitle);
    formData.append('category', formCategory);

    try { 
        let reponse = await fetch ('http://localhost:5678/api/works', {
                method:'POST',
                headers:{
                    "accept": "application/json",
                    "Authorization": "Bearer "+ token
                    },
                body: formData
                });
        let reponseAdd = await reponse.json()
        
        
        if (reponse.status == 201) { //l'ajout est OK
            
            
            //ajout du Work dans la variable reponseWorks, qui gère permettra le trie de la page index sans refaire un appel API
            let reponseWorksNew = {
                id: reponseAdd.id,
                title: reponseAdd.title,
                imageUrl: reponseAdd.imageUrl,
                categoryId: reponseAdd.categoryId,
                userId: reponseAdd.userId
                };
            pushreponseWorks(reponseWorksNew);

            //ajout du Work dans la page d'accueil
            const gallery = document.querySelector(".gallery");
            let workElement = createWorksView(reponseAdd.id, reponseAdd.imageUrl, reponseAdd.title);
            gallery.appendChild(workElement);


            //ajout dans la précedente modale
            const modalGalerie = asideModalOrigine.querySelector('.modal-galerie');
            let workElementModal = createCardModal(reponseAdd.id, reponseAdd.imageUrl, reponseAdd.title);
            modalGalerie.appendChild(workElementModal);

            //ajout d'un event listener sur la nouvelle card dans la modale
            workElementModal.addEventListener('click', listernerDivCard);

            //fermeture de la modale "ajouter"
            removeAddWorkModal();
            

        } else {
            //Modale 
            pbAjoutWork()
            
            
        }

    } catch (error) {
            pbAjoutWork()
    }
}

function updateImageDisplay() {
    let input = document.querySelector('input#boutonAjouterPhoto');
    let curFile = input.files ;
    let sizeFile = curFile[0].size;

    if (curFile.length === 0) {
        return
    } else if (sizeFile <= 4000000){ //la taille de l'image est inférieure à 4mo
        
        const preview = document.querySelector('#preview');
        while(preview.firstChild) {
            preview.removeChild(preview.firstChild);
        };
        let src = window.URL.createObjectURL(curFile[0]);
        const img = document.createElement('img');
        img.src = src ;
        img.style = 'height : 204px;';
        preview.appendChild(img);
        img.addEventListener('click', function() {
            document.querySelector('#boutonAjouterPhoto').click();
        })
    } else { // la taille de l'imge est supérieure
        //ajout un message d'alerte avec la fonction alert
        const ajoutPhotoForm = document.querySelector('.ajoutPhotoForm');
        const message = "La taille de votre image doit être inférieure à 4mo"
        alert(message, ajoutPhotoForm, 5, 'after');
    }

}

export function addWorkModal (e) {
    e.preventDefault();

    //Creation de la modale ajout de photo
    const divModalMini = document.createElement('div');
    divModalMini.classList.add('modalMini','js-stop-propagation','modalTransInRight');

    //la balise div.cross
    const cross = document.createElement('div');
    cross.classList.add('arrowsLeft');
    const arrow = document.createElement('i');
    arrow.classList.add('fa-solid','fa-arrow-left','fa-xl');
    cross.appendChild(arrow);
    divModalMini.appendChild(cross);
    const pModalTitreAlert = document.createElement('p');
    pModalTitreAlert.classList.add('modalTitreAlert');
    pModalTitreAlert.innerHTML="Ajout photo";
    divModalMini.appendChild(pModalTitreAlert);
    const formModal = document.createElement('form');
    formModal.id = 'formAjoutWork'
    divModalMini.appendChild(formModal);
    const divAjoutPhotoForm = document.createElement('div');
    divAjoutPhotoForm.classList.add('ajoutPhotoForm');
    formModal.appendChild(divAjoutPhotoForm);
    const preview = document.createElement('div')
    preview.id = 'preview';
    preview.style = 'position : absolute ;'
    divAjoutPhotoForm.appendChild(preview);
    const iImag = document.createElement('i')
    iImag.classList.add('fa-solid','fa-image','fa-6x');
    iImag.style = 'margin-top: 20px; color: #CBD6DC;'
    divAjoutPhotoForm.appendChild(iImag);

    const divBouton = document.createElement('div');
    divBouton.classList.add('divBouton');
    divAjoutPhotoForm.appendChild(divBouton);

    const boutonAjouterPhotoLabel = document.createElement('label');
    boutonAjouterPhotoLabel.setAttribute('for','boutonAjouterPhoto');
    boutonAjouterPhotoLabel.classList.add('boutonAjoutPhotoForm');
    boutonAjouterPhotoLabel.innerHTML= "+ Ajouter Photo"
    divBouton.appendChild(boutonAjouterPhotoLabel);
 
    const boutonAjouterPhotoInput = document.createElement('input');
    boutonAjouterPhotoInput.classList.add('boutonAjoutPhotoForm');
    boutonAjouterPhotoInput.id='boutonAjouterPhoto';
    boutonAjouterPhotoInput.value ='+ Ajouter Photo';
    boutonAjouterPhotoInput.type ='file';
    boutonAjouterPhotoInput.accept ='.jpg, .jpeg, .png';
    divBouton.appendChild(boutonAjouterPhotoInput)
    boutonAjouterPhotoInput.addEventListener('change',updateImageDisplay)

    const pIndication = document.createElement('p');
    pIndication.innerHTML='jpg, png : 4mo max'
    divAjoutPhotoForm.appendChild(pIndication);
    const ajoutInputForm = document.createElement('div');
    ajoutInputForm.classList.add('ajoutInputForm');
    formModal.appendChild(ajoutInputForm);
    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for','title');
    labelTitle.innerHTML='Titre';
    ajoutInputForm.appendChild(labelTitle);
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type','text');
    inputTitle.setAttribute('name','title');
    inputTitle.setAttribute('id','title');
    ajoutInputForm.appendChild(inputTitle);
    const labelCategory = document.createElement('label');
    labelCategory.setAttribute('for','category');
    labelCategory.innerHTML='Catégorie';
    ajoutInputForm.appendChild(labelCategory);

    const inputCategory = document.createElement('select');
    inputCategory.setAttribute('list','list-category');
    inputCategory.setAttribute('name','category');
    inputCategory.setAttribute('id','category');
    ajoutInputForm.appendChild(inputCategory);

    const hr = document.createElement('hr');
    ajoutInputForm.appendChild(hr);
    const ajoutBoutonFormDiv = document.createElement('div');
    ajoutBoutonFormDiv.classList.add('ajoutBoutonForm')
    formModal.appendChild(ajoutBoutonFormDiv);
    const button = document.createElement('input');
    button.type ='submit'
    button.value ='Valider';
    ajoutBoutonFormDiv.appendChild(button);

    formModal.addEventListener('submit',ajoutProjet)

    
    //récupération des catégories
    for (let index = 0; index < reponseWorksCategory.length; index++) {
        const element = document.createElement('option');
        element.value = reponseWorksCategory[index].id;
        element.innerHTML = reponseWorksCategory[index].name;
        inputCategory.appendChild(element);
    }

    //Transition antre la modale principale et la modale ajout
    asideModalOrigine = document.querySelector('aside#modal1').firstChild; //on récupère le node de l'ancienne modale
    asideModalOrigine.classList.remove('modalTransInleft');
    asideModalOrigine.classList.add('modalTransOutleft');
    window.setTimeout(function(){
        document.querySelector('aside#modal1').removeChild(asideModalOrigine);
        document.querySelector('aside#modal1').appendChild(divModalMini);
        //retrait des event liteners de la precedente modale
        const target = document.querySelector("#modal1");
        target.removeEventListener('click', closeModal);
        document.querySelector('.js-stop-propagation').removeEventListener('click', stopPropagation);
        //Ajout des event liteners
        target.addEventListener('click', removeAddWorkModal)
        document.querySelector('.js-stop-propagation').addEventListener('click', stopPropagation);
        const targetArrows = document.querySelector('.arrowsLeft');
        targetArrows.addEventListener('click', removeAddWorkModal);
    },500)

}

function removeAddWorkModal() {

    const targetChild = document.querySelector('aside#modal1').firstChild;
    targetChild.classList.remove('modalTransInRight');
    targetChild.classList.add('modalTransOutRight')
    asideModalOrigine.classList.add('modalTransInleft')
    asideModalOrigine.classList.remove('modalTransOutleft')
    window.setTimeout(function(){
        document.querySelector('aside#modal1').removeChild(targetChild);
        document.querySelector('aside#modal1').appendChild(asideModalOrigine);
        //retrait des event liteners de la precedente modale
        const target = document.querySelector("#modal1");
        target.removeEventListener('click',removeAddWorkModal);
        document.querySelector('.js-stop-propagation').removeEventListener('click', stopPropagation);
        //Ajout des event liteners
        target.addEventListener('click', closeModal);
        document.querySelector('.js-stop-propagation').addEventListener('click', stopPropagation);
        //retrait de la classe modalTransInleft
        const asideModalOrigineChild = document.querySelector('aside#modal1').firstChild;
    },500)
    
}

function pbAjoutWork () {
    const aside = document.createElement('aside');
    aside.classList.add('modal');
    aside.id='modal2';
    const modalMini = document.createElement('div');
    modalMini.classList.add('modalMini','js-stop-propagation');
    aside.appendChild(modalMini);
    const pTitre = document.createElement('p');
    pTitre.classList.add('modalTitreAlert');
    pTitre.innerHTML="Ajout d'un projet";
    modalMini.appendChild(pTitre);
    const divIcon = document.createElement('div');
    divIcon.style.color = ('indianred');
    modalMini.appendChild(divIcon);
    const iconAlert = document.createElement('i');
    iconAlert.classList.add('fa-solid', 'fa-circle-exclamation', 'fa-2xl');
    divIcon.appendChild(iconAlert);
    const pText = document.createElement('p');
    pText.innerHTML="Une erreur s'est produite. Merci d'essayer à nouveau";
    modalMini.appendChild(pText);
    const bouton = document.createElement('button');
    bouton.classList.add('okBouton');
    bouton.type = 'button';
    bouton.innerHTML='OK';
    modalMini.appendChild(bouton);
    
    document.querySelector('body').appendChild(aside);

    const eventBouton = document.querySelector('.okBouton');
    eventBouton.addEventListener('click', function fermrtureModalSuppWithoutCard(e) {
        e.preventDefault();
        const target = document.querySelector('#modal2');
        eventBouton.removeEventListener('click', fermrtureModalSuppWithoutCard);
        document.querySelector('body').removeChild(target);
    })
}
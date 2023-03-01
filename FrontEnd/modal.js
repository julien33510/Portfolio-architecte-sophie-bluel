import { reponseWorks } from "./works.js";
import { token } from "./works.js";

let cardSelect ; //on stocke l'id de la card sélectionnée dans la modale
let newReponseWorks

//Création d'un loader
function getLoader() {
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
         console.log('http://localhost:5678/api/works/'+i);
         console.log(reponseDelete.ok);
         console.log(reponseDelete);
         if (reponseDelete.ok == true) {
            const divSupp = document.querySelector('.modalSelectCard');
            document.querySelector('.modal-galerie').removeChild(divSupp);
            let idWork = "figure#id"+i;
            console.log(idWork);
            const figureSupp = document.querySelector(idWork);
            console.log(figureSupp);
            document.querySelector('#portfolio .gallery').removeChild(figureSupp);
            reponseApiSupp = filtreReponseWorks[0].title + " a bien été supprimé.";
            cardSelect = null ;
            //modification du newReponseWorks
            console.log(reponseWorks);
            console.log('i = '+ i);
            newReponseWorks = reponseWorks.filter (r => r.id != i);
            console.log(newReponseWorks);
            
            
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

      if (reponseWorks !== newReponseWorks ) {
         reponseWorks = newReponseWorks
      };
   })


}

function modalSelectCard (newId) {
   let newIdCard = ".js-cardId"+newId;
   let newCard = document.querySelector(newIdCard);
   newCard.classList.add('modalSelectCard');
}

function modalDeselectcard (oldId) {
   let oldIdCard = ".js-cardId"+oldId;
   let oldCard = document.querySelector(oldIdCard);
   oldCard.classList.remove('modalSelectCard');
}

export async function createCardModal(worksModal) {

//construction de la balise div.modal-galerie
   const divModalGalerie = document.createElement('div');
   divModalGalerie.classList.add('modal-galerie');

   try {

      for (let i = 0 ; i < worksModal.length ; i++ ) {
         const divCard = document.createElement('div');
         divCard.classList.add('card', 'js-cardId'+worksModal[i].id);
         divCard.id = worksModal[i].id;
         const divCardPhoto = document.createElement('div');
         divCardPhoto.classList.add('cardPhoto');
         divCard.appendChild(divCardPhoto);
         const workImg = document.createElement('img');
         workImg.crossOrigin = "anonymous";
         workImg.src = worksModal[i].imageUrl;
         workImg.title = worksModal[i].title;
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
   
   const divModalGalerie = await createCardModal(reponseWorks);
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


export async function openModal (e){
    e.preventDefault();

   //deuxième version avec génération de la modale entièrement en js avec createModal
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
      a.addEventListener('click',function listernerDivCard (e){
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
      })
   })

   //event listener de suppression de card
   const suppCard = document.querySelector('#boutonSupp');
   suppCard.addEventListener('click', function(e){
      e.preventDefault();
      if (cardSelect === undefined || cardSelect ===  null) {
         suppWithoutCard();
      } else {
         console.log(cardSelect);
         console.log(reponseWorks)
         suppWithCard(cardSelect);
      }
   })

 }

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

export function stopPropagation (e) {
   e.stopPropagation();
 }
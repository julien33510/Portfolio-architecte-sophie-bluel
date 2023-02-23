export async function createModal (){
//  <aside id="modal1" class="modal" style="display:none" >
//    <div class="modal-wrapper js-stop-propagation">
//       <div class="cross">
//          <i class="fa-solid fa-xmark fa-xl"></i>
//       </div>
//       <p class="modalTitre">Galerie Photo</p>
//       <div class="modal-galerie">
//          
//            <!-- les cartes à éditer-->
//
//       </div>
//</div>
//</aside>
//  

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
   //la balise div.modal-galerie
   const divModalGalerie = document.createElement('div');
   divModalGalerie.classList.add('modal-galerie');
   divModalWrapper.appendChild(divModalGalerie);

   // Récupération des travaux depuis le backend
   const reponseModal = await fetch ("http://localhost:5678/api/works");
   const worksModal = await reponseModal.json();

   // Génération des cards
   for (let i = 0 ; i < worksModal.length ; i++ ) {
      const divCard = document.createElement('div');
      divCard.classList.add('card');
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

   return aside;
}


export async function openModal (e){
    e.preventDefault();

   //premiere version d'ouverture avec modal.html
   //  const target = document.querySelector("#modal1");
   //  target.style.display = null ;
   //  target.addEventListener('click', closeModal);
   //  document.querySelector('.js-stop-propagation').addEventListener('click', stopPropagation);


   //deuxième version avec génération de la modale entièrement en js avec createModal
   const asideModal = await createModal();
   console.log(asideModal);
   const bodyBalise = document.querySelector('body');
   bodyBalise.appendChild(asideModal);

    //fermeture de la modal
    const boutonFermetureModal = document.querySelector(".cross");
    boutonFermetureModal.addEventListener("click", closeModal);
    const target = document.querySelector("#modal1");
    target.addEventListener('click', closeModal);
    document.querySelector('.js-stop-propagation').addEventListener('click', stopPropagation);
 }

 export function closeModal (e){
    e.preventDefault();

   //premiere version d'ouverture avec modal.html
   const target = document.querySelector("#modal1");
   target.classList.add('modalFadeOut');
   window.setTimeout(function(){
      target.style = "display:none";
      target.classList.remove('modalFadeOut');
   },500);
   target.removeEventListener('click',closeModal);
   document.querySelector('.js-stop-propagation').removeEventListener('click',stopPropagation);
   const boutonFermetureModal = document.querySelector(".cross");
   boutonFermetureModal.removeEventListener('click', closeModal);
   document.querySelector('body').removeChild(target);
 
    

 }

 export function stopPropagation (e) {
   e.stopPropagation();
 }
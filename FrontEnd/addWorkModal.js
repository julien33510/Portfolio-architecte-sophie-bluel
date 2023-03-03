import {closeModal, stopPropagation} from './modal.js';
import {reponseWorksCategory} from './works.js';

let asideModalOrigine //la précédente modale

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
    divModalMini.appendChild(formModal);
    const divAjoutPhotoForm = document.createElement('div');
    divAjoutPhotoForm.classList.add('ajoutPhotoForm');
    formModal.appendChild(divAjoutPhotoForm);
    const iImag = document.createElement('i')
    iImag.classList.add('fa-solid','fa-image','fa-6x');
    iImag.style = 'margin-top: 20px; color: #CBD6DC;'
    divAjoutPhotoForm.appendChild(iImag);
    const divBouton = document.createElement('div');
    divBouton.classList.add('divBouton');
    divAjoutPhotoForm.appendChild(divBouton);
    const boutonAjouterPhotoInput = document.createElement('input');
    boutonAjouterPhotoInput.classList.add('boutonAjoutPhotoForm');
    boutonAjouterPhotoInput.id='boutonAjouterPhoto';
    boutonAjouterPhotoInput.value ='+ Ajouter Photo';
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
    const inputCategory = document.createElement('input');
    inputCategory.setAttribute('list','list-category');
    inputCategory.setAttribute('name','category');
    inputCategory.setAttribute('id','category');
    ajoutInputForm.appendChild(inputCategory);
    const dataList = document.createElement('datalist');
    dataList.id = 'list-category'
    ajoutInputForm.appendChild(dataList);
    const hr = document.createElement('hr');
    ajoutInputForm.appendChild(hr);
    const ajoutBoutonFormDiv = document.createElement('div');
    ajoutBoutonFormDiv.classList.add('ajoutBoutonForm')
    formModal.appendChild(ajoutBoutonFormDiv);
    const button = document.createElement('button');
    button.innerHTML ='Valider';
    ajoutBoutonFormDiv.appendChild(button);
   
    //récupération des catégories
    for (let index = 0; index < reponseWorksCategory.length; index++) {
        const element = document.createElement('option');
        element.value = reponseWorksCategory[index].name;
        element.id = reponseWorksCategory[index].id;
        dataList.appendChild(element);
    }

    //Transition antre la modale principale et la modale ajout
    asideModalOrigine = document.querySelector('aside#modal1').firstChild;
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
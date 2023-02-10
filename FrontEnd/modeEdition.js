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
    coupleIconModifier.classList.add("modeEditionMain");
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
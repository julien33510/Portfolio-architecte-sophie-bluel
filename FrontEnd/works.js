
// Récupération des travaux depuis le backend
const reponse = await fetch ("http://localhost:5678/api/works");
const repnoseWorks = await reponse.json();

console.log (repnoseWorks);

//Affichage des travaux
function worksWiew(works) {
    for (let i=0 ; i < works.length ; i++ ) {
        const workElement = document.createElement("figure");
        const workImg = document.createElement("img");
        workImg.crossOrigin = "anonymous";
        workImg.src = works[i].imageUrl;
        workImg.title = works[i].title;
        const workFigcaption = document.createElement("figcaption");
        workFigcaption.innerText = works[i].title;
        workElement.appendChild(workImg);
        workElement.appendChild(workFigcaption);

        document.querySelector(".gallery").appendChild(workElement);
    }
}

worksWiew(repnoseWorks);



// Récupération des travaux depuis le backend
const reponse = await fetch ("http://localhost:5678/api/works");
const repnoseWorks = await reponse.json();

/*console.log (repnoseWorks); */

//Affichage des travaux

import { Chart } from "chart.js";

export function listenerAvis() {
	const piecesElements = document.querySelectorAll(".fiches article button");

	for (let i = 0; i < piecesElements.length; i++) {
		piecesElements[i].addEventListener("click", async function (event) {
			// Récupération de l'atribut data-id
			const id = event.target.dataset.id;
			const response = await fetch("http://localhost:8081/pieces/" + id + "/avis");
			const avis = await response.json();

			// Sauvegarde des avis dans le localStorage
			window.localStorage.setItem("avis-piece-" + id, JSON.stringify(avis));



			// Récupération de la balise article pour la pièce désirée
			const pieceElement = event.target.parentElement;
			afficherAvis(pieceElement, avis)	;	
		});
	}
}

export function afficherAvis(pieceElement, avis){
	// Création balise p pour regrouper tous les avis
	const avisElement = document.createElement("p");

	for(let i=0; i < avis.length; i++){
		avisElement.innerHTML += avis[i].utilisateur + ": " + avis[i].commentaire + avis[i].etoiles + "<br>";
	}
	pieceElement.appendChild(avisElement);
}

const formulaireAvis = document.querySelector(".formulaire-avis");
formulaireAvis.addEventListener("submit", function (event){
	event.preventDefault();
	
	// Création objet du nouvel avis
	const avis = {
		pieceId: event.target.querySelector("[name=piece-id]").value,
		utilisateur: event.target.querySelector("[name=utilisateur]").value,
		commentaire: event.target.querySelector("[name=commentaire]").value,
		nbEtoiles: event.target.querySelector("[name=nb-etoiles]").value
	};

	// Creation charge utile au format JSON
	const chargeUtile = JSON.stringify(avis);

	// Appel fonction fetch
	fetch("http://localhost:8081/avis", {
		method:"POST",
		headers:{"Content-Type": "application/json"},
		body: chargeUtile
	});
});

// Calcul nombre total de commentaires par quantité d'étoiles attribuées
const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
const nb_commentaires = [0,0,0,0,0];

for(let commentaire of avis)[
	nb_commentaires[commentaire.nbEtoiles - 1]++,
]

const labels = ["5", "4", "3", "2", "1"];

// Données du graphique
const data = {
	labels: labels,
	datasets: [{
		label:"Etoiles attribuées",
		data: nb_commentaires.reverse(),
		backgroundColor: "rgba(255, 230, 0, 1",
	}],

};

// OBJ de configuration final
const config = { 
	type: "bar",
	data: data,
	options:{
		indexAxis: "y",		
	},
}

// Rendu graphique dans l'element canvas
const graphiqueAvis = new Chart(
	document.querySelector("#graphique-avis"),
	config,
);
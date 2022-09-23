import { listenerAvis } from "./avis.js";

// Récupération des pièces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then((pieces) => pieces.json());

// Fonction qui génère la page web
function generatePieces(pieces) {
	for (let i = 0; i < pieces.length; i++) {
		// Récupération de l'élément du DOM qui accueillera les fiches
		const sectionFiches = document.querySelector(".fiches");
		//Balise dédié à une pièce automobile
		const pieceElement = document.createElement("article");

		//Image
		const imageElement = document.createElement("img");
		imageElement.src = pieces[i].image;
		pieceElement.appendChild(imageElement);
		//Nom
		const nomElement = document.createElement("h2");
		nomElement.innerText = pieces[i].nom;
		pieceElement.appendChild(nomElement);

		//Prix + € ou €€€
		const prixElement = document.createElement("p");
		prixElement.innerText =
      "Prix : " +
      pieces[i].prix +
      "(" +
      (pieces[i].prix < 35 ? "€" : "€€€") +
      ")";

		//Categorie
		const categorieElement = document.createElement("p");
		categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
		pieceElement.appendChild(prixElement);

		//Description
		const descriptionElement = document.createElement("p");
		descriptionElement.innerText = pieces[i].description
			? pieces[i].description
			: "Pas de description pour le moment";
		pieceElement.appendChild(descriptionElement);

		//Disponibilité
		const disponibiliteElement = document.createElement("p");
		disponibiliteElement.innerText = pieces[i].disponibilite
			? "En stock"
			: "Rupture de stock";
		pieceElement.appendChild(disponibiliteElement);

		// Bouton pour afficher les avis
		const avisElement = document.createElement("button");
		avisElement.innerText = "Afficher les avis";
		avisElement.dataset.id = pieces[i].id; // Attribut data-id="XX"
		pieceElement.appendChild(avisElement);

		// On rattache la balise article à la section fiches
		sectionFiches.appendChild(pieceElement);
	}

	// Ajout listeners sur les boutons avis
	listenerAvis();
	
}

generatePieces(pieces);

// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
	const piecesReordonnees = Array.from(pieces);
	piecesReordonnees.sort(function (a, b) {
		return a.prix - b.prix;
	});
	// Effacement + regénération de la page
	document.querySelector(".fiches").innerHTML = "";
	generatePieces(pieces);
});

// Ajout listener pour filtrer les pièces inférieur ou égale à 35€
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
	const piecesFiltrees = pieces.filter(function (pieces) {
		return pieces.prix <= 35;
	});
	// Effacement + regénération de la page
	document.querySelector(".fiches").innerHTML = "";
	generatePieces(piecesFiltrees);
});

// Ajout listener pour afficher les pièces avec une description uniquement
const boutonDescription = document.querySelector(".btn-description");
boutonDescription.addEventListener("click", function () {
	const piecesDescription = pieces.filter(function (pieces) {
		return (pieces.description = true);
	});
	console.log(piecesDescription);
});

// Ajout listener pour trier par odre de prix decroissant
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
	const piecesDecroissant = Array.from(pieces);
	piecesDecroissant.sort(function (a, b) {
		return b.prix - a.prix;
	});
	//console.log(piecesDecroissant);
});

// Récupération du nom des pièces
const noms = pieces.map((piece) => piece.nom);
//console.log(noms);

// Boucle for inversé
for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].prix > 35) {
		noms.splice(i, 1);
	}
}

const elementAbordables = document.createElement("ul");

for (let i = 0; i < noms.length; i++) {
	const nomElement = document.createElement("li");
	nomElement.innerText = noms[i];
	elementAbordables.appendChild(nomElement);
}

document.querySelector(".abordables").appendChild(elementAbordables);

///////////////////////////  Verions Perso ///////////////////////////
// Récupération du nom des pièces
//const pieceDispo = pieces.map(piece => piece.nom + " - " + piece.prix);

//// Boucle for inversé
//for (let i = pieces.length - 1; i >= 0; i--){
//	if (pieces[i].disponibilite == false ){
//		pieceDispo.splice(i,1);
//	}
//}
//console.log(pieceDispo);

//const elementDisponible = document.createElement("ul");

//for (let i=0; i < pieceDispo.length; i++){
//	const disponibiliteElement = document.createElement("li");
//	disponibiliteElement.innerText = pieceDispo[i] + "€";
//	elementDisponible.appendChild(disponibiliteElement);
//}

//document.querySelector(".disponibles").appendChild(elementDisponible);
///////////////////////////  Verions Perso ///////////////////////////

///////////////////////////  Verions cours ///////////////////////////

const nomDisponible = pieces.map((piece) => piece.nom);
const prixDisponible = pieces.map((piece) => piece.prix);

for (let i = pieces.length - 1; i >= 0; i--) {
	if (pieces[i].disponibilite === false) {
		nomDisponible.splice(i, 1);
		prixDisponible.splice(i, 1);
	}
}

const elementDisponible = document.createElement("ul");

for (let i = 0; i < nomDisponible.length; i++) {
	const disponibiliteElement = document.createElement("li");
	disponibiliteElement.innerText =
    nomDisponible[i] + " - " + prixDisponible[i] + " €";
	elementDisponible.appendChild(disponibiliteElement);
}

document.querySelector(".disponibles").appendChild(elementDisponible);
//console.log(nomDisponible);
///////////////////////////  Verions cours ///////////////////////////

const maxPrice = document.querySelector("#max-price");
maxPrice.addEventListener("input", function () {
	const piecesFiltrees = pieces.filter(function (piece) {
		return piece.prix <= maxPrice.value;
	});

	// Effacement + regénération de la page
	document.querySelector(".fiches").innerHTML = "";
	generatePieces(piecesFiltrees);
	// Affichage du prix maximum selectionné
	const price = document.querySelector(".price");
	price.innerText = `${maxPrice.value}` + "€";
});

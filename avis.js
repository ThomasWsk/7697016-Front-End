export function listenerAvis() {
	const piecesElement = document.querySelector(".fiches article button");

	for (let i = 0; i < piecesElement.length; i++) {
		piecesElement[i].addEventListener("click", async function (event) {
			// Récupération de l'atribut data-id
			const id = event.target.dataset.id;
			fetch("http://localhost:8081/pieces/" + id + "/avis");
		});
	}
}

// Creamos una función para traer las preguntas de la API
const answer = function () {
	let temporal;
	fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple")
		.then(response => response.json())
		.then(preguntas => {

			console.log(preguntas.results[1])
			const listaPreguntas = preguntas.results;

			//Accedemos a la respuesta correcta de la pregunta 7
			const respPregunta_7 = listaPreguntas[6].correct_answer;
			console.log("Respuesta de la pregunta 7:", respPregunta_7);

			// Acceder al texto de la pregunta 2
			const pregunta_2 = listaPreguntas[1].questions;
			console.log("Pregunta 2:", pregunta_2);

			//Accedemos a una respuesta incorrecta de la pregunta 10
			const respIncorrectaPreg_10 = listaPreguntas[9].incorrect_answers[0];
			console.log("Repuesta incorrecta de la pregunta 10:", respIncorrectaPreg_10);

		}).catch(error => console.error("Error al obtener las preguntas:", error));
}
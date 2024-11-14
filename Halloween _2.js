(function () {
	localStorage.clear
})();

// Creamos una función para traer las preguntas de la API
const answer = function () {
	
	fetch(
		"https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple"
	)
		.then((response) => response.json())
		.then((preguntas) => {
			//console.log(preguntas.results[1])
			const listaPreguntas = preguntas.results;
			
			let preguntasInfoTotal = listaPreguntas.map((pregunta) => {
				return {
					pregunta: pregunta.question,
					respuestaCorrecta: pregunta.correct_answer,
					repuestasIncorrectas: pregunta.incorrect_answers
				};
			});
			
			
			console.log(preguntasInfoTotal);
			// Guardo las preguntas en el localstore
			localStorage.setItem("preguntas", JSON.stringify(preguntasInfoTotal));

		})
		.catch((error) => console.error("Error al obtener las preguntas:", error));
};

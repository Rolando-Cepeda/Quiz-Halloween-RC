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
			
			const listaPreguntas = preguntas.results;
			// Traigo las 10 preguntas con sus respectiva información.
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









			//Accedemos a la respuesta correcta de la pregunta 7
			const respCorrectaPreg_7 = listaPreguntas[6].correct_answer;
			// Acceder al texto de la pregunta 2
			const pregunta_2 = listaPreguntas[1].question;
			//Accedemos a una respuesta incorrecta de la pregunta 10
			const respIncorrectaPreg_10 = listaPreguntas[9].incorrect_answers[0];


			//Mostramos los datos en el html, eleccionamos el contenedor.
			let contenedor = document.getElementById("contenedor");
			contenedor.innerHTML = "";

			// Creamos los elementos(etiqueta p) para cada dato y los añadimos al contenedor.
			let pregunta2User = document.createElement("p");
			pregunta2User.textContent = `Pregunta 2: ${pregunta_2}`;
			contenedor.appendChild(pregunta2User);

			let respCorrectaUser_7 = document.createElement("p");
			respCorrectaUser_7.textContent = `Respuesta correcta de la pregunta 7: ${respCorrectaPreg_7}`;
			contenedor.appendChild(respCorrectaUser_7);

			let respIncorrectaUser_10 = document.createElement("p");
			respIncorrectaUser_10.textContent = `Respuesta incorrecta de la pregunta 10: ${respIncorrectaPreg_10}`;
			contenedor.appendChild(respIncorrectaUser_10)

		})
		.catch((error) => console.error("Error al obtener las preguntas:", error));
};

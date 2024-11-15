(function () {
	localStorage.clear();
})();

//Función para crear las preguntas
const crearPreguntas = (preguntas) => {
	const listaPreguntas = preguntas.results;

	const preguntasInfoTotal = listaPreguntas.map((pregunta) => {
		return {
			pregunta: pregunta.question,
			respuestaCorrecta: pregunta.correct_answer,
			repuestasIncorrectas: pregunta.incorrect_answers
		};
	});
	//console.log(preguntasInfoTotal);

	// Guardo las preguntas en el localstore
	localStorage.setItem("preguntas", JSON.stringify(preguntasInfoTotal));

	//Accedemos al contenedor principal y lo limpiamos
	const contenedor = document.getElementById("contenedor_preguntas");
	contenedor.innerHTML = "";


	preguntasInfoTotal.forEach((preguntaObj, index) => {
		const divPregunta = document.createElement("div");
		divPregunta.className = "pregunta";

		// Creamos el texto de la pregunta
		const tituloPregunta = document.createElement("h3");
		tituloPregunta.textContent = `${index + 1}. ${preguntaObj.pregunta}`;
		divPregunta.appendChild(tituloPregunta);

		// Mezclamos respuestas (correctas e incorrectas)
		const todasRespuestas = [
			preguntaObj.respuestaCorrecta,
			...preguntaObj.respuestasIncorrectas
		].sort(() => Math.random() - 0.5);

		//creamos los botones para las respuestas:
		todasRespuestas.forEach((respuesta) => {
			const botonRespuesta = document.createElement("button");
			botonRespuesta.textContent = respuesta;
			botonRespuesta.className = "opcion";
		});
	})

}


// Creamos una función para traer las preguntas de la API
const answer = function () {

	fetch(
		"https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple"
	)
		.then((response) => response.json())
		.then((preguntas) => crearPreguntas(preguntas))
		//console.log(preguntas.results[1])

		.catch((error) => console.error("Error al obtener las preguntas:", error));
};

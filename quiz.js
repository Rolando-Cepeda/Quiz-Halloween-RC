(function () {
  localStorage.clear();
})();

let currentQuestionIndex = 0;
let score = 0;
const preguntas = [
  {
      pregunta: "¿Cuál es el origen de Halloween?",
      respuestas: ["México", "Irlanda", "Egipto", "Japón"],
      respuestaCorrecta: "Irlanda",
  },
  {
      pregunta: "¿Qué significa 'Halloween'?",
      respuestas: [
          "Noche de Brujas",
          "Víspera de Todos los Santos",
          "Fiesta del Miedo",
          "Día de los Muertos",
      ],
      respuestaCorrecta: "Víspera de Todos los Santos",
  },
];

/* Obtener el nombre del jugador */
let jugador = prompt("Ingresa tu nombre para empezar el Quiz:");

/* Función para decodificar caracteres HTML */
function decodeHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.documentElement.textContent;
}


/* Mostrar preguntas */
function mostrarPregunta() {
  const contenedor = document.getElementById("contenedor_preguntas");
  contenedor.innerHTML = "";

  if (currentQuestionIndex >= preguntas.length) {
      guardarResultados();
      window.location.href = "results.html";
      return;
  }

  const preguntaActual = preguntas[currentQuestionIndex];
  const tituloPregunta = document.createElement("h2");
  tituloPregunta.textContent = decodeHTML(preguntaActual.pregunta);

  contenedor.appendChild(tituloPregunta);

  preguntaActual.respuestas.forEach((respuesta) => {
      const botonRespuesta = document.createElement("button");
      botonRespuesta.textContent = decodeHTML(respuesta);
      botonRespuesta.className = "opcion";

      botonRespuesta.addEventListener("click", () => {
          if (respuesta === preguntaActual.respuestaCorrecta) {
              score++;
              botonRespuesta.style.backgroundColor = "green";
          } else {
              botonRespuesta.style.backgroundColor = "red";
          }
          setTimeout(() => {
              currentQuestionIndex++;
              mostrarPregunta();
          }, 1000);
      });

      contenedor.appendChild(botonRespuesta);
  });
}

document.addEventListener("DOMContentLoaded", mostrarPregunta);

/* Guardar resultados */
function guardarResultados() {
  const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
  resultados.push({ jugador, fecha: new Date().toLocaleDateString(), puntuacion: score });
  localStorage.setItem("resultados", JSON.stringify(resultados));
}

/* Obtener preguntas de la API */
fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple")
  .then((response) => response.json())
  .then((data) => {
      preguntas.push(
          ...data.results.map((pregunta) => ({
              pregunta: pregunta.question,
              respuestas: [...pregunta.incorrect_answers, pregunta.correct_answer].sort(() => Math.random() - 0.5),
              respuestaCorrecta: pregunta.correct_answer,
          }))
      );
      mostrarPregunta();
  })
  .catch((error) => console.error("Error al obtener preguntas:", error));

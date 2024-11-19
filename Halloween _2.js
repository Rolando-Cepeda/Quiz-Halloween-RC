(function () {
  localStorage.clear();
})();

// 1.- Creamos una función para traer las preguntas de la API
const answer = function () {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple"
  )
    .then((response) => response.json())
    .then((preguntas) => crearPreguntas(preguntas))
    .catch((error) => console.error("Error al obtener las preguntas:", error));
};

/*2.- Función para CREAR las preguntas solo con los campos necesarios*/
const crearPreguntas = (preguntas) => {
  // Acceso a los resultados de la API.
  // listaPreguntas almacena este array para ser utilizado más adelante.
  const listaPreguntas = preguntas.results; // accede a la propiedad results del objeto preguntas
  console.log(listaPreguntas);
  

  //2.2.-crea un nuevo array llamado preguntasInfoTotal, transformando cada elemento del array listaPreguntas
  const preguntasInfoTotal = listaPreguntas.map((pregunta) => {
    return {
      categoria: pregunta.category,
      pregunta: pregunta.question,
      respuestaCorrecta: pregunta.correct_answer,
      repuestasIncorrectas: pregunta.incorrect_answers
    };
  });

  /* 3.- Convierto preguntasInfoTotal[] a JSON, ya que LocalStorage solo almacena datos en forma de text.*/
  const jsonPreguntas = JSON.stringify(preguntasInfoTotal);
  // 3.1.- Una vez convertidas, guardo las preguntas en el localstore(clave, valor)
  localStorage.setItem("preguntas_quiz", jsonPreguntas);

  /*4.- Accedemos al contenedor principal y lo limpiamos*/
  const div_contenedor = document.getElementById("contenedor_preguntas");
  div_contenedor.innerHTML = "";

  /*5.- Recuperamos la información de localStorage con parse(JSON => Objeto*/
  const preguntasGuardadas = JSON.parse(localStorage.getItem("preguntas_quiz"));
  console.log(preguntasGuardadas);
  

  /*6.- Recorremos cada elemento actual del array(callback) y su indice(index)*/
  preguntasGuardadas.forEach((preguntaObjInfo, index) => {
    const divPregunta = document.createElement("div");
    divPregunta.className = "preguntaUser";

    //6.1.- Creamos el texto individual de cada pregunta
    const tituloPregunta = document.createElement("h3");
    tituloPregunta.textContent = `${index + 1}. ${preguntaObjInfo.pregunta}`;
    divPregunta.appendChild(tituloPregunta);

    //6.2.- Mezclamos respuestas (correctas e incorrectas)
    const todasRespuestas = [
      preguntaObjInfo.respuestaCorrecta,
      preguntaObjInfo.respuestasIncorrectas,

    ].sort(() => Math.random() - 0.5);
    

    //creamos los botones para las respuestas:
    todasRespuestas.forEach((respuesta) => {
      const botonRespuesta = document.createElement("button");
      botonRespuesta.textContent = respuesta;
      botonRespuesta.className = "opcion";

      // Agregar evento al botón
      botonRespuesta.addEventListener("click", () => {
        if (respuesta === preguntaObjInfo.respuestaCorrecta) {
          botonRespuesta.style.backgroundColor = "green";
        } else {
          botonRespuesta.style.backgroundColor = "red";
        }
      });

      divPregunta.appendChild(botonRespuesta);
    });

    div_contenedor.appendChild(divPregunta);
  });
};

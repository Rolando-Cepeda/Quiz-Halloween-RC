function comenzarQuiz() {
	const nombreUsuario = document.getElementById("nameUsuario").value;
	console.log("Intentando guardar el nombre:", nombreUsuario);

	if (nombreUsuario === "") {
		alert("Por favor, ingresa tu nombre antes de comenzar.");
		return;
	}


	localStorage.setItem("nombreJugador", nombreUsuario);
	window.location.href = "question.html";
}


/* Mostrar gráfica */
const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
const ctx = document.getElementById("chartResultados").getContext("2d");

if (resultados.length > 0) {
	new Chart(ctx, {
		type: "bar", // Cambia a "line" si prefieres la versión anterior
		data: {
			labels: resultados.map((r) => `${r.jugador} (${r.fecha})`),
			datasets: [
				{
					label: "Puntuaciones",
					data: resultados.map((r) => r.puntuacion),
					backgroundColor: "#f39e36",
					borderColor: "#f8f8f8",
					borderWidth: 2,
					hoverBackgroundColor: "#f28e15",
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: true,
					labels: {
						color: "#f8f8f8",
					},
				},
			},
			scales: {
				x: {
					ticks: {
						color: "#f8f8f8",
					},
				},
				y: {
					ticks: {
						color: "#f8f8f8",
					},
					beginAtZero: true,
				},
			},
		},
	});
} else {
	const chartContainer = document.querySelector(".chart-container");
	chartContainer.innerHTML = "<p>No hay resultados aún. ¡Juega una partida para ver tu puntuación!</p>";
}

/* 
const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
const ctx = document.getElementById("chartResultados").getContext("2d");

if (resultados.length > 0) {
	new Chart(ctx, {
		type: "line",
		data: {
			labels: resultados.map((r) => r.fecha),
			datasets: [
				{
					label: "Puntuaciones",
					data: resultados.map((r) => r.puntuacion),
					borderColor: "#ff5733",
					borderWidth: 2,
					fill: false,
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: true,
					position: "top",
				},
			},
		},
	});
} else {
	ctx.fillText("No hay resultados aún", 150, 75);
}

 */

/* Definimos est funcion comenzarQuiz que guardara el nombre del jugador en local storage y redigirá
a la página de preguntas, una vez que le demos al botón Comenzar Quiz */
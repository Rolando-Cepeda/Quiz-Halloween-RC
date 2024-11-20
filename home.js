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
                    backgroundColor: "rgba(255, 87, 51, 0.6)",
                    borderColor: "rgba(255, 87, 51, 1)",
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255, 120, 90, 0.8)",
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

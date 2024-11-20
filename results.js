/* 4.- GUarda los resultados en localStorage*/
const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
const score = parseInt(localStorage.getItem("score"), 10);
const scoreActual = { fecha: new Date().toLocaleDateString(), puntuacion: score };

resultados.push(scoreActual);
localStorage.setItem("resultados", JSON.stringify(resultados));

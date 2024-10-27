const containerVoices = document.getElementById('containerVoices');
const btn = document.getElementById('btn');
const text = document.getElementById('text');

let voices = [];
let utterance = new SpeechSynthesisUtterance(); // Convertir texto a voz

function textToSpeak() {
    utterance.text = text.value;
    window.speechSynthesis.speak(utterance); 
}

function loadVoices() {
    voices = window.speechSynthesis.getVoices(); // Obtener lista de voces disponibles
    console.log("Voces cargadas:", voices);

    // Asegurarse de que haya voces disponibles
    if (voices.length === 0) {
        console.log("Reintentando cargar voces...");
        setTimeout(loadVoices, 100);
        return;
    }

    // Limpiar el selector antes de agregar nuevas opciones
    containerVoices.innerHTML = '';

    // Filtrar y cargar solo voces en español
    voices
        .filter(voice => voice.lang.startsWith("es")) // Filtrar por idioma español
        .forEach(el => {
            const option = document.createElement("option");
            option.textContent = `${el.name} (${el.lang})`;
            option.value = el.name;
            containerVoices.appendChild(option);
        });
}

// Escuchar el evento `voiceschanged` en caso de que las voces se carguen después
window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

document.addEventListener("DOMContentLoaded", loadVoices);

document.addEventListener("click", (e) => {
    if (e.target === btn) {
        textToSpeak();
    }
});

document.addEventListener("change", (e) => {
    if (e.target === containerVoices) {
        utterance.voice = voices.find(voice => voice.name === e.target.value);
    }
});

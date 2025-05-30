import './style.css';


let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
const maxIntentos = 10;


const inputNumero = document.getElementById('numero');
const botonAdivinar = document.getElementById('adivinar');
const botonReiniciar = document.getElementById('reiniciar');
const mensaje = document.getElementById('mensaje');
const contador = document.getElementById('contador');

function actualizarContador() {
    contador.textContent = maxIntentos - intentos;
}

function reiniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    inputNumero.value = '';
    mensaje.textContent = '';
    botonAdivinar.disabled = false;
    botonReiniciar.style.display = 'none';
    actualizarContador();
}

function manejarAdivinanza() {
    const numeroJugador = parseInt(inputNumero.value);
    intentos++;
    actualizarContador();
    
    if (isNaN(numeroJugador)) {
        mensaje.textContent = 'Por favor, ingresa un número.';
        return;
    }
    
    if (numeroJugador < 1 || numeroJugador > 100) {
        mensaje.textContent = 'El número debe estar entre 1 y 100.';
        return;
    }
    
    if (numeroJugador === numeroSecreto) {
        mensaje.textContent = `¡Felicidades! Adivinaste en ${intentos} intentos.`;
        botonAdivinar.disabled = true;
        botonReiniciar.style.display = 'inline-block';
    } 
    else if (intentos >= maxIntentos) {
        mensaje.textContent = `¡Perdiste! El número era ${numeroSecreto}.`;
        botonAdivinar.disabled = true;
        botonReiniciar.style.display = 'inline-block';
    } 
    else if (numeroJugador < numeroSecreto) {
        mensaje.textContent = 'El número es más alto.';
    }
    else {
        mensaje.textContent = 'El número es más bajo.';
    }
}


botonAdivinar.addEventListener('click', manejarAdivinanza);
botonReiniciar.addEventListener('click', reiniciarJuego);

// Inicialización
actualizarContador();
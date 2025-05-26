const form = document.getElementById('registroEvento');
const fecha = document.getElementById('fecha');
const archive = document.getElementById('archivo');


form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío automático del formulario

    // Variables
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    const horario = document.querySelector('input[name="horario"]:checked');
    const age = parseInt(document.getElementById('age').value);
    const hora = document.getElementById('hora').value;
    

    // Validaciones básicas
    if (!nombre || !correo || !telefono || intereses.length === 0 || !horario) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
    }

    if(nombre.length < 2){
        alert('El nombre debe tener al menos 2 caracteres.')
    }
    if(isNaN(age) || age < 18){
        alert('Evento para mayores de 18 años');
        return;
    }

    // Si todo está bien
    alert('Registro exitoso. ¡Gracias por registrarte!');
    console.log('Formulario enviado');
    console.log('Fecha', fecha, hora);
    intereses.forEach(element => {
        console.log(element);
    });
    
    
});

fecha.addEventListener('change', function(){
    const fecha = new Date(this.value);
    const year = new Date().getFullYear();

    if(fecha < new Date(year, 4, 14) || fecha > new Date(year, 5, 14)){
        this.setCustomValidity('Fecha fuera del rango permitido');
    }else{
        this.setCustomValidity('');
    }
})


archive.addEventListener('change', function(e) {
  const fileName = this.files[0] ? this.files[0].name : 'Ningún archivo seleccionado';
  document.querySelector('.file-name-display').textContent = fileName;
});
// Simulando una base de datos de mesas
const mesasDisponibles = 5;  // Número de mesas disponibles para reservar

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(mesasSolicitadas <= mesasDisponibles) {
        resolve(`Hay ${mesasSolicitadas} mesas disponibles para tu reserva.`);
      }else{
        reject(`Lo sentimos, solo tenemos ${mesasDisponibles} mesas disponibles. No podemos aceptar tu solicitud de ${mesasSolicitadas} mesas.`);
      }
    }, 2000);  // Simula un retraso en la verificación (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.3; // 70% probabilidad de éxito
      if(exito) {
        resolve(`Correo de confirmación enviado exitosamente a ${nombreCliente}.`);
      }else {
        reject(`Error al enviar el correo de confirmación a ${nombreCliente}. Por favor, inténtalo de nuevo más tarde.`);
      }
    }, 1500);  // Simula el envío de un correo (1.5 segundos)
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try{
    console.log("Verificando disponibilidad de mesas...");
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    console.log(disponibilidad);
    
    console.log("Procesando reserva...");
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacion);
    
    console.log("¡Reserva completada con éxito!");
  } catch (error) {
    console.log("Error:", error);  // Maneja los errores en la promesa
  } finally{
    console.log("Proceso de reserva finalizado.\n");
  }
}

// Llamadas de prueba
console.log("=== Prueba 1: Reserva exitosa ===");
hacerReserva("Juan Pérez", 3);  // Intenta hacer una reserva para 3 personas

setTimeout(() => {
  console.log("\n=== Prueba 2: No hay suficientes mesas ===");
  hacerReserva("María García", 7);  // Intenta hacer una reserva para 7 personas (más de las disponibles)
}, 4000);

setTimeout(() => {
  console.log("\n=== Prueba 3: Error en envío de correo ===");
  hacerReserva("Carlos López", 2);  // Probablemente éxito, pero podría fallar el correo (30% probabilidad)
}, 8000);
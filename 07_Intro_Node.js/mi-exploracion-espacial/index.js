const cowsay = require('cowsay');
const planetas = require('./planetas');

console.log(
  cowsay.think({
    text: "Reporte de los misterios del cosmos...",
    e: "Oo",  
    T: "U " 
  })
);



planetas.forEach(planeta => {
  console.log(`¡Planeta ${planeta.nombre} descubierto!`);
  console.log(`Descripción: ${planeta.descripcion}`);
  console.log(`Descubierto en: ${planeta.descubiertoEn}`);
  console.log('---');
});
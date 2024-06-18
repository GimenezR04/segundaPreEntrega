// Array para almacenar los préstamos simulados
let prestamos = [];

// Asegúrate de que el código se ejecute después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el primer elemento con la clase 'form-contenedor'
    document.getElementsByClassName('form-contenedor')[0].addEventListener('submit', function(evento) {
        evento.preventDefault();

        // Seleccionar los elementos de entrada por clase y obtener su valor
        let monto = parseFloat(document.getElementsByClassName('monto')[0].value);
        let interes = parseFloat(document.getElementsByClassName('interes')[0].value) / 100 / 12;
        let plazo = parseFloat(document.getElementsByClassName('plazo')[0].value) * 12;

        // Calcular el pago mensual
        let mensualidad = (monto * interes) / (1 - Math.pow(1 + interes, -plazo));

        // Crear un objeto de préstamo
        let prestamo2 = {
            monto: monto,
            interes: (interes * 12 * 100).toFixed(2),
            plazo: plazo / 12,
            mensualidad: mensualidad.toFixed(2)
        };

        // Agregar el préstamo al array
        prestamos.push(prestamo2);

        // Actualizar el contenido de texto del elemento con la clase 'mensualidad'
        document.getElementsByClassName('mensualidad')[0].textContent = `Pago mensual: $${prestamo2.mensualidad}`;
        displayPrestamos(prestamos);
    });

    // Función para mostrar los préstamos en la lista
    function displayPrestamos(prestamos) {
        let historial = document.getElementsByClassName('historial')[0];
        historial.innerHTML = '';

        prestamos.forEach(prestamo => {
            let li = document.createElement('li');
            li.textContent = `Monto: $${prestamo.monto}, Interés: ${prestamo.interes}%, Plazo: ${prestamo.plazo} años, Pago mensual: $${prestamo.mensualidad}`;
            historial.appendChild(li);
        });
    }

    // Búsqueda y filtrado de préstamos
    document.getElementsByClassName('buscar')[0].addEventListener('input', function(evento) {
        let pregunta = evento.target.value.toLowerCase();

        let filtradoDePrestamos = prestamos.filter(prestamo =>
            prestamo.monto.toString().toLowerCase().includes(pregunta) ||
            prestamo.interes.toString().toLowerCase().includes(pregunta)
        );

        displayPrestamos(filtradoDePrestamos);
    });
});
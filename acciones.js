let prestamos = [];

document.addEventListener('DOMContentLoaded', function() {

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.querySelector('h1').textContent = data.titulo;
        })
        .catch(error => console.error('Error al cargar el JSON:', error));

    
    let ultimoPagoMensual = localStorage.getItem('ultimoPagoMensual');
    if (ultimoPagoMensual) {
        document.getElementsByClassName('mensualidad')[0].textContent = `Último pago mensual: $${ultimoPagoMensual}`;
    }

    document.getElementsByClassName('form-contenedor')[0].addEventListener('submit', function(evento) {
        evento.preventDefault();

        let monto = parseFloat(document.getElementsByClassName('monto')[0].value);
        let interes = parseFloat(document.getElementsByClassName('interes')[0].value) / 100 / 12;
        let plazo = parseFloat(document.getElementsByClassName('plazo')[0].value) * 12;

        let mensualidad = (monto * interes) / (1 - Math.pow(1 + interes, -plazo));

        let prestamo2 = {
            monto: monto,
            interes: (interes * 12 * 100).toFixed(2),
            plazo: plazo / 12,
            mensualidad: mensualidad.toFixed(2)
        };

        prestamos.push(prestamo2);

       
        localStorage.setItem('ultimoPagoMensual', prestamo2.mensualidad);

        
        document.getElementsByClassName('mensualidad')[0].textContent = `Pago mensual: $${prestamo2.mensualidad}`;

        displayPrestamos(prestamos);
    });

    function displayPrestamos(prestamos) {
        let historial = document.getElementsByClassName('historial')[0];
        historial.innerHTML = '';

        prestamos.forEach(prestamo => {
            let li = document.createElement('li');
            li.textContent = `Monto: $${prestamo.monto}, Interés: ${prestamo.interes}%, Plazo: ${prestamo.plazo} años, Pago mensual: $${prestamo.mensualidad}`;
            historial.appendChild(li);
        });
    }

    document.getElementsByClassName('buscar')[0].addEventListener('input', function(evento) {
        let pregunta = evento.target.value.toLowerCase();

        let filtradoDePrestamos = prestamos.filter(prestamo =>
            prestamo.monto.toString().toLowerCase().includes(pregunta) ||
            prestamo.interes.toString().toLowerCase().includes(pregunta)
        );

        displayPrestamos(filtradoDePrestamos);
    });
});

const axios = require ('axios');

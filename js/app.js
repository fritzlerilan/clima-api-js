const buscarInput = document.querySelector('#buscar');
const form = document.querySelector('#formulario');
const container = document.querySelector('#principal');

form.addEventListener('submit', getWeather);

function getWeather(e) {
    e.preventDefault();
    const location = buscarInput.value;
    if (location === '') {
        imprimirAlerta('El campo de busqueda es obligatorio', 'error');
        return;
    }

    consultarAPI(location);
    form.reset();
}

function consultarAPI(location) {
    const apiKey = 'd1e759b3c1d139fe882293457dbb5bc5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                imprimirAlerta('No se encontro el lugar', 'error');
            }
        })
        .then(data => imprimirClima(data))
}

function imprimirClima(clima){
    console.log(clima);
}

function imprimirAlerta(msg, tipo) {
    if (!document.querySelector('.alerta')) {
        const div = document.createElement('div');
        const divMensaje = document.createElement('div');
        const divFormulario = document.querySelector('#contenedor-formulario');

        div.classList.add('alert', `alert-${tipo === 'error' ? 'danger' : success}`, 'd-flex', 'align-items-center', 'alerta');
        divMensaje.textContent = msg;

        div.appendChild(divMensaje);
        divFormulario.insertBefore(div, form);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}
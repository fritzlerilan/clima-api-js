const buscarInput = document.querySelector('#buscar');
const form = document.querySelector('#formulario');
const container = document.querySelector('#principal');
const spinner = document.querySelector('#spinner');
const cityInfo = document.querySelector('#city-info');
const weatherIcon = document.querySelector('#icon img');
const tarjetaClima = document.querySelector('#tarjeta-clima');

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
    limpiarHTML();
    const apiKey = 'd1e759b3c1d139fe882293457dbb5bc5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    spinner.classList.remove('hidden');
    fetch(url)
        .then(res => {
            spinner.classList.add('hidden');
            if (res.status === 200) {
                return res.json();
            } else {
                imprimirAlerta('No se encontro el lugar', 'error');
            }
        })
        .then(data => imprimirClima(data))
}

function imprimirClima(clima){
    const { main:{ temp, temp_min, temp_max, pressure }, weather} = clima;
    const centigrados = kelvinToCelsius(temp);
    
    weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    weatherIcon.alt = weather[0].description;
    // fill the image 'weatherIcon' to the parentElement and align it vertically and horizontally
    weatherIcon.style.cssText = 'width: 100%; object-position: center;';

    const divTemperatura = document.createElement('div');

    divTemperatura.style.justifyContent = 'center';
    
    const actual = document.createElement('p');
    actual.style.display = 'inline-block';
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('fs-1', 'fw-bold');

    divTemperatura.appendChild(actual);

    const titulo = document.createElement('p');
    titulo.textContent = `Clima en ${clima.name}`;

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center');

    const minmax = document.createElement('p');
    minmax.innerHTML = `<span class="fw-bold">Min:</span> ${kelvinToCelsius(temp_min)} &#8451; <span class="fw-bold">Max:</span> ${kelvinToCelsius(temp_max)} &#8451;`;

    const presion = document.createElement('p');
    presion.innerHTML = `<span class="fw-bold">Presion:</span> ${pressure} hPa`;


    resultadoDiv.appendChild(titulo);
    resultadoDiv.appendChild(divTemperatura);
    resultadoDiv.appendChild(minmax);
    resultadoDiv.appendChild(presion);

    cityInfo.appendChild(resultadoDiv);
    if(tarjetaClima.classList.contains('hidden')){
        tarjetaClima.classList.remove('hidden');
    }
}
function limpiarHTML(){
    tarjetaClima.classList.add('hidden');
    while(cityInfo.firstChild){
        cityInfo.removeChild(cityInfo.firstChild);
    }
}
function kelvinToCelsius(kelvin) {
    return Math.floor(kelvin - 273.15);
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
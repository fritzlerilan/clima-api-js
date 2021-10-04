const buscarInput = document.querySelector('#buscar');
const form = document.querySelector('#formulario');
const container = document.querySelector('#principal');

form.addEventListener('submit', getWeather);

function getWeather(e) {
    e.preventDefault();
    const location = buscarInput.value;
    if(location === '') {
        imprimirAlerta('El campo de busqueda es obligatorio', 'error');
        return;
    }

    console.log('Formulario validado', location);
    form.reset();
}

function imprimirAlerta(msg, tipo) {
    if(!document.querySelector('.alerta')) {
        const div = document.createElement('div');
        const divMensaje = document.createElement('div');
        const divFormulario = document.querySelector('#contenedor-formulario');
        
        div.classList.add('alert', `alert-${tipo === 'error' ? 'danger': success}`, 'd-flex', 'align-items-center', 'alerta');
        divMensaje.textContent = msg;
        
        div.appendChild(divMensaje);
        divFormulario.insertBefore(div, form);
        
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}
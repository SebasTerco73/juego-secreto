let numeroSecreto;
let intentos;
let intentosMaximos = 10;
let numerosJugados = [];

console.log(numeroSecreto);

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    // buscar elemento por id
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste, en ${intentos} ${intentos == 1 ? "intento" : "intentos"}`);
        // habilitar el boton de nuevo juego, removiendo el atributo disabled
        document.getElementById('reiniciar').removeAttribute('disabled');
        // deshabilitar el boton de intentar
        document.getElementById('intentar').setAttribute('disabled','true');
        document.querySelector('input').setAttribute('disabled','true');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', `Ingrese un numero menor a ${numeroDeUsuario}`);
        } else {
            asignarTextoElemento('p', `Ingrese un numero mayor a ${numeroDeUsuario}`);
        }
        limpiarCaja();
    }
    intentos++;
    if(intentosMaximos==numerosJugados.length){
        asignarTextoElemento('p','CORRECTO! Descubriste todos los números');
        document.getElementById('reiniciar').setAttribute('disabled','true');
    }    
    return;
}

function limpiarCaja() {
    // querySelectro por ID usando #
    // let valorCaja1=document.querySelector('#valorUsuario');
    // valorCaja1.value='';

    //mas reducido
    let valorCaja = document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado=Math.floor(Math.random() * intentosMaximos) + 1;
    // Si ya se usaron todos los numeros
    // Si ya se uso ese numero, se vuelve a llamar a la funcion para que genere otro (recursividad)
    if(numerosJugados.includes(numeroGenerado)){
            return generarNumeroSecreto();
    }else{
        // Se agrega a la lista y se retorna ese numero
        numerosJugados.push(numeroGenerado);
        // muestra la lista
        console.log(numerosJugados);
        return numeroGenerado;
    }
}

function condicionesDeInicio() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${intentosMaximos}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    // muestra el numero secreto
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesDeInicio();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    document.getElementById('intentar').removeAttribute('disabled');
    document.querySelector('input').removeAttribute('disabled');
}

condicionesDeInicio();


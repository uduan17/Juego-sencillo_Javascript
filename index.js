// inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false
let timer = 30;
let tiempoRegresivo = null;

// apuntando al document html
let mostrarMoviminetos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t_restante')

// funcion
function tiempoRestante() {
    tiempoRegresivoId =  setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo : ${timer} s`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            Swal.fire({
                title: "Se acabo el tiempo",
                icon: "error"
              });
        }
    },800)
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

// generar numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numeros = numeros.sort(()=>{return Math.random() - 0.5})
console.log(numeros);

// Funcion principal
function destapar(id) {
    if (temporizador == false) {
        tiempoRestante();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(id)
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        // deshabilitar primer boton
        tarjeta1.disabled = true;

    }else if (tarjetasDestapadas == 2) {
        tarjeta2 = document.getElementById(id)
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

         // deshabilitar primer boton
         tarjeta2.disabled = true;

         movimientos++;
         mostrarMoviminetos.innerHTML = `Movimientos ${movimientos}`;

         if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;

            // aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos ${aciertos}`;

            Swal.fire({
                text: "Muy bien",
                icon: "success"
              });
            if (aciertos == 8) {
            mostrarAciertos.innerHTML = `Aciertos ${aciertos}😱`;
            mostrarMoviminetos.innerHTML = `Movimientos ${movimientos}😈🏅`;
                Swal.fire({
                    title: "Juego terminado",
                    text: "Muy bien",
                    icon: "success"
                  });
             }
         }else{
             Swal.fire({
                text: "Sigue intentando",
                icon: "error"
            });
            // volver a tapar valores
            setTimeout(()=>{
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },2000)
         }

        
    }
}

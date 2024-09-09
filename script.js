const cartasTotales = 12;
let cartas = [];
let cartasSeleccionadas = [];
let valoresUsados = [];
let movimiento = 0;

let cartaPlantilla = '<div class="carta"><div class="espalda"></div><div class="cara"></div></div>'

for (let i = 0; i < cartasTotales; i++) {
    let div = document.createElement('div');
    div.innerHTML = cartaPlantilla;
    cartas.push(div);
    document.querySelector('#juego').append(cartas[i]);
    generarAleatorio();
    cartas[i].querySelectorAll('.cara')[0].innerHTML = valoresUsados[i];
    cartas[i].querySelectorAll('.carta')[0].addEventListener('click', activar);
}

function activar(e) {
    if(movimiento < 2){
        
        if ((!cartasSeleccionadas[0] || cartasSeleccionadas[0] !== e.target) && !e.target.classList.contains('activo')){
            cartasSeleccionadas.push(e.target);
            e.target.classList.add('activo');
            if(++movimiento == 2) {
                console.log(movimiento + ' ' + cartasSeleccionadas);
                if (cartasSeleccionadas[0].querySelectorAll('.cara')[0].innerHTML === cartasSeleccionadas[1].querySelectorAll('.cara')[0].innerHTML) {
                    cartasSeleccionadas = [];
                    movimiento = 0;
                }else {
                    setTimeout(() => {
                        cartasSeleccionadas[0].classList.remove('activo');
                        cartasSeleccionadas[1].classList.remove('activo');
                        cartasSeleccionadas = [];
                        movimiento = 0;
                    }, 600);
                }
            }
        }
    }
}

function generarAleatorio(){
    let rnd = Math.floor(Math.random()*cartasTotales*0.5);
    let valores = valoresUsados.filter(val => val === rnd);
    if ( valores.length < 2 ){
        valoresUsados.push(rnd);
    }
    else {
        generarAleatorio();
    }
}
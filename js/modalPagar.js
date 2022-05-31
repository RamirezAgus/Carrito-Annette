const abrirModalTarjeta = document.getElementById('boton-pagar')
const btnFinalizar = document.getElementById('finalizar')
const botonCancelar = document.getElementById('cancelar')
const contenedorTarjeta = document.getElementsByClassName('modal-contenedor-tarjeta')[0];

const tarjeta = document.getElementById('tarjeta');
const btnAbrirForm = document.getElementById('btn-abrir-form');
const formulario = document.getElementById('formulario-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .numero');
const nombreTarjeta = document.querySelector('#tarjeta .nombre');
const logoMarca = document.getElementById('logo-marca');
const firma = document.querySelector('#tarjeta .firma p');
const mesExpiracion = document.querySelector('#tarjeta .mes');
const anioExpiracion = document.querySelector('#tarjeta .anio');
const cvv = document.querySelector('#tarjeta .cvv')


// ABRIR MODAL TARJETA

abrirModalTarjeta.addEventListener('click', () => {
    contenedorTarjeta.classList.toggle('modal-contenedor-tarjeta-active');
    contenedorModal.classList.toggle('modal-active'); // CIERRA EL MODAL ANTERIOR
});


// DAR VUELTA LA TARJETA 

const mostrarFrente = () => {
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.remove('active');
    }
}



tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

btnAbrirForm.addEventListener('click', () => {
    btnAbrirForm.classList.toggle('active');
    formulario.classList.toggle('active')
});

// SELECT DEL MES
for(let i = 1; i <= 12; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

// SELECT DEL AÑO
const anioActual = new Date().getFullYear();
for(let i = anioActual; i <= anioActual + 8; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectAnio.appendChild(opcion);
} 

// INPUT NUMERO DE TARJETA

formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;
    formulario.inputNumero.value = valorInput.replace(/\s/g, '')
                                             .replace(/\D/g, '')
                                             .replace(/([0-9]{4})/g, '$1 ')
                                             .trim();
    numeroTarjeta.textContent = valorInput;
    if(valorInput == ''){
        numeroTarjeta.textContent = "#### #### #### ####";

        logoMarca.innerHTML = "";
    }
    
    if(valorInput[0] == 4){
        logoMarca.innerHTML = "";
        const imagen = document.createElement('img');
        imagen.src = "/img/logos/visa.png"
        logoMarca.appendChild(imagen);
    }else if(valorInput[0] == 5){
        logoMarca.innerHTML = "";
        const imagen = document.createElement('img');
        imagen.src = "/img/logos/mastercard.png"
        logoMarca.appendChild(imagen);
    }

    mostrarFrente();
});

// INPUT NOMBRE DE TARJETA

formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (valorInput == '') {
        nombreTarjeta.textContent = 'Jhonny';
    }

    mostrarFrente();
});

//SELECT MES

formulario.selectMes.addEventListener("change", (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

//SELECT AÑO

formulario.selectAnio.addEventListener("change", (e) => {
    anioExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// CVV

formulario.inputCvv.addEventListener("keyup", () => {
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active')
    }

    formulario.inputCvv.value = formulario.inputCvv.value.replace(/\s/g, '')
                                                         .replace(/\D/g, '');

    cvv.textContent = formulario.inputCvv.value;                                                     
});

// CONFIRMAR COMPRA
const finalizarCompra = () => {
btnFinalizar.addEventListener('click', (e) => {
    e.preventDefault(e)
    if (inputNumero.value == 0 ||
        formulario.nombre.value == 0 ||
        formulario.mes.value == 0 || 
        formulario.anio.value == 0 || 
        formulario.cvv.value == 0) {
            Swal.fire({
                title: 'Complete todos los datos por favor',
                text: 'Error!'
              })
    } else {
        Swal.fire({
            title: 'Gracias!',
            text: 'Su compra a sido exitosa',
            icon: 'success'
          }).then(() => {
              location.href = "/index.html"
          });
          localStorage.clear();
        }
    });
};


// CIERRA MODAL TARJETA

botonCancelar.addEventListener('click', () => {
    contenedorTarjeta.classList.toggle('modal-contenedor-tarjeta-active');
});

contenedorTarjeta.addEventListener('click', (el) => {
    el.stopPropagation();
})

finalizarCompra();
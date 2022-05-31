let stockProductos = [];




fetch("js/stock.json")
.then(respuesta => respuesta.json())
.then(data => {
    data.forEach(element => {
        stockProductos.push(element)
    });
    mostrarProductos(stockProductos)
    
    //console.log(stockProductos)
})
let carritoDeCompras = [];

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonTerminar = document.getElementById("terminar");
const finCompra = document.getElementById("fin-compra");

const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");

const selecCatego = document.getElementById("selecCatego");
const buscador = document.getElementById("search");





// FILTRO


    selecCatego.addEventListener("change", () => {
    if(selecCatego.value == "all"){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(element => element.categoria == selecCatego.value))
    }
    })

// BUSCADOR

buscador.addEventListener("input", () => {
    if(buscador.value == ""){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(element => element.nombre.toLowerCase().includes(buscador.value.toLowerCase())));
    }
});


// MOSTRAR PRODUCTOS
const mostrarProductos = (miArray) => {
    contenedorProductos.innerHTML = "";

    miArray.forEach(e =>{
        let carDiv = document.createElement("div");
        carDiv.className = "producto";
        carDiv.innerHTML = 
        `
            <div class ="card" id= "cardTarjeta">
            <img src=${e.img} class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${e.nombre}</h5>
                <p class="card-text">${e.desc}</p>
                <p class="card-text">${e.categoria}</p>
                <p class="card-text">${e.tipo}</p>
                <p class="card-text">$${e.precioMadeja}</p>
                <a id= "agregar${e.id}" href="#" class="btn btn-primary"><i class="bi bi-cart-plus-fill"></i>Agregar</a>
            </div>
        </div>
        `
        contenedorProductos.appendChild(carDiv);
        //BOTON AGREGAR
        let btnAgregar = document.getElementById(`agregar${e.id}`)
        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(e.id);
        })
    })
};

// AGREGAR AL CARRITO
const agregarAlCarrito = (id) => {
    let agrego = carritoDeCompras.find(e => e.id == id);
    if(agrego){
        agrego.cantidad++
        document.getElementById(`und${agrego.id}`).innerHTML = `<p id = und${agrego.id}>Und:${agrego.cantidad}</p>`
        actualizarCarrito();
    }else{
        let productoAgregar = stockProductos.find(e => e.id == id);
        productoAgregar.cantidad = 1;

        carritoDeCompras.push(productoAgregar);
        actualizarCarrito();
        mostrarCarrito(productoAgregar);
    }
}



//PRODUCTOS EN MODAL
const mostrarCarrito = (productoAgregar) => {
    let modal = document.createElement("div");
    modal.className = "productoEnCarrito";
    modal.innerHTML = 
        `
        <p>${productoAgregar.nombre}</p>
            <p>${productoAgregar.tipo}</p>
            <p>Precio: $${productoAgregar.precioMadeja}</p>
            <p id="und${productoAgregar.id}">Und:${productoAgregar.cantidad}</p>
            <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="bi bi-trash-fill"></i></button>
        `
    contenedorCarrito.appendChild(modal);
    // BOTON ELIMINAR
    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener("click", ()=> {
        Swal.fire({
            title: 'Estas segur@?',
            text: "No se podrá revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                if (productoAgregar.cantidad == 1) {
                    btnEliminar.parentElement.remove();
                    carritoDeCompras = carritoDeCompras.filter(item => item.id != productoAgregar.id);
                    actualizarCarrito();
                    
                }else{
                    productoAgregar.cantidad = productoAgregar.cantidad - 1;
                    document.getElementById(`und${productoAgregar.id}`).innerHTML = `<p id=und${productoAgregar.id}>Und:${productoAgregar.cantidad}</p>`
                    actualizarCarrito();
                    
                }
            }
          });
    })
};

// ACTUALIZAR CARRITO

const actualizarCarrito = () => {
    contadorCarrito.innerText = [...carritoDeCompras].reduce((acc,el) => acc + el.cantidad, 0);
    precioTotal.innerText = [...carritoDeCompras].reduce((acc,el) => acc + (el.precioMadeja * el.cantidad), 0);

}








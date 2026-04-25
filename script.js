let usuarios = [];

function registrarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;

    let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;


    if (nombre.trim() === "" || correo.trim() === "" || password.trim() === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (!regexCorreo.test(correo)) {
        alert("Correo inválido");
        return;
    }

    if (!regexPassword.test(password)) {
        alert("Contraseña inválida");
        return;
    }

    if (usuarios.some(u => u.correo === correo)) {
        alert("Este correo ya está registrado");
        return;
    }

    usuarios.push({ nombre, correo, password });
    alert("Registro exitoso");

    mostrarUsuarios();
    limpiarFormulario();
}

function mostrarUsuarios() {
    let tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";

    usuarios.forEach(u => {
        tabla.innerHTML += `
            <tr>
                <td>${u.nombre}</td>
                <td>${u.correo}</td>
            </tr>
        `;
    });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("password").value = "";
}


//=====================================================================================================================
let productos = [
    { nombre: "Casaca de cuero", precio: 50, imagen: "img/casacaCueroHombre.jpg", categoria: "hombre" },
    { nombre: "Casaca impermeable", precio: 35, imagen: "img/casacaImpermeableHombre.jpg", categoria: "hombre" },
    { nombre: "Shorts casual", precio: 20, imagen: "img/shortHombre.jpg", categoria: "hombre" },
    { nombre: "Camisa formal", precio: 30, imagen: "img/camisaFormalHombre.jpg", categoria: "hombre" },
    { nombre: "Terno formal", precio: 60, imagen: "img/ternoHombre.jpg", categoria: "hombre" },
    { nombre: "Camisa Perú", precio: 100, imagen: "img/camisaPeru.jpg", categoria: "hombre" },

    { nombre: "Pantalón negro", precio: 40, imagen: "img/pantalonFormalMujer.jpg", categoria: "mujer" },
    { nombre: "Pantalón celeste", precio: 100, imagen: "img/pantalonMujer.jpg", categoria: "mujer" },
    { nombre: "Blusa negra", precio: 50, imagen: "img/blusaMujer.jpg", categoria: "mujer" },
    { nombre: "Pantalón rosado", precio: 70, imagen: "img/pantalonEstrellasMujer.jpg", categoria: "mujer" }
];

let carrito = [];

function mostrarProductos(filtro = "todos") {
    let contenedor = document.getElementById("listaProductos");
    contenedor.innerHTML = "";

    let listaFiltrada = productos.filter(p => filtro === "todos" || p.categoria === filtro);

    listaFiltrada.forEach((p, index) => {
        contenedor.innerHTML += `
            <div class="col-md-3">
                <div class="card mb-4">
                    <img src="${p.imagen}" class="card-img-top">
                    <div class="card-body text-center">
                        <h6>${p.nombre}</h6>
                        <p>S/ ${p.precio}</p>
                        <button class="btn btn-primary btn-sm" onclick="agregarCarrito(${index})">Agregar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function filtrarProductos(categoria) {
    mostrarProductos(categoria);

    ["btnTodos","btnHombre","btnMujer"].forEach(id => {
        document.getElementById(id).classList.remove("btn-primary");
        document.getElementById(id).classList.add("btn-secondary");
    });

    let activo = categoria === "todos" ? "btnTodos" : categoria === "hombre" ? "btnHombre" : "btnMujer";
    document.getElementById(activo).classList.replace("btn-secondary","btn-primary");
}

function agregarCarrito(i) {
    carrito.push(productos[i]);
    mostrarCarrito();
}

function mostrarCarrito() {
    let lista = document.getElementById("carrito");
    lista.innerHTML = "";

    carrito.forEach((p, i) => {
        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between">
                ${p.nombre} - S/ ${p.precio}
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${i})">X</button>
            </li>
        `;
    });

    calcularTotal();
}

function eliminarProducto(i) {
    carrito.splice(i, 1);
    mostrarCarrito();
}

function calcularTotal() {
    let total = carrito.reduce((sum, p) => sum + p.precio, 0);
    if (total > 200) total *= 0.9;
    document.getElementById("total").textContent = total.toFixed(2);
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Carrito vacío");
        return;
    }

    alert("Compra realizada. Total: S/ " + document.getElementById("total").textContent);
    carrito = [];
    mostrarCarrito();
}

filtrarProductos("todos");


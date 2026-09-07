const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const formatoTelefono = /^(\+56\s?9\s?\d{4}\s?\d{4}|9\d{8})$/;

function validarCredenciales(correo, contrasena, mensaje) {
    if (correo === "" || contrasena === "") {
        mensaje.textContent = "Completa todos los campos.";
        return false;
    }

    if (!formatoCorreo.test(correo)) {
        mensaje.textContent = "Ingresa un correo válido, por ejemplo nombre@dominio.com.";
        return false;
    }

    return true;
}

const formularioLoginCliente = document.getElementById("form-login-cliente");

if (formularioLoginCliente) {
    formularioLoginCliente.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const correo = document.getElementById("correo-cliente").value.trim();
        const contrasena = document.getElementById("contrasena-cliente").value.trim();
        const mensaje = document.getElementById("mensaje-login-cliente");

        if (validarCredenciales(correo, contrasena, mensaje)) {
            window.location.href = "catalogo.html";
        }
    });
}

const formularioLoginEmpleado = document.getElementById("form-login-empleado");

if (formularioLoginEmpleado) {
    formularioLoginEmpleado.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const correo = document.getElementById("correo-empleado").value.trim();
        const contrasena = document.getElementById("contrasena-empleado").value.trim();
        const mensaje = document.getElementById("mensaje-login-empleado");

        if (!validarCredenciales(correo, contrasena, mensaje)) {
            return;
        }

        if (correo === "admin@gasvolcan.cl") {
            window.location.href = "empleados.html";
        } else if (correo === "operadora@gasvolcan.cl") {
            window.location.href = "pedidos.html";
        } else if (correo === "repartidor@gasvolcan.cl") {
            window.location.href = "entregas.html";
        } else {
            mensaje.textContent = "El correo no corresponde a un empleado registrado.";
        }
    });
}

const formularioRegistro = document.getElementById("form-registro");

if (formularioRegistro){
    formularioRegistro.addEventListener("submit", function (evento){
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const rut = document.getElementById("rut").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const cargo = document.getElementById("cargo").value;
        const estado = document.getElementById("estado").value;
        const mensaje = document.getElementById("mensaje-confirmacion");
        const formatoRut = /^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/;



        if ( nombre === "" || rut === "" || telefono === "" || correo === "" || cargo === "" || estado === ""
        ){
            mensaje.textContent = "Completa todo los campos.";
            return;
        }   if (!formatoRut.test(rut)) {
            mensaje.textContent = "Ingresa un RUT válido, por ejemplo 12.345.678-9.";
            return;
        }  
            if (!formatoTelefono.test(telefono)) {
            mensaje.textContent = "Ingresa un teléfono válido, por ej 903239032";
            return;
        }
           if (!formatoCorreo.test(correo)){
            mensaje.textContent = "Ingresa un correo válido, , por ejemplo nombre@dominio.com.";
            return;
        } 

        const tablaEmpleado = document.querySelector("#listado-empleado tbody");

        const cargoTexto = document.getElementById("cargo").options[
            document.getElementById("cargo").selectedIndex
        ].textContent;

        const estadoTexto = document.getElementById("estado").options[
            document.getElementById("estado").selectedIndex
        ].textContent;

        const nuevaFila = document.createElement("tr");

        nuevaFila.innerHTML = `
            <td>${nombre}</td>
            <td>${rut}</td>
            <td>${telefono}</td>
            <td>${correo}</td>
            <td>${cargoTexto}</td>
            <td class="estado-empleado">${estadoTexto}</td>
            <td>
                <button type="button" data-accion="editar">Editar</button>
                <button type="button" data-accion="cambiar-estado">Cambiar estado</button>
            </td>
            `;

            tablaEmpleado.appendChild(nuevaFila);
            mensaje.textContent = "Empleado registrado correctamente.";
            formularioRegistro.reset();
    }) 

    
}

document.addEventListener("click", function (evento) {
    const boton = evento.target.closest("[data-accion]");
    
    if (!boton) {
        return;
    }

    const accion = boton.dataset.accion;

    if (accion === "en-camino" || accion === "entregado"){
        const fila = boton.closest("tr");
        const estado = fila.querySelector(".estado-entrega");

        if (accion === "en-camino"){
            estado.textContent = "En camino";
        }

        if (accion === "entregado"){
            estado.textContent = "Entregado";
        }
    }

if (accion === "cambiar-estado") {
    const fila = boton.closest("tr");
    const estadoPedido = fila.querySelector(".estado-pedido");
    const estadoEmpleado = fila.querySelector(".estado-empleado");

    if (estadoPedido) {
        if (estadoPedido.textContent === "Pendiente") {
            estadoPedido.textContent = "En preparación";
        } else if (estadoPedido.textContent === "En preparación") {
            estadoPedido.textContent = "Asignado";
        } else if (estadoPedido.textContent === "Asignado") {
            estadoPedido.textContent = "En camino";
        } else if (estadoPedido.textContent === "En camino") {
            estadoPedido.textContent = "Entregado";
        }
    }

    if (estadoEmpleado) {
        if (estadoEmpleado.textContent === "Activo") {
            estadoEmpleado.textContent = "Inactivo";
        } else {
            estadoEmpleado.textContent = "Activo";
        }
    }
    }

    if (accion === "editar") {
        const fila = boton.closest("tr");
        const dialogo = document.getElementById("dialogo-edicion");
        const telefono = fila.cells[2];
        const correo = fila.cells[3];

        if (!dialogo) {
            return;
        }

        dialogo.dataset.fila = Array.from(fila.parentElement.children).indexOf(fila);
        document.getElementById("editar-telefono").value = telefono.textContent.trim();
        document.getElementById("editar-correo").value = correo.textContent.trim();
        dialogo.showModal();
    }

    if (accion === "actualizar-stock") {
        const fila = boton.closest("tr");
        const dialogo = document.getElementById("dialogo-stock");
        const cantidad = fila.querySelector(".cantidad-stock");

        if (!dialogo) {
            return;
        }

        dialogo.dataset.fila = Array.from(fila.parentElement.children).indexOf(fila);
        document.getElementById("actualizar-cantidad").value = cantidad.textContent.trim();
        dialogo.showModal();
    }

});

const formularioEdicion = document.getElementById("form-edicion");
const dialogoEdicion = document.getElementById("dialogo-edicion");
const cancelarEdicion = document.getElementById("cancelar-edicion");

if (formularioEdicion && dialogoEdicion) {
    formularioEdicion.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const fila = document.querySelectorAll("#listado-empleado tbody tr")[dialogoEdicion.dataset.fila];
        const telefono = document.getElementById("editar-telefono").value.trim();
        const correo = document.getElementById("editar-correo").value.trim();
        const mensaje = document.getElementById("mensaje-edicion");
        if (telefono === "" || correo === "") {
            mensaje.textContent = "Completa todos los campos.";
            return;
        }

        if (!formatoCorreo.test(correo)) {
            mensaje.textContent = "Ingresa un correo válido.";
            return;
        }

        if (!formatoTelefono.test(telefono)) {
            mensaje.textContent = "Ingresa un teléfono válido.";
            return;
        }

        if (fila) {
            fila.cells[2].textContent = telefono;
            fila.cells[3].textContent = correo;
            dialogoEdicion.close();
        }
    });
}

if (cancelarEdicion && dialogoEdicion) {
    cancelarEdicion.addEventListener("click", function () {
        dialogoEdicion.close();
    });
}

const formularioStock = document.getElementById("form-stock");
const dialogoStock = document.getElementById("dialogo-stock");
const cancelarStock = document.getElementById("cancelar-stock");

if (formularioStock && dialogoStock) {
    formularioStock.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const filas = document.querySelectorAll("main tbody tr");
        const fila = filas[dialogoStock.dataset.fila];
        const nuevaCantidad = Number(document.getElementById("actualizar-cantidad").value);

        if (fila && Number.isInteger(nuevaCantidad) && nuevaCantidad >= 0) {
            const stockActual = fila.querySelector(".cantidad-stock");
            const stockMinimo = Number(fila.cells[8].textContent);
            const estado = fila.cells[9];

            stockActual.textContent = nuevaCantidad;

            if (nuevaCantidad === 0) {
                estado.textContent = "Agotado";
            } else if (nuevaCantidad <= stockMinimo) {
                estado.textContent = "Stock bajo";
            } else {
                estado.textContent = "Disponible";
            }

            dialogoStock.close();
        }
    });
}

if (cancelarStock && dialogoStock) {
    cancelarStock.addEventListener("click", function () {
        dialogoStock.close();
    });
}

const botonMenu = document.getElementById("boton-menu");
const menuPrincipal = document.querySelector(".menu-principal");

if (botonMenu && menuPrincipal) {
    botonMenu.addEventListener("click", function () {
        menuPrincipal.classList.toggle("menu-visible");
    });
}


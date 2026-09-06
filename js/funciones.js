const formularioLogin = document.getElementById("form-login");

if (formularioLogin){
formularioLogin.addEventListener("submit", function (evento){
    evento.preventDefault();
    
    

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const rol = document.getElementById("rol").value;
    const mensaje = document.getElementById("mensaje-login");
    
    if (correo === "" || contrasena === "" || rol === "" ){
        mensaje.textContent = "Completa todos los campos.";
        return;
    }

    const formatoCorreo =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formatoCorreo.test(correo)){
        mensaje.textContent = "Ingrese un correo válido, por ejemplo nombre@dominio.com";
        return;
    }
 
    if (rol === "administrador"){
        window.location.href =  "empleados.html";
    } else if (rol === "operadora") {
        window.location.href = "pedidos.html";
    } else if (rol === "repartidor"){
        window.location.href = "entregas.html";
    } else {
        mensaje.textContent = "Selecciona un rol válido.";
    }

});
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


});



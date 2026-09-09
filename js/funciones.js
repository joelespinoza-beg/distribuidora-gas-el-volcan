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

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const respuesta = item.querySelector("p");
    const titulo = item.querySelector("h3");

    if (respuesta && titulo) {
        respuesta.style.display = "none"; 
        const icono = document.createElement("span");
        icono.className = "faq-icon";
        icono.innerHTML = "&#10095;";
        titulo.appendChild(icono);

        titulo.addEventListener("click", function () {
            const estaVisible = respuesta.style.display === "block";
            
            respuesta.style.display = estaVisible ? "none" : "block";
            icono.classList.toggle("activo", !estaVisible);
        });
    }
});
const trackingForm = document.querySelector(".tracking form");

if (trackingForm) {
    trackingForm.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const input = trackingForm.querySelector("input");
        const valorIngresado = input ? input.value.trim().toUpperCase() : "";

        const pedidoValido = "PED-0001";
        const telefonoValido1 = "+56922224444";
        const telefonoValido2 = "922224444";

        let contenedorMensaje = document.getElementById("mensaje-seguimiento");
        if (!contenedorMensaje) {
            contenedorMensaje = document.createElement("div");
            contenedorMensaje.id = "mensaje-seguimiento";
            contenedorMensaje.style.marginTop = "15px";
            contenedorMensaje.style.padding = "12px";
            contenedorMensaje.style.borderRadius = "4px";
            contenedorMensaje.style.fontWeight = "bold";
            trackingForm.appendChild(contenedorMensaje);
        }

        const stepperPrevio = document.getElementById("tracking-status-bar");
        if (stepperPrevio) {
            stepperPrevio.remove();
        }

        if (valorIngresado === pedidoValido) {
            contenedorMensaje.style.background = "#e6fffa";
            contenedorMensaje.style.color = "#234e52";
            contenedorMensaje.style.border = "1px solid #b2f5ea";
            contenedorMensaje.innerHTML = `
                <strong>Pedido encontrado ("${input.value.trim()}"):</strong> Tu gas va en camino a tu domicilio en Chillán.
            `;
            mostrarBarraEstado(3); 
        } else if (valorIngresado === telefonoValido1 || valorIngresado === telefonoValido2) {
            contenedorMensaje.style.background = "#e6fffa";
            contenedorMensaje.style.color = "#234e52";
            contenedorMensaje.style.border = "1px solid #b2f5ea";
            contenedorMensaje.innerHTML = `
                <strong>Pedido encontrado ("${input.value.trim()}"):</strong> Tu pedido está listo en bodega y pronto saldrá a reparto.
            `;
            mostrarBarraEstado(2); 
        } else {
            contenedorMensaje.style.background = "#ffecee";
            contenedorMensaje.style.color = "#b5121b";
            contenedorMensaje.style.border = "1px solid #f2a3a7";
            contenedorMensaje.innerHTML = `
                <strong>Error:</strong> No encontramos un pedido asociado a ese número o teléfono.<br>
            `;
        }
    });
}

function mostrarBarraEstado(pasoActivo) {
    const seccionTracking = document.querySelector(".tracking");
    if (!seccionTracking) return;

    const clasePaso1 = pasoActivo > 1 ? "completado" : (pasoActivo === 1 ? "activo" : "");
    const clasePaso2 = pasoActivo > 2 ? "completado" : (pasoActivo === 2 ? "activo" : "");
    const clasePaso3 = pasoActivo > 3 ? "completado" : (pasoActivo === 3 ? "activo" : "");
    const clasePaso4 = pasoActivo === 4 ? "activo" : "";

    const barraHTML = `
        <div id="tracking-status-bar" class="tracking-stepper">
            <div class="step ${clasePaso1}">
                <div class="step-icon">1</div>
                <div class="step-label">Confirmado</div>
            </div>
            <div class="step ${clasePaso2}">
                <div class="step-icon">2</div>
                <div class="step-label">En Bodega</div>
            </div>
            <div class="step ${clasePaso3}">
                <div class="step-icon">3</div>
                <div class="step-label">En Ruta</div>
            </div>
            <div class="step ${clasePaso4}">
                <div class="step-icon">4</div>
                <div class="step-label">Entregado</div>
            </div>
        </div>
    `;

    seccionTracking.insertAdjacentHTML("beforeend", barraHTML);
}
/* --- FUNCIONALIDAD PARA CONTACTO Y CATÁLOGO DINÁMICO --- */
const formularioContacto = document.getElementById("form-contacto");
if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (evento) {
        evento.preventDefault();
        
        const nombre = document.getElementById("nombre-contacto").value.trim();
        const correo = document.getElementById("correo-contacto").value.trim();
        const telefono = document.getElementById("telefono-contacto").value.trim();
        const mensaje = document.getElementById("mensaje-contacto").value.trim();
        
        const errorNombre = document.getElementById("error-nombre");
        const errorCorreo = document.getElementById("error-correo");
        const errorTelefono = document.getElementById("error-telefono");
        const errorMensaje = document.getElementById("error-mensaje");
        const mensajeExito = document.getElementById("mensaje-exito-contacto");

        const objNombre = document.getElementById("nombre-contacto");
        const objCorreo = document.getElementById("correo-contacto");
        const objTelefono = document.getElementById("telefono-contacto");
        const objMensaje = document.getElementById("mensaje-contacto");
        
        if (errorNombre) errorNombre.textContent = "";
        if (errorCorreo) errorCorreo.textContent = "";
        if (errorTelefono) errorTelefono.textContent = "";
        if (errorMensaje) errorMensaje.textContent = "";
        if (mensajeExito) mensajeExito.textContent = "";

        if (objNombre) objNombre.classList.remove('input-error');
        if (objCorreo) objCorreo.classList.remove('input-error');
        if (objTelefono) objTelefono.classList.remove('input-error');
        if (objMensaje) objMensaje.classList.remove('input-error');

        let esValido = true;
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const regexTelefono = /^(\+56\s?9\s?\d{4}\s?\d{4}|9\d{8})$/;

        if (nombre === "") {
            if (errorNombre) errorNombre.textContent = "El nombre es obligatorio.";
            if (objNombre) objNombre.classList.add('input-error');
            esValido = false;
        }
        if (!regexCorreo.test(correo)) {
            if (errorCorreo) errorCorreo.textContent = "Ingresa un correo válido (ej: nombre@dominio.cl).";
            if (objCorreo) objCorreo.classList.add('input-error');
            esValido = false;
        }
        if (telefono !== "" && !regexTelefono.test(telefono)) {
            if (errorTelefono) errorTelefono.textContent = "Ingresa un teléfono válido (ej: +56912345678).";
            if (objTelefono) objTelefono.classList.add('input-error');
            esValido = false;
        }
        if (mensaje.length < 20) {
            if (errorMensaje) errorMensaje.textContent = "El mensaje debe tener al menos 20 caracteres.";
            if (objMensaje) objMensaje.classList.add('input-error');
            esValido = false;
        }
        if (esValido && mensajeExito) {
            mensajeExito.textContent = "¡Mensaje enviado correctamente! La operadora te contactará pronto.";
            mensajeExito.style.color = "green";
            formularioContacto.reset();
        }
    });
}

const contenedorCatalogo = document.getElementById("contenedor-catalogo");
if (contenedorCatalogo) {
    const productosGas = [
        { id: "CL001", nombre: "Cilindro GLP 5 kg", categoria: "Cilindros de Gas", precio: 6500, stock: 80, imagen: "img/CL001.jpg" },
        { id: "CL002", nombre: "Cilindro GLP 11 kg", categoria: "Cilindros de Gas", precio: 12000, stock: 200, imagen: "img/CL002.jpg" },
        { id: "CL003", nombre: "Cilindro GLP 15 kg", categoria: "Cilindros de Gas", precio: 16000, stock: 90, imagen: "img/CL003.jpg" },
        { id: "CL004", nombre: "Cilindro GLP 45 kg", categoria: "Cilindros de Gas", precio: 45000, stock: 30, imagen: "img/CL004.jpg" },
        { id: "RG001", nombre: "Regulador doméstico", categoria: "Reguladores", precio: 8990, stock: 45, imagen: "img/RG001.jpg" },
        { id: "RG002", nombre: "Regulador alta presión", categoria: "Reguladores", precio: 18990, stock: 12, imagen: "img/RG002.jpg" },
        { id: "RG003", nombre: "Regulador dual (2 salidas)", categoria: "Reguladores", precio: 14990, stock: 18, imagen: "img/RG003.jpg" },
        { id: "MG001", nombre: "Manguera gas 1.5 m", categoria: "Conexiones", precio: 3990, stock: 80, imagen: "img/MG001.jpg" },
        { id: "MG002", nombre: "Manguera gas 3 m", categoria: "Conexiones", precio: 6990, stock: 50, imagen: "img/MG002.jpg" },
        { id: "MG003", nombre: "Abrazadera metálica", categoria: "Conexiones", precio: 990, stock: 200, imagen: "img/MG003.jpg" },
        { id: "MG004", nombre: "Kit conexión completo", categoria: "Conexiones", precio: 12990, stock: 25, imagen: "img/MG004.jpg" },
        { id: "AC001", nombre: "Carro porta cilindro", categoria: "Accesorios", precio: 12990, stock: 20, imagen: "img/AC001.jpg" },
        { id: "AC002", nombre: "Tapa protectora válvula", categoria: "Accesorios", precio: 1490, stock: 60, imagen: "img/AC002.jpg" },
        { id: "AC003", nombre: "Detector de gas", categoria: "Accesorios", precio: 19990, stock: 8, imagen: "img/AC003.jpg" }
    ];

    productosGas.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto" onerror="this.src='https://via.placeholder.com/200?text=Sin+Imagen'">
            <h3>${producto.nombre}</h3>
            <p style="color: #666; font-size: 0.9em; margin-bottom: 5px;">Categoría: ${producto.categoria}</p>
            <p style="color: #666; font-size: 0.9em; margin-top: 0;">Stock disponible: <strong>${producto.stock} uds.</strong></p>
            <p class="precio-gas">$${producto.precio.toLocaleString('es-CL')}</p>
            <button class="btn-agregar" data-id="${producto.id}">Solicitar Pedido</button>
            <span class="mensaje-agregado" id="msg-prod-${producto.id}" style="display:none; font-size:0.9em; margin-top:10px; line-height: 1.4;"></span>
        `;
        contenedorCatalogo.appendChild(tarjeta);
    });

    contenedorCatalogo.addEventListener("click", function (evento) {
        if (evento.target.classList.contains("btn-agregar")) {
            const idProducto = evento.target.getAttribute("data-id");
            const boton = evento.target;
            const mensajeAviso = document.getElementById(`msg-prod-${idProducto}`);
            
            if (mensajeAviso) {
                boton.disabled = true;
                boton.style.backgroundColor = "#aaaaaa";
                boton.style.cursor = "not-allowed";
                boton.textContent = "Procesando...";
                
                mensajeAviso.innerHTML = "⏳ <strong>Enviando a la operadora...</strong><br>Asignando repartidor.";
                mensajeAviso.style.color = "#b5121b"; 
                mensajeAviso.style.display = "block";
                
                setTimeout(() => {
                    boton.textContent = "Pedido en curso";
                    mensajeAviso.innerHTML = "✅ <strong>¡Repartidor asignado!</strong><br>Juan González está en camino.<br>Llegada aproximada: <strong>1 a 3 horas</strong> (Zona Centro)[cite: 3].";
                    mensajeAviso.style.color = "green";
                    
                    setTimeout(() => {
                        boton.disabled = false;
                        boton.style.backgroundColor = ""; 
                        boton.style.cursor = "pointer";
                        boton.textContent = "Solicitar Pedido";
                        mensajeAviso.style.display = "none";
                    }, 8000);
                }, 4000);
            }
        }
    });
}
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

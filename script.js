// Validación del formulario de contacto (sin dependencias)
(function () {
  "use strict";
  var form = document.getElementById("form-contacto");
  var estado = document.getElementById("estado-form");
  var reglas = {
    nombre: { min: 3, max: 60, vacio: "Escribe tu nombre.", corto: "El nombre debe tener al menos 3 caracteres." },
    correo: { max: 80, vacio: "Escribe tu correo electrónico.", formato: "Escribe un correo válido, por ejemplo nombre@dominio.mx." },
    mensaje: { min: 10, max: 500, vacio: "Escribe tu mensaje.", corto: "El mensaje debe tener al menos 10 caracteres." }
  };
  var patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validar(campo) {
    var r = reglas[campo.name];
    var valor = campo.value.trim();
    var msg = "";
    if (valor === "") { msg = r.vacio; }
    else if (campo.name === "correo" && !patronCorreo.test(valor)) { msg = r.formato; }
    else if (r.min && valor.length < r.min) { msg = r.corto; }
    document.getElementById("error-" + campo.name).textContent = msg;
    campo.classList.toggle("invalido", msg !== "");
    campo.setAttribute("aria-invalid", msg !== "" ? "true" : "false");
    return msg === "";
  }

  var campos = [form.nombre, form.correo, form.mensaje];
  campos.forEach(function (c) { c.addEventListener("blur", function () { validar(c); }); });

  form.addEventListener("submit", function (e) {
    var primeroInvalido = null;
    campos.forEach(function (c) {
      if (!validar(c) && !primeroInvalido) { primeroInvalido = c; }
    });
    if (primeroInvalido) {
      e.preventDefault();
      estado.className = "estado fallo";
      estado.textContent = "Revisa los campos marcados antes de enviar.";
      primeroInvalido.focus();
    } else {
      estado.className = "estado ok";
      estado.textContent = "Formulario válido. Se abrirá tu cliente de correo para enviar el mensaje.";
    }
  });
})();

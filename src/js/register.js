const form = document.querySelector("#registroForm");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const mensajeError = document.getElementById("mensaje-error");
const toast = new bootstrap.Toast(document.querySelector(".toast"), {
  autohide: false, // Desactivar el cierre automático
});


let div1 = document.getElementById("error1");
div1.style.display = "none";

const showError = (data) => {
  div1.textContent = data.message;
  let inputs = document.querySelectorAll("input");
  inputs.innerHtml = "";
  div1.style.display = "block";
  console.log(div1);
  setTimeout(() => {
    div1.style.display = "none";
  }, 2000);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    mostrarError("Las contraseñas no coinciden.");
  } else {
    // mensajeError.textContent = "";
    // Envía el formulario si las contraseñas coinciden.

    const newData = Object.fromEntries(new FormData(e.target));

    console.log(newData);
    fetch("http://localhost:3000/register",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
  
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then((errorData) => {
            showError(errorData);
          });
        }
        if (response.status === 200) {
          window.location.href = "../pages/login.html";
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  }
});

function mostrarError(mensaje) {
  mensajeError.textContent = mensaje;
  toast.show();
}

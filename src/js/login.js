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

// Validación del formulario usando JavaScript
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      event.preventDefault();
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      if (username.trim() === "" || password.trim() === "") {
        alert("Por favor, complete todos los campos.");
        event.preventDefault(); // Evitar que el formulario se envíe
      }

      const newData = Object.fromEntries(new FormData(event.target));

      console.log(newData);

      fetch("http://localhost:3000/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then((errorData) => {
              showError(errorData);
            });
          }
          if (response.status === 200) {
            response.json().then((responseData) => {
              const token = responseData.token;
              const username = responseData.username;
              localStorage.setItem("username", username);
              localStorage.setItem("token", token);
            });
            window.location.href = "../pages/home.html";
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  });


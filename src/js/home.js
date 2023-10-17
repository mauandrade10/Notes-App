//const note = document.querySelector('#modalNuevaNota');
const myModal = document.querySelector("#modalM");
//Token de autorizacion de usuario Autenticado
const token = localStorage.getItem("token");
// Nombre del Usuario que ingreso
const username = localStorage.getItem("username");
// Contenedor de Notas
const notaContainer = document.getElementById("notaContainer");
// Elemento de dom donde directamente aplico el valor del usuario que ingreso
const user = (document.querySelector(".nav-link").textContent = username);
// Boton crear/Actualizar del modal
const buttonSubmitModal = document.querySelector("#modalbutton");
//Formulario del modal
const formSubmitModal = document.querySelector(".formModal");
// Modal par eliminar
const modalDelete = document.querySelector("#staticBackdrop");

let prueba = {};

// Eventos del formulario
const methodCreate = function (event) {
  event.preventDefault();
  const newData = Object.fromEntries(new FormData(event.target));
  console.log(newData);
  console.log(dataOld);
  console.log("CREADO");
};
const methodUpdate = function (event) {
  event.preventDefault();
  const newData = Object.fromEntries(new FormData(event.target));
  const resultado = { ...newData, ...prueba };
  console.log(newData);
  console.log(resultado);
  console.log("ACTUALIZADO");
};

// Manejador del evento show o mostrar el modal
myModal.addEventListener("show.bs.modal", function (event) {
  // Obtener el botón que activó el modal
  const buttonEvent = event.relatedTarget;
  // Obtener el valor del atributo "data-action"
  const action = buttonEvent.getAttribute("data-action");
  // Titulo del modal
  const modalTitle = document.querySelector("#modalMLabel");
  // Determinar si el modal es para crear o actualizar una nota
  if (action === "create") {
    // El modal es para crear una nota

    // Titulo del modal para crear una nota
    modalTitle.textContent = "Crear nota";
    // Boton de crear carta/Cambiarndo el texto
    buttonSubmitModal.textContent = "Crear";
    // Cambiamos y/o agregamos el atributo +form+ para generar el submit en el formulario
    buttonSubmitModal.setAttribute("form", "createForm");
    // Añadimos el id al formulario del modal para poder manipularlo
    formSubmitModal.setAttribute("id", "createForm");
    // Seleccionamos el modal por si ID
    const create = document.querySelector("#createForm");
    console.log(create);
    // Añadimos el listener//escuchador de eventos para manejar el evento submit
    create.addEventListener("submit", methodCreate);

    console.log("crear");
  } else if (action === "update") {
    // El modal es para actualizar una nota

    // Titulo del modal para crear una nota
    modalTitle.textContent = "Actualizar nota";
    // Boton de crear carta/Cambiarndo el texto
    buttonSubmitModal.textContent = "Actualizar";
    // Cambiamos y/o agregamos el atributo +form+ para generar el submit en el formulario
    buttonSubmitModal.setAttribute("form", "updateForm");
    // Añadimos el id al formulario del modal para poder manipularlo
    formSubmitModal.setAttribute("id", "updateForm");
    // Seleccino el elemento padre de boton que activo modal // modal-footer
    const cardFooter = buttonEvent.parentElement;
    // Seleccino el elemento padre de boton que activo modal // modal-footer/modal
    const cardContent = cardFooter.parentElement;

    // Obtener los valores que queremos extraer
    // Titulo de la carta Nota
    const titleElement = cardContent.querySelector(".card-title").textContent;
    // Descripcion de la carta Nota
    const textElement = cardContent.querySelector(".card-text").textContent;

    prueba = {
      tituloOld: titleElement,
      contenidoOld: textElement,
    };

    // Obtener una referencia a los elementos a mostrar
    // Input Titulo
    const titleNoteModal = (document.querySelector("#titulo").value =
      titleElement);
    // Textarea Descripcion
    const textNoteModal = (document.querySelector("#contenido").value =
      textElement);

    // Seleccionamos el modal por su ID
    const update = document.querySelector("#updateForm");
    console.log(update);
    // Asignamos el escuchador de eventos para controlar su evento submit
    update.addEventListener("submit", editarNota);
  }
});

myModal.addEventListener("hidden.bs.modal", function (event) {
  event.preventDefault();
  // Obtener una referencia a los elementos en el modal cuyos valores deseas borrar
  var titleElement = document.querySelector("#titulo");
  var textElement = document.querySelector("#contenido");

  // Establecer los valores de los elementos en una cadena vacía
  titleElement.value = "";
  textElement.value = "";

  const create = document.querySelector("#createForm");
  const update = document.querySelector("#updateForm");
  console.log(create);

  if (create !== null) {
    console.log("evento crear eliminado");
    create.removeEventListener("submit", methodCreate);
  } else if (update !== null) {
    console.log("evento actualizar eliminado");
    update.removeEventListener("submit", methodUpdate);
  }
  console.log(update);
});

// Función para obtener y mostrar las notas desde la API
function obtenerNotasDesdeAPI() {
  // Realiza una solicitud GET a la API para obtener las notas
  fetch("http://localhost:3000/notes", {
    method: "GET",
    headers: { token: `${token}` },
  })
    .then((response) => response.json())
    .then((notasDesdeAPI) => {
      // Llama a la función para mostrar las notas en la interfaz
      mostrarNotas(notasDesdeAPI);
    })
    .catch((error) => {
      console.error("Error al obtener las notas desde la API:", error);
      // Puedes mostrar un mensaje de error al usuario, si es necesario
    });
}
// Función para mostrar las notas en la interfaz
function mostrarNotas(notas) {
  // Limpia el contenido actual del contenedor de notas
  notaContainer.innerHTML = "";
  console.log(notas);
  console.log(notas.length);
  if (notas.length === undefined) {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-3");

    const cardHTML = `
      <div class="card mb-4" id="cardNote">
      <div class="card-body overflow-hidden">
          <h5 class="card-title">${notas.titulo}</h5>
          <p class="card-text">${notas.contenido}</p>
      </div>
      <div class="card-footer text-right border-0">
          <button class="btn btn-primary mr-2" data-action="update" data-bs-toggle="modal"
          data-bs-target="#modalM">Editar</button>
          <button class="btn btn-danger" data-action="delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Eliminar</button>
      </div>
  </div>
  
      `;

    colDiv.innerHTML = cardHTML;
    notaContainer.appendChild(colDiv);
    return location.reload();
  }
  notas.forEach((nota) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-3");

    const cardHTML = `
        <div class="card mb-4" id="cardNote">
        <div class="card-body overflow-hidden">
            <h5 class="card-title">${nota.titulo}</h5>
            <p class="card-text">${nota.contenido}</p>
        </div>
        <div class="card-footer text-right border-0">
            <button class="btn btn-primary mr-2" data-action="update" data-bs-toggle="modal"
            data-bs-target="#modalM">Editar</button>
            <button class="btn btn-danger" data-action="delete" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Eliminar</button>
        </div>
    </div>
    
        `;

    colDiv.innerHTML = cardHTML;
    notaContainer.appendChild(colDiv);
  });
}

function crearNotaNueva(event) {
  event.preventDefault();

  const newData = Object.fromEntries(new FormData(event.target));

  console.log(newData);
  console.log(token);

  fetch("http://localhost:3000/notes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
    },
    body: JSON.stringify(newData),
  })
    .then((response) => response.json())
    .then((data) => {
      mostrarNotas(data);
    })
    .catch((error) => {
      console.error("Error al enviar la nota:", error);
    });
}

// Llama a la función para mostrar las notas al cargar la página
obtenerNotasDesdeAPI();

// Funciones de edición y eliminación (puedes personalizar estas funciones)
function editarNota(event) {
  event.preventDefault();

  const newData = Object.fromEntries(new FormData(event.target));

  console.log(newData);

  const resultado = { ...newData, ...prueba };
  console.log(token);

  fetch("http://localhost:3000/notes/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
    },
    body: JSON.stringify(resultado),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error al enviar la nota:", error);
    });
}

function eliminarNota(event) {
  event.preventDefault();
  console.log(prueba)
  console.log(token);

  fetch("http://localhost:3000/notes/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: `${token}`,
    },
    body: JSON.stringify(prueba),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error al enviar la nota:", error);
    });
}

modalDelete.addEventListener("show.bs.modal", (event) => {
  console.log("funciona");
  const buttonEvent = event.relatedTarget;
  // Seleccino el elemento padre de boton que activo modal // modal-footer
  const cardFooter = buttonEvent.parentElement;
  // Seleccino el elemento padre de boton que activo modal // modal-footer/modal
  const cardContent = cardFooter.parentElement;
  // Obtener los valores que queremos extraer
  // Titulo de la carta Nota
  const titleElement = cardContent.querySelector(".card-title").textContent;
  // Descripcion de la carta Nota
  const textElement = cardContent.querySelector(".card-text").textContent;
  const textDelete = document.querySelector("#textError").textContent= `¿Estas seguro que deseas eliminar tu nota ${titleElement}?`
  console.log(titleElement + " " + textElement);


  prueba={
    titulo:titleElement,
    contenido:textElement
  }

  const buttonD= document.querySelector('#buttonD')

  buttonD.addEventListener('click', eliminarNota)
});

modalDelete.addEventListener("hidden.bs.modal", (event) => {
  event.preventDefault();

    const buttonD= document.querySelector('#buttonD')


    buttonD.removeEventListener("click", eliminarNota);

    location.reload()

  console.log(update);
});

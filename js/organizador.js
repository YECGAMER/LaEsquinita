const nombreTarea = document.getElementById("nombreTarea");
const cursoTarea = document.getElementById("cursoTarea");
const fechaEntrega = document.getElementById("task-date");
const categoriaTarea = document.getElementById("categoriaTarea");
const prioridad = document.getElementById("prioridad");
const estadoTarea = document.getElementById("estadoTarea");
const descripcionTarea = document.getElementById("descripcionTarea");
const btnGuardarTarea = document.getElementById("btnGuardarTarea");
const btnLimpiarFormulario = document.getElementById("btnLimpiarFormulario");

const detalleTarea = document.getElementById("detalleTarea");
const resumenTarea = document.getElementById("resumenTarea");

// VISTA PREVIA DE LA TAREA

function mostrarVistaPrevia() {
    detalleTarea.innerHTML = `
    <div class="detail-content">
        <h3>
        ${nombreTarea.value || "Nueva tarea"}
        </h3>
        <p>
        Curso:
        ${cursoTarea.value || "Sin especificar"}
        </p>

        <p>
        Fecha:
        ${fechaEntrega.value || "Sin fecha"}
        </p>

        <p>
        Categoría:
        ${categoriaTarea.value || "Sin categoría"}
        </p>

        <p>
        Prioridad:
        ${prioridad.value}
        </p>

        <p>
        Estado:
        ${estadoTarea.value}
        </p>

        <p>
        Descripción:
        ${descripcionTarea.value || "Sin descripción"}
        </p>
    </div>
    `;
}

// VALIDAR FORMULARIO
function validarFormulario() {
    if (nombreTarea.value === "" ||
        cursoTarea.value === "" ||
        fechaEntrega.value === "" ||
        descripcionTarea.value === "") {
        resumenTarea.innerHTML = `
        ⚠ Complete todos los campos obligatorios antes de guardar.
        `;
        return false;
    }
    return true;
}

// GUARDAR TAREA
function guardarTarea() {
    if (!validarFormulario()) {
        return;
    }
    let tareasGuardadas =
        JSON.parse(localStorage.getItem("tareas")) || [];

    const nuevaTarea = {
        id: Date.now(),
        nombre: nombreTarea.value,
        curso: cursoTarea.value,
        categoria: categoriaTarea.value,
        descripcion: descripcionTarea.value,
        fechaEntrega: fechaEntrega.value,
        prioridad: prioridad.value,
        estado: estadoTarea.value
    };

    tareasGuardadas.push(nuevaTarea);
    localStorage.setItem(
        "tareas",
        JSON.stringify(tareasGuardadas)
    );

    resumenTarea.innerHTML = `
    ✓ Tarea guardada correctamente.
    `;

    limpiarFormulario();
}

// LIMPIAR FORMULARIO
function limpiarFormulario() {
    nombreTarea.value = "";
    cursoTarea.value = "";
    fechaEntrega.value = "";
    categoriaTarea.value = "";
    prioridad.value = "Alta";
    estadoTarea.value = "Pendiente";
    descripcionTarea.value = "";
    detalleTarea.innerHTML = `
    <div class="detail-empty">
        <h3>
        Vista previa
        </h3>
        <p>
        Aquí aparecerá la información de la tarea.
        </p>
    </div>
    `;
}

// EVENTOS PARA ACTUALIZAR VISTA PREVIA
nombreTarea.addEventListener(
    "input",
    mostrarVistaPrevia
);

cursoTarea.addEventListener(
    "input",
    mostrarVistaPrevia
);

fechaEntrega.addEventListener(
    "change",
    mostrarVistaPrevia
);

categoriaTarea.addEventListener(
    "change",
    mostrarVistaPrevia
);

prioridad.addEventListener(
    "change",
    mostrarVistaPrevia
);

estadoTarea.addEventListener(
    "change",
    mostrarVistaPrevia
);

descripcionTarea.addEventListener(
    "input",
    mostrarVistaPrevia
);

// BOTONES
btnGuardarTarea.addEventListener(
    "click",
    guardarTarea
);

btnLimpiarFormulario.addEventListener(
    "click",
    limpiarFormulario
);
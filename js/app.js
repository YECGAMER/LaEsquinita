const contenedorTareas = document.getElementById("tasks-list");
const mensajeTareas = document.getElementById("empty-state");
const buscador = document.getElementById("search-input");
const filtroCurso = document.getElementById("course-filter");
const filtroEstado = document.getElementById("status-filter");
const btnLimpiarFiltros = document.getElementById("clear-filters");

// Obtener cursos únicos
function obtenerCursosUnicos(lista) {
    const cursos = [];

    for (const tarea of lista) {
        if (!cursos.includes(tarea.curso)) {
            cursos.push(tarea.curso);
        }
    }

    return cursos;
}

// Obtener categorías únicas
function obtenerCategoriasUnicas(lista) {
    const categorias = [];

    for (const tarea of lista) {
        if (!categorias.includes(tarea.categoria)) {
            categorias.push(tarea.categoria);
        }
    }

    return categorias;
}

// Cargar filtros
function cargarFiltros() {
    const cursos = obtenerCursosUnicos(tareas);

    for (const curso of cursos) {
        const opcion = document.createElement("option");
        opcion.value = curso;
        opcion.textContent = curso;
        filtroCurso.appendChild(opcion);
    }
}

// Crear tarjeta de tarea
function crearTarjetaTarea(tarea) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("task-card");

    tarjeta.innerHTML = `
        <div class="task-top">
            <span class="task-course">
                ${tarea.curso}
            </span>
            <span class="status-chip">
                ${tarea.estado}
            </span>
        </div>
        <h3>
            ${tarea.nombre}
        </h3>
        <p class="task-description">
            ${tarea.descripcion}
        </p>
        <p>
            Fecha de entrega:
            <strong>
            ${tarea.fechaEntrega}
            </strong>
        </p>
        <p>
            Prioridad:
            <strong>
            ${tarea.prioridad}
            </strong>
        </p>
        <p>
            Categoría:
            ${tarea.categoria}
        </p>
    `;

    return tarjeta;
}

// Mostrar tareas
function renderizarTareas(lista) {
    contenedorTareas.innerHTML = "";

    if (lista.length === 0) {
        mensajeTareas.textContent = "No se encontraron tareas con esos filtros.";
        return;
    }

    mensajeTareas.textContent = `Mostrando ${lista.length} tarea(s).`;

    for (const tarea of lista) {
        const tarjeta = crearTarjetaTarea(tarea);
        contenedorTareas.appendChild(tarjeta);
    }
}

// Estadísticas

function actualizarEstadisticas() {

    const total = document.getElementById("totalTareas");
    const completadas = document.getElementById("tareasCompletadas");
    const pendientes = document.getElementById("tareasPendientes");

    let cantidadCompletadas = 0;
    let cantidadPendientes = 0;

    for (const tarea of tareas) {

        if (tarea.estado === "Completada") {
            cantidadCompletadas++;
        }
        if (tarea.estado === "Pendiente") {
            cantidadPendientes++;
        }
    }
    total.textContent = tareas.length;
    completadas.textContent = cantidadCompletadas;
    pendientes.textContent = cantidadPendientes;

}

// Filtrar tareas
function filtrarTareas() {
    const texto = buscador.value.toLowerCase();
    const cursoSeleccionado = filtroCurso.value;
    const estadoSeleccionado = filtroEstado.value;

    const tareasFiltradas = tareas.filter(function(tarea) {
        const cumpleBusqueda =
        tarea.nombre.toLowerCase().includes(texto)
        tarea.curso.toLowerCase().includes(texto)
        ||
        tarea.descripcion.toLowerCase().includes(texto);

        const cumpleCurso =
        cursoSeleccionado === ""
        ||
        tarea.curso === cursoSeleccionado;

        const cumpleEstado =
        estadoSeleccionado === "todos"
        ||
        tarea.estado.toLowerCase() === estadoSeleccionado;

        return cumpleBusqueda &&
        cumpleCurso &&
        cumpleEstado;
    });

    renderizarTareas(tareasFiltradas);
}

// Limpiar filtros
function limpiarFiltros() {
    buscador.value = "";
    filtroCurso.value = "";
    filtroEstado.value = "todos";
    renderizarTareas(tareas);
}

// Eventos
buscador.addEventListener("input", filtrarTareas);
filtroCurso.addEventListener("change", filtrarTareas);
filtroEstado.addEventListener("change", filtrarTareas);
btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

// Inicio
document.addEventListener("DOMContentLoaded", function() {
    cargarFiltros();
    renderizarTareas(tareas);
    actualizarEstadisticas();
});

// Inicio
document.addEventListener("DOMContentLoaded", cargarTareas);

const nombreTarea = document.getElementById("nombreTarea");
const cursoTarea = document.getElementById("cursoTarea");
const fechaEntrega = document.getElementById("fechaEntrega");
const prioridad = document.getElementById("prioridad");
const descripcionTarea = document.getElementById("descripcionTarea");
const btnGuardarTarea = document.getElementById("btnGuardarTarea");
const detalleTarea = document.getElementById("detalleTarea");

// Mostrar vista previa
function mostrarVistaPrevia() {
    detalleTarea.innerHTML = `
<div class="detail-content">
<h3>
${nombreTarea.value}
</h3>
<p>
Curso: ${cursoTarea.value}
</p>
<p>
Fecha: ${fechaEntrega.value}
</p>
<p>
Prioridad: ${prioridad.value}
</p>
<p>
Descripción:
${descripcionTarea.value}
</p>
</div>
`;
}



// Eventos
nombreTarea.addEventListener("input", mostrarVistaPrevia);
cursoTarea.addEventListener("change", mostrarVistaPrevia);
fechaEntrega.addEventListener("change", mostrarVistaPrevia);
prioridad.addEventListener("change", mostrarVistaPrevia);
descripcionTarea.addEventListener("input", mostrarVistaPrevia);
btnGuardarTarea.addEventListener("click", guardarTarea);


//---------------------------------------------------------------------------------
//------------------------------Mis tareas-----------------------------------------
//---------------------------------------------------------------------------------
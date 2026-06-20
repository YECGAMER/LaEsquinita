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

// --- Elementos del DOM ---
const listaMisTareas = document.getElementById("listaMisTareas");
const mensajeMisTareas = document.getElementById("mensajeMisTareas");
const buscadorMisTareas = document.getElementById("buscarMisTareas");
const filtroEstadoMisTareas = document.getElementById("estadoMisTareas");
const btnLimpiarMisTareas = document.getElementById("limpiarMisTareas");

// --- Funciones de Datos (LocalStorage) ---
function obtenerMisTareas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
}

function guardarMisTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// --- Renderizado de UI ---
function crearTarjeta(tarea) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("task-card");

    tarjeta.innerHTML = `
        <div class="task-top">
            <span class="task-course">${tarea.curso}</span>
            <span class="status-chip">${tarea.estado}</span>
        </div>
        <h3>${tarea.nombre}</h3>
        <p class="task-description">${tarea.descripcion}</p>
        <p>Fecha: <strong>${tarea.fechaEntrega}</strong></p>
        <p>Prioridad: <strong>${tarea.prioridad}</strong></p>
        <button class="button button-secondary btn-eliminar">Eliminar</button>
    `;

    // Asignar el evento eliminar de forma segura mediante JS (evita problemas de scope)
    const btnEliminar = tarjeta.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => eliminarTarea(tarea.id));

    return tarjeta;
}

function mostrarMisTareas(lista) {
    if (!listaMisTareas) return; // Validación por si no estás en la página de la lista
    
    listaMisTareas.innerHTML = "";

    if (lista.length === 0) {
        if (mensajeMisTareas) mensajeMisTareas.textContent = "No se encontraron tareas.";
        return;
    }

    if (mensajeMisTareas) {
        mensajeMisTareas.textContent = `Mostrando ${lista.length} tarea(s).`;
    }

    lista.forEach(tarea => {
        const tarjeta = crearTarjeta(tarea);
        listaMisTareas.appendChild(tarjeta);
    });
}

// --- Lógica de Filtros y Acciones ---
function filtrarMisTareas() {
    // Validamos que existan los filtros antes de leer sus valores
    const texto = buscadorMisTareas ? buscadorMisTareas.value.toLowerCase() : "";
    const estado = filtroEstadoMisTareas ? filtroEstadoMisTareas.value : "todos";

    const tareas = obtenerMisTareas();

    const resultado = tareas.filter(tarea => {
        const cumpleTexto = tarea.nombre.toLowerCase().includes(texto) || 
                             tarea.curso.toLowerCase().includes(texto);
        const cumpleEstado = estado === "todos" || tarea.estado === estado;

        return cumpleTexto && cumpleEstado;
    });

    mostrarMisTareas(resultado);
}

function eliminarTarea(id) {
    let tareas = obtenerMisTareas();
    tareas = tareas.filter(tarea => tarea.id !== id);
    
    guardarMisTareas(tareas);
    
    // Recarga la lista actual aplicando los filtros que ya estén puestos
    filtrarMisTareas(); 
}

function limpiarFiltros() {
    if (buscadorMisTareas) buscadorMisTareas.value = "";
    if (filtroEstadoMisTareas) filtroEstadoMisTareas.value = "todos";
    mostrarMisTareas(obtenerMisTareas());
}

// --- Inicialización de Eventos ---
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar la vista
    mostrarMisTareas(obtenerMisTareas());

    // Escuchar eventos SOLO si los elementos existen en el HTML actual
    if (buscadorMisTareas) {
        buscadorMisTareas.addEventListener("input", filtrarMisTareas);
    }
    if (filtroEstadoMisTareas) {
        filtroEstadoMisTareas.addEventListener("change", filtrarMisTareas);
    }
    if (btnLimpiarMisTareas) {
        btnLimpiarMisTareas.addEventListener("click", limpiarFiltros);
    }
});
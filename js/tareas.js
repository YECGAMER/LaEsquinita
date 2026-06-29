let tareas = []

// Captura de elementos con los nuevos IDs del HTML
const contenedorTareas = document.getElementById("tasks-list")
const mensajeTareas = document.getElementById("empty-state")
const buscador = document.getElementById("buscarTarea")
const filtroCurso = document.getElementById("filtroCurso")
const filtroCategoria = document.getElementById("filtroCategoria")
const filtroEstado = document.getElementById("filtroEstado")
const btnLimpiarFiltros = document.getElementById("clear-filters")

function cargarTareas() {
    fetch("data/tareaEjemplo.json")
        .then(function(respuesta) {
            return respuesta.json()
        })
        .then(function(datos) {
            tareas = datos

            // Cargar los selectores dinámicamente con datos únicos del JSON
            cargarFiltrosCursos()
            cargarFiltrosCategorias()
            
            renderizarTareas(tareas)
            actualizarEstadisticas()
        })
        .catch(function(error) {
            console.error("Error cargando tareas:", error)
            mensajeTareas.textContent = "No se pudieron cargar las tareas."
        })
}

// Obtener cursos únicos
function obtenerCursosUnicos(lista) {
    const cursos = []
    for (const tarea of lista) {
        if (!cursos.includes(tarea.curso)) {
            cursos.push(tarea.curso)
        }
    }
    return cursos
}

// Obtener categorías únicas
function obtenerCategoriasUnicas(lista) {
    const categorias = []
    for (const tarea of lista) {
        if (tarea.categoria && !categorias.includes(tarea.categoria)) {
            categorias.push(tarea.categoria)
        }
    }
    return categorias
}

// Cargar opciones en el select de Cursos
function cargarFiltrosCursos() {
    filtroCurso.innerHTML = `<option value="">Todos los cursos</option>`
    const cursos = obtenerCursosUnicos(tareas)
    for (const curso of cursos) {
        const opcion = document.createElement("option")
        opcion.value = curso
        opcion.textContent = curso
        filtroCurso.appendChild(opcion)
    }
}

// Cargar opciones en el select de Categorías
function cargarFiltrosCategorias() {
    filtroCategoria.innerHTML = `<option value="">Todas las categorías</option>`
    const categorias = obtenerCategoriasUnicas(tareas)
    for (const categoria of categorias) {
        const opcion = document.createElement("option")
        opcion.value = categoria
        opcion.textContent = categoria
        filtroCategoria.appendChild(opcion)
    }
}

// Crear tarjeta de tarea
function crearTarjetaTarea(tarea) {
    const tarjeta = document.createElement("article")
    tarjeta.classList.add("task-card")

    const claseEstado = tarea.estado.toLowerCase() === "completada"
        ? "status-completada"
        : "status-pendiente"

    tarjeta.innerHTML = `
        <div class="task-top">
            <span class="task-course">${tarea.curso}</span>
            <span class="status-chip ${claseEstado}">
                ${tarea.estado}
            </span>
        </div>

        <h3>${tarea.nombre}</h3>
        <p class="task-description">${tarea.descripcion}</p>

        <div class="task-meta">
            <p>Fecha de entrega: <strong>${tarea.fechaEntrega}</strong></p>
            <p>Prioridad: <strong>${tarea.prioridad}</strong></p>
            <p>Categoría: <strong>${tarea.categoria}</strong></p>
        </div>
    `
    return tarjeta
}

// Mostrar tareas
function renderizarTareas(lista) {
    contenedorTareas.innerHTML = ""

    if (lista.length === 0) {
        mensajeTareas.style.display = "block"
        mensajeTareas.textContent = "No se encontraron tareas con esos filtros."
        return
    }

    mensajeTareas.style.display = "block"
    mensajeTareas.textContent = `Mostrando ${lista.length} tarea(s).`

    for (const tarea of lista) {
        const tarjeta = crearTarjetaTarea(tarea)
        contenedorTareas.appendChild(tarjeta)
    }
}

// Estadísticas
function actualizarEstadisticas() {
    const total = document.getElementById("totalTareas")
    const completadas = document.getElementById("tareasCompletadas")
    const pendientes = document.getElementById("tareasPendientes")

    let cantidadCompletadas = 0
    let cantidadPendientes = 0

    for (const tarea of tareas) {
        if (tarea.estado.toLowerCase() === "completada") {
            cantidadCompletadas++
        } else {
            cantidadPendientes++
        }
    }

    if(total) total.textContent = tareas.length
    if(completadas) completadas.textContent = cantidadCompletadas
    if(pendientes) pendientes.textContent = cantidadPendientes
}

// Filtrar tareas con los 4 filtros combinados
function filtrarTareas() {
    const texto = buscador.value.toLowerCase()
    const cursoSeleccionado = filtroCurso.value
    const categoriaSeleccionada = filtroCategoria.value
    const estadoSeleccionado = filtroEstado.value

    const tareasFiltradas = tareas.filter(function(tarea) {
        const cumpleBusqueda =
            tarea.nombre.toLowerCase().includes(texto) ||
            tarea.curso.toLowerCase().includes(texto) ||
            tarea.descripcion.toLowerCase().includes(texto)

        const cumpleCurso =
            cursoSeleccionado === "" ||
            tarea.curso === cursoSeleccionado

        const cumpleCategoria =
            categoriaSeleccionada === "" ||
            tarea.categoria === categoriaSeleccionada

        const cumpleEstado =
            estadoSeleccionado === "" ||
            tarea.estado.toLowerCase() === estadoSeleccionado.toLowerCase()

        return cumpleBusqueda && cumpleCurso && cumpleCategoria && cumpleEstado
    })

    renderizarTareas(tareasFiltradas)
}

// Limpiar filtros
function limpiarFiltros() {
    buscador.value = ""
    filtroCurso.value = ""
    filtroCategoria.value = ""
    filtroEstado.value = ""
    renderizarTareas(tareas)
}

// Eventos escuchadores
buscador.addEventListener("input", filtrarTareas)
filtroCurso.addEventListener("change", filtrarTareas)
filtroCategoria.addEventListener("change", filtrarTareas)
filtroEstado.addEventListener("change", filtrarTareas)
btnLimpiarFiltros.addEventListener("click", limpiarFiltros)

// Inicio de página
document.addEventListener("DOMContentLoaded", function() {
    cargarTareas()
})
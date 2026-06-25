let tareas = []

const contenedorTareas = document.getElementById("tasks-list")
const mensajeTareas = document.getElementById("empty-state")
const buscador = document.getElementById("search-input")
const filtroCurso = document.getElementById("course-filter")
const filtroEstado = document.getElementById("status-filter")
const btnLimpiarFiltros = document.getElementById("clear-filters")


function cargarTareas() {

    fetch("data/tareaEjemplo.json")
        .then(function(respuesta) {
            return respuesta.json()
        })
        .then(function(datos) {

            tareas = datos

            cargarFiltros()
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


// Cargar filtros en el select
function cargarFiltros() {

    filtroCurso.innerHTML = `<option value="">Todos los cursos</option>`

    const cursos = obtenerCursosUnicos(tareas)

    for (const curso of cursos) {

        const opcion = document.createElement("option")

        opcion.value = curso
        opcion.textContent = curso

        filtroCurso.appendChild(opcion)
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

        <p class="task-description">
            ${tarea.descripcion}
        </p>


        <div class="task-meta">

            <p>
                Fecha de entrega:
                <strong>${tarea.fechaEntrega}</strong>
            </p>


            <p>
                Prioridad:
                <strong>${tarea.prioridad}</strong>
            </p>


            <p>
                Categoría:
                <strong>${tarea.categoria}</strong>
            </p>

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

    mensajeTareas.textContent =
        `Mostrando ${lista.length} tarea(s).`



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



    total.textContent = tareas.length

    completadas.textContent = cantidadCompletadas

    pendientes.textContent = cantidadPendientes

}



// Filtrar tareas
function filtrarTareas() {

    const texto = buscador.value.toLowerCase()

    const cursoSeleccionado = filtroCurso.value

    const estadoSeleccionado = filtroEstado.value



    const tareasFiltradas = tareas.filter(function(tarea) {


        const cumpleBusqueda =

            tarea.nombre.toLowerCase().includes(texto) ||

            tarea.curso.toLowerCase().includes(texto) ||

            tarea.descripcion.toLowerCase().includes(texto)



        const cumpleCurso =

            cursoSeleccionado === "" ||

            tarea.curso === cursoSeleccionado



        const cumpleEstado =

            estadoSeleccionado === "todos" ||

            tarea.estado.toLowerCase() === estadoSeleccionado



        return cumpleBusqueda && cumpleCurso && cumpleEstado

    })


    renderizarTareas(tareasFiltradas)

}



// Limpiar filtros
function limpiarFiltros() {

    buscador.value = ""

    filtroCurso.value = ""

    filtroEstado.value = "todos"


    renderizarTareas(tareas)

}



// Eventos
buscador.addEventListener("input", filtrarTareas)

filtroCurso.addEventListener("change", filtrarTareas)

filtroEstado.addEventListener("change", filtrarTareas)

btnLimpiarFiltros.addEventListener("click", limpiarFiltros)



// Inicio de página
document.addEventListener("DOMContentLoaded", function() {

    cargarTareas()

})
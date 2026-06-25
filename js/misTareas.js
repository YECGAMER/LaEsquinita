document.addEventListener("DOMContentLoaded", function () {
    // Lee las tareas guardadas en el navegador o inicia con una lista vacía si es la primera vez
    let tareas = JSON.parse(localStorage.getItem("tareas")) || []

    // Captura de elementos del DOM para manipular la interfaz dinámica
    const contenedorTareas = document.getElementById("tasks-list")
    const mensajeTareas = document.getElementById("empty-state")
    const buscador = document.getElementById("buscarTarea")
    const filtroCurso = document.getElementById("filtroCurso")
    const filtroCategoria = document.getElementById("filtroCategoria")
    const filtroEstado = document.getElementById("filtroEstado")

    // Extrae cursos y categorías sin repetir para rellenar los selectores dinámicamente
    function extraerFiltrosUnicos() {
        filtroCurso.innerHTML = '<option value="">Todos los cursos</option>'
        filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>'

        const cursos = []
        const categorias = []

        // Recorre el arreglo principal para agrupar los textos únicos
        for (const t of tareas) {
            if (t.curso && !cursos.includes(t.curso)) cursos.push(t.curso)
            if (t.categoria && !categorias.includes(t.categoria)) categorias.push(t.categoria)
        }

        // Inyecta las opciones de cursos descubiertas en el HTML
        for (const curso of cursos) {
            const op = document.createElement("option")
            op.value = curso
            op.textContent = curso
            filtroCurso.appendChild(op)
        }

        // Inyecta las opciones de categorías descubiertas en el HTML
        for (const cat of categorias) {
            const op = document.createElement("option")
            op.value = cat
            op.textContent = cat
            filtroCategoria.appendChild(op)
        }
    }

    // Construye el bloque HTML (tarjeta) de forma dinámica para cada tarea
    function crearTarjeta(tarea) {
        const tarjeta = document.createElement("article")
        tarjeta.classList.add("user-task-card")

        // Define clases visuales dinámicas según el estado actual de la entrega
        const claseEstado = tarea.estado.toLowerCase() === "completada" ? "status-completada" : "status-pendiente"
        const fechaMostrar = tarea.fechaEntrega || tarea.fecha

        // Inyección de la estructura con Template Literals de JavaScript
        tarjeta.innerHTML = `
            <div class="task-top">
                <span class="task-course">${tarea.curso}</span>
                <span class="status-chip ${claseEstado}">${tarea.estado}</span>
            </div>
            <h3>${tarea.nombre}</h3>
            <div class="task-info">
                <p class="task-description">${tarea.descripcion || "Sin descripción"}</p>
                <p>Fecha de entrega: <strong>${fechaMostrar}</strong></p>
                <p>Prioridad: <strong>${tarea.prioridad}</strong></p>
                <p>Categoría: <strong>${tarea.categoria}</strong></p>
            </div>
            <div class="task-buttons">
                ${tarea.estado !== "Completada" ? `<button class="complete-button" data-id="${tarea.id}">Marcar Completada</button>` : ""}
                <button class="delete-button" data-id="${tarea.id}">Eliminar</button>
            </div>
        `

        // Asocia el evento de actualización de estado al botón correspondiente
        const btnCompletar = tarjeta.querySelector(".complete-button")
        if (btnCompletar) {
            btnCompletar.addEventListener("click", function () {
                cambiarEstadoTarea(tarea.id, "Completada")
            })
        }

        // Asocia el evento de borrado definitivo a la tarjeta activa
        const btnEliminar = tarjeta.querySelector(".delete-button")
        if (btnEliminar) {
            btnEliminar.addEventListener("click", function () {
                eliminarTarea(tarea.id)
            })
        }

        return tarjeta
    }

    // Limpiar filtros
    function limpiarFiltros() {

        buscador.value = ""

        filtroCurso.value = ""

        filtroEstado.value = "todos"


        renderizarTareas(tareas)

    }

    // Filtra el arreglo de tareas según los criterios seleccionados y redibuja la pantalla
    function renderizarTareas() {
        contenedorTareas.innerHTML = ""

        const texto = buscador.value.toLowerCase()
        const cursoSel = filtroCurso.value
        const catSel = filtroCategoria.value
        const estadoSel = filtroEstado.value.toLowerCase()

        // Aplica un método filter de orden superior para evaluar múltiples condiciones en simultáneo
        const filtradas = tareas.filter(function (t) {
            const desc = t.descripcion ? t.descripcion.toLowerCase() : ""
            const cumpleBusqueda = t.nombre.toLowerCase().includes(texto) ||
                t.curso.toLowerCase().includes(texto) ||
                desc.includes(texto)

            const cumpleCurso = cursoSel === "" || t.curso === cursoSel
            const cumpleCat = catSel === "" || t.categoria === catSel
            const cumpleEstado = estadoSel === "" || t.estado.toLowerCase() === estadoSel

            return cumpleBusqueda && cumpleCurso && cumpleCat && cumpleEstado
        })

        // Controla visualmente el estado vacío si no hay coincidencias
        if (filtradas.length === 0) {
            mensajeTareas.style.display = "block"
            mensajeTareas.textContent = "No se encontraron tareas con esos filtros."
            return
        }

        mensajeTareas.style.display = "none"

        // Envía a fabricar y montar cada tarjeta que superó los filtros aplicados
        for (const t of filtradas) {
            const tarjeta = crearTarjeta(t)
            contenedorTareas.appendChild(tarjeta)
        }
    }

    // Recalcula y actualiza los indicadores numéricos del panel superior
    function actualizarEstadisticas() {
        const total = document.getElementById("totalTareas")
        const completadas = document.getElementById("tareasCompletadas")
        const pendientes = document.getElementById("tareasPendientes")

        let cantidadCompletadas = 0
        let cantidadPendientes = 0

        for (const t of tareas) {
            if (t.estado.toLowerCase() === "completada") {
                cantidadCompletadas++
            } else {
                cantidadPendientes++
            }
        }

        // Renderizado directo de los totales calculados
        total.textContent = tareas.length
        completadas.textContent = cantidadCompletadas
        pendientes.textContent = cantidadPendientes
    }

    // Actualiza el estado de una tarea específica en memoria y lo sincroniza en persistencia
    function cambiarEstadoTarea(id, nuevoEstado) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: "¿Marcar como completada?",
            text: "La tarea cambiará su estado a completada.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, completar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {

            if (result.isConfirmed) {

                for (let t of tareas) {
                    if (t.id === id) {
                        t.estado = nuevoEstado
                        break
                    }
                }

                localStorage.setItem("tareas", JSON.stringify(tareas))
                actualizarEstadisticas()
                renderizarTareas()

                swalWithBootstrapButtons.fire({
                    title: "¡Completada!",
                    text: "La tarea fue marcada como completada.",
                    icon: "success"

                })
            }
        })
    }

    // Remueve una tarea seleccionada del arreglo y refresca los componentes afectados
    function eliminarTarea(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No, cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                tareas = tareas.filter(function (t) {
                    return t.id !== id
                })
                localStorage.setItem("tareas", JSON.stringify(tareas))
                actualizarEstadisticas()
                extraerFiltrosUnicos()
                renderizarTareas()
                swalWithBootstrapButtons.fire({
                    title: "¡Eliminada!",
                    text: "La tarea fue eliminada correctamente.",
                    icon: "success"
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "La tarea sigue guardada.",
                    icon: "error"
                })
            }
        })

    }

    // Escuchadores de eventos interactivos para búsquedas y filtros en tiempo real
    buscador.addEventListener("input", renderizarTareas)
    filtroCurso.addEventListener("change", renderizarTareas)
    filtroCategoria.addEventListener("change", renderizarTareas)
    filtroEstado.addEventListener("change", renderizarTareas)

    // Inicialización de las funciones core al levantar el archivo por primera vez
    extraerFiltrosUnicos()
    renderizarTareas()
    actualizarEstadisticas()
})
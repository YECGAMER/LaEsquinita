document.addEventListener("DOMContentLoaded", function () {
    // Lista compartida entre el formulario y el listado (misma fuente de datos)
    let tareas = JSON.parse(localStorage.getItem("tareas")) || []

    // ---- Elementos del formulario ----
    const formOrganizador = document.getElementById("formOrganizador")
    const nombreTarea = document.getElementById("nombreTarea")
    const curso = document.getElementById("curso")
    const categoria = document.getElementById("categoria")
    const fechaEntrega = document.getElementById("fechaEntrega")
    const prioridad = document.getElementById("prioridad")
    const estado = document.getElementById("estado")
    const descripcion = document.getElementById("descripcion")
    const vistaPrevia = document.getElementById("vistaPreviaTarea")

    // ---- Elementos del listado ----
    const contenedorTareas = document.getElementById("tasks-list")
    const mensajeTareas = document.getElementById("empty-state")
    const buscador = document.getElementById("buscarTarea")
    const filtroCurso = document.getElementById("filtroCurso")
    const filtroCategoria = document.getElementById("filtroCategoria")
    const filtroEstado = document.getElementById("filtroEstado")
    const btnLimpiarFiltros = document.getElementById("clear-filters")

    // ===================== FORMULARIO =====================

    function restringirFechasPasadas() {
        const hoy = new Date()
        const anio = hoy.getFullYear()
        const mes = String(hoy.getMonth() + 1).padStart(2, '0')
        const dia = String(hoy.getDate()).padStart(2, '0')
        fechaEntrega.min = `${anio}-${mes}-${dia}`
    }

    function mostrarVistaPrevia() {
        if (!nombreTarea.value && !curso.value && !categoria.value && !fechaEntrega.value && !descripcion.value) {
            vistaPrevia.innerHTML = `
                <h3>Vista previa</h3>
                <p>Complete el formulario para visualizar la tarea.</p>
            `
            return
        }

        vistaPrevia.innerHTML = `
            <h3>Vista previa</h3>
            <p><strong>Nombre:</strong> ${nombreTarea.value || "---"}</p>
            <p><strong>Curso:</strong> ${curso.value || "---"}</p>
            <p><strong>Categoría:</strong> ${categoria.value || "---"}</p>
            <p><strong>Fecha de entrega:</strong> ${fechaEntrega.value || "---"}</p>
            <p><strong>Prioridad:</strong> ${prioridad.value || "---"}</p>
            <p><strong>Estado:</strong> ${estado.value || "---"}</p>
            <p><strong>Descripción:</strong> ${descripcion.value || "---"}</p>
        `
    }

    const campos = document.querySelectorAll("#formOrganizador input, #formOrganizador select, #formOrganizador textarea")
    campos.forEach(function (campo) {
        campo.addEventListener("input", mostrarVistaPrevia)
        campo.addEventListener("change", mostrarVistaPrevia)
    })

    formOrganizador.addEventListener("submit", function (evento) {
        evento.preventDefault()

        if (!nombreTarea.value || !curso.value || !fechaEntrega.value) {
            Swal.fire({
                title: "Incompleto",
                text: "Por favor completa los campos principales (Nombre, Curso y Fecha)",
                icon: "error"
            })
            return
        }

        const fechaSeleccionada = new Date(fechaEntrega.value + "T00:00:00")
        const hoy = new Date()
        hoy.setHours(0, 0, 0, 0)

        if (fechaSeleccionada < hoy) {
            Swal.fire({
                title: "Fecha Inválida",
                text: "No puedes registrar tareas con fechas de entrega pasadas.",
                icon: "error"
            })
            return
        }

        const nuevaTarea = {
            id: Date.now(),
            nombre: nombreTarea.value,
            curso: curso.value,
            categoria: categoria.value || "General",
            fechaEntrega: fechaEntrega.value,
            prioridad: prioridad.value,
            estado: estado.value,
            descripcion: descripcion.value || "Sin descripción"
        }

        // Guarda la nueva tarea en la misma lista que usa el listado de abajo
        tareas.push(nuevaTarea)
        localStorage.setItem("tareas", JSON.stringify(tareas))

        Swal.fire({
            title: "Bien hecho!",
            text: "Tarea agregada correctamente!",
            icon: "success"
        })

        limpiarFormulario()

        // Actualiza el listado de "Mis tareas" inmediatamente, sin recargar
        extraerFiltrosUnicos()
        renderizarTareas()
        actualizarEstadisticas()
    })

    function limpiarFormulario() {
        nombreTarea.value = ""
        curso.value = ""
        categoria.value = ""
        fechaEntrega.value = ""
        prioridad.value = "Alta"
        estado.value = "Pendiente"
        descripcion.value = ""
        mostrarVistaPrevia()
    }

    // ===================== LISTADO / MIS TAREAS =====================

    function extraerFiltrosUnicos() {
        filtroCurso.innerHTML = '<option value="">Todos los cursos</option>'
        filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>'

        const cursos = []
        const categorias = []

        for (const t of tareas) {
            if (t.curso && !cursos.includes(t.curso)) cursos.push(t.curso)
            if (t.categoria && !categorias.includes(t.categoria)) categorias.push(t.categoria)
        }

        for (const c of cursos) {
            const op = document.createElement("option")
            op.value = c
            op.textContent = c
            filtroCurso.appendChild(op)
        }

        for (const cat of categorias) {
            const op = document.createElement("option")
            op.value = cat
            op.textContent = cat
            filtroCategoria.appendChild(op)
        }
    }

    function crearTarjeta(tarea) {
        const tarjeta = document.createElement("article")
        tarjeta.classList.add("user-task-card")

        const claseEstado = tarea.estado.toLowerCase() === "completada" ? "status-completada" : "status-pendiente"

        tarjeta.innerHTML = `
            <div class="task-top">
                <span class="task-course">${tarea.curso}</span>
                <span class="status-chip ${claseEstado}">${tarea.estado}</span>
            </div>
            <h3>${tarea.nombre}</h3>
            <div class="task-info">
                <p class="task-description">${tarea.descripcion || "Sin descripción"}</p>
                <p>Fecha de entrega: <strong>${tarea.fechaEntrega}</strong></p>
                <p>Prioridad: <strong>${tarea.prioridad}</strong></p>
                <p>Categoría: <strong>${tarea.categoria}</strong></p>
            </div>
            <div class="task-buttons">
                ${tarea.estado !== "Completada" ? `<button class="complete-button" data-id="${tarea.id}">Marcar Completada</button>` : ""}
                <button class="delete-button" data-id="${tarea.id}">Eliminar</button>
            </div>
        `

        const btnCompletar = tarjeta.querySelector(".complete-button")
        if (btnCompletar) {
            btnCompletar.addEventListener("click", function () {
                cambiarEstadoTarea(tarea.id, "Completada")
            })
        }

        const btnEliminar = tarjeta.querySelector(".delete-button")
        btnEliminar.addEventListener("click", function () {
            eliminarTarea(tarea.id)
        })

        return tarjeta
    }

    function limpiarFiltros() {
        buscador.value = ""
        filtroCurso.value = ""
        filtroCategoria.value = ""
        filtroEstado.value = ""
        renderizarTareas()
    }

    function renderizarTareas() {
        contenedorTareas.innerHTML = ""

        const texto = buscador.value.toLowerCase()
        const cursoSel = filtroCurso.value
        const catSel = filtroCategoria.value
        const estadoSel = filtroEstado.value

        const filtradas = tareas.filter(function (t) {
            const desc = t.descripcion ? t.descripcion.toLowerCase() : ""
            const cumpleBusqueda = t.nombre.toLowerCase().includes(texto) ||
                t.curso.toLowerCase().includes(texto) ||
                desc.includes(texto)

            const cumpleCurso = cursoSel === "" || t.curso === cursoSel
            const cumpleCat = catSel === "" || t.categoria === catSel
            const cumpleEstado = estadoSel === "" || t.estado === estadoSel

            return cumpleBusqueda && cumpleCurso && cumpleCat && cumpleEstado
        })

        if (filtradas.length === 0) {
            mensajeTareas.style.display = "block"
            mensajeTareas.textContent = tareas.length === 0
                ? "No hay tareas agregadas."
                : "No se encontraron tareas con esos filtros."
            return
        }

        mensajeTareas.style.display = "none"

        for (const t of filtradas) {
            contenedorTareas.appendChild(crearTarjeta(t))
        }
    }

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

        if (total) total.textContent = tareas.length
        if (completadas) completadas.textContent = cantidadCompletadas
        if (pendientes) pendientes.textContent = cantidadPendientes
    }

    function cambiarEstadoTarea(id, nuevoEstado) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: { confirmButton: "btn btn-success", cancelButton: "btn btn-danger" },
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

    function eliminarTarea(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: { confirmButton: "btn btn-success", cancelButton: "btn btn-danger" },
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
                tareas = tareas.filter(function (t) { return t.id !== id })
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

    buscador.addEventListener("input", renderizarTareas)
    filtroCurso.addEventListener("change", renderizarTareas)
    filtroCategoria.addEventListener("change", renderizarTareas)
    filtroEstado.addEventListener("change", renderizarTareas)
    btnLimpiarFiltros.addEventListener("click", limpiarFiltros)

    // ===================== INICIALIZACIÓN =====================
    restringirFechasPasadas()
    mostrarVistaPrevia()
    extraerFiltrosUnicos()
    renderizarTareas()
    actualizarEstadisticas()
})

// ===================== MENÚ ACTIVO SEGÚN SCROLL =====================
    const linkOrganizador = document.getElementById("nav-organizador")
    const linkMisTareas = document.getElementById("nav-mis-tareas")
    const seccionAgregar = document.getElementById("agregar-tarea")
    const seccionMisTareas = document.getElementById("mis-tareas")

    if (linkOrganizador && linkMisTareas && seccionAgregar && seccionMisTareas) {

        function actualizarMenuActivo() {
            // 150px de margen compensa el header fijo + un pequeño colchón
            const posicionActual = window.scrollY + 150

            if (posicionActual >= seccionMisTareas.offsetTop) {
                linkMisTareas.classList.add("active")
                linkOrganizador.classList.remove("active")
            } else {
                linkOrganizador.classList.add("active")
                linkMisTareas.classList.remove("active")
            }
        }

        // Revisa la posición mientras el usuario hace scroll (en cualquier dirección)
        window.addEventListener("scroll", actualizarMenuActivo)

        // Da respuesta visual inmediata al hacer clic, sin esperar a que termine el scroll
        linkMisTareas.addEventListener("click", function () {
            linkMisTareas.classList.add("active")
            linkOrganizador.classList.remove("active")
        })

        linkOrganizador.addEventListener("click", function () {
            linkOrganizador.classList.add("active")
            linkMisTareas.classList.remove("active")
        })

        // Estado correcto al cargar la página por primera vez
        actualizarMenuActivo()
    }
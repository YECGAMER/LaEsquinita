document.addEventListener("DOMContentLoaded", function () {
    // Cargar la lista inicial desde localStorage o crear un arreglo vacío si no existe
    let listaTareas = JSON.parse(localStorage.getItem("tareas")) || []

    // Obtener el formulario completo
    const formOrganizador = document.getElementById("formOrganizador")

    // Obtener elementos del formulario
    const nombreTarea = document.getElementById("nombreTarea")
    const curso = document.getElementById("curso")
    const categoria = document.getElementById("categoria")
    const fechaEntrega = document.getElementById("fechaEntrega")
    const prioridad = document.getElementById("prioridad")
    const estado = document.getElementById("estado")
    const descripcion = document.getElementById("descripcion")

    // Elementos de salida
    const vistaPrevia = document.getElementById("vistaPreviaTarea")

    // Bloquear fechas pasadas en el calendario ---
    function restringirFechasPasadas() {
        const hoy = new Date()
        const anio = hoy.getFullYear()
        // Los meses van de 0 a 11, por lo que sumamos 1 y rellenamos con un cero a la izquierda si es menor a 10
        const mes = String(hoy.getMonth() + 1).padStart(2, '0')
        const dia = String(hoy.getDate()).padStart(2, '0')
        
        // Formato final requerido por el input date: YYYY-MM-DD
        const fechaMinima = `${anio}-${mes}-${dia}`
        
        // Asignar el atributo mínimo al input
        fechaEntrega.min = fechaMinima
    }

    // Función para mostrar la vista previa reactiva en tiempo real
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

    // Escuchar cambios en todos los campos interactivos del formulario
    const campos = document.querySelectorAll("#formOrganizador input, #formOrganizador select, #formOrganizador textarea")

    campos.forEach(function (campo) {
        campo.addEventListener("input", mostrarVistaPrevia)
        campo.addEventListener("change", mostrarVistaPrevia)
    })

    // Guardar la tarea de forma persistente capturando el evento submit del formulario
    formOrganizador.addEventListener("submit", function (evento) {
        evento.preventDefault()

        // Validación de datos básica antes de almacenar
        if (!nombreTarea.value || !curso.value || !fechaEntrega.value) {
            Swal.fire({
                title: "Incompleto",
                text: "Por favor completa los campos principales (Nombre, Curso y Fecha)",
                icon: "error"
            });
            return
        }

        // Validación de seguridad extra por si el usuario altera el HTML manual
        const fechaSeleccionada = new Date(fechaEntrega.value + "T00:00:00")
        const hoy = new Date()
        hoy.setHours(0,0,0,0)

        if (fechaSeleccionada < hoy) {
            Swal.fire({
                title: "Fecha Inválida",
                text: "No puedes registrar tareas con fechas de entrega pasadas.",
                icon: "error"
            });
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

        // Empujar el nuevo objeto al almacenamiento local cargado
        listaTareas.push(nuevaTarea)
        localStorage.setItem("tareas", JSON.stringify(listaTareas))

        Swal.fire({
            title: "Bien hecho!",
            text: "Tarea agregada correctamente!",
            icon: "success"
        });

        limpiarFormulario()
    })

    // Limpiar campos y refrescar el estado visual de la tarjeta
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

    // Inicializar restricciones y estado visual
    restringirFechasPasadas()
    mostrarVistaPrevia()
})
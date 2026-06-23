document.addEventListener("DOMContentLoaded", function () {
    // Apunta al contenedor donde se van a montar las tarjetas interactivas
    const gridContenedor = document.getElementById("testimonials-container")

    // Realiza la petición asíncrona para jalar el archivo JSON local
    function cargarTarjetasInicio() {
        fetch("data/testimonios.json")
            .then(function (respuesta) {
                return respuesta.json()
            })
            .then(function (datos) {
                crearEstructuraCards(datos)
            })
            .catch(function (error) {
                console.error("Error al procesar el JSON de la página principal:", error)
            })
    }

    // Procesa el arreglo y fabrica las tarjetas mediante la manipulación del DOM
    function crearEstructuraCards(lista) {
        gridContenedor.innerHTML = ""

        for (const item of lista) {
            // Crea una etiqueta de bloque semántica para cada recomendación
            const article = document.createElement("article")
            article.classList.add("custom-recommendation-card")

            // Ensamblado dinámico inyectando propiedades específicas del JSON
            article.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${item.imagen}" alt="Representación visual de ${item.curso}">
                    <span class="status-badge-floating">${item.estado}</span>
                </div>
                <div class="card-content-body">
                    <p class="card-comment-text">"${item.comentario}"</p>
                    <span class="course-tag">${item.curso}</span>
                    <h3>${item.nombre}</h3>
                    <button class="badge-ref ${item.claseEstado}" style="align-self: flex-start; margin-bottom: 15px; border:none;">Estudiante Activo</button>
                    <button class="action-card-button" onclick="window.location.href='misTareas.html'">Ver Información</button>
                </div>
            `
            // Añade el nodo fabricado en tiempo de ejecución al contenedor de la interfaz
            gridContenedor.appendChild(article)
        }
    }

    // Dispara la función principal al inicializar el script
    cargarTarjetasInicio()
})
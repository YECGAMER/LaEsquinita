document.addEventListener("DOMContentLoaded", function () {
    const gridContenedor = document.getElementById("testimonials-container");
    const btnPrev = document.getElementById("carousel-prev");
    const btnNext = document.getElementById("carousel-next");

    // Objeto contenedor de la configuración del carrusel
    const miCarrusel = {
        carouselOptions: ['previous', 'next'], // Controles activos
        carouselData: [],                     // Aquí guardaremos los testimonios del JSON
        
        // Método para cargar los datos del fetch
        init: function() {
            fetch("data/testimonios.json")
                .then(respuesta => respuesta.json())
                .then(datos => {
                    this.carouselData = datos;
                    
                    // Renderizamos la interfaz
                    this.render();
                    this.setupControls();
                })
                .catch(error => {
                    console.error("Error al procesar el carrusel de testimonios:", error);
                });
        },

        // Método encargado de fabricar las tarjetas dinámicamente
        render: function() {
            gridContenedor.innerHTML = "";

            this.carouselData.forEach(item => {
                const article = document.createElement("article");
                article.classList.add("custom-recommendation-card");

                article.innerHTML = `
                    <div class="card-image-wrapper">
                        <img src="${item.imagen}" alt="Representación visual de ${item.curso}">
                        <span class="status-badge-floating">${item.estado}</span>
                    </div>
                    <div class="card-content-body">
                        <p class="card-comment-text">"${item.comentario}"</p>
                        <span class="course-tag">${item.curso}</span>
                        <h3>${item.nombre}</h3>
                    </div>
                `;
                gridContenedor.appendChild(article);
            });
        },

        // Método para rotar los nodos del DOM de forma infinita
        setupControls: function() {
            // Control Siguiente: Agarra la primera tarjeta y la manda al final
            if (this.carouselOptions.includes('next')) {
                btnNext.addEventListener("click", function() {
                    const primeraTarjeta = gridContenedor.querySelector(".custom-recommendation-card");
                    if (primeraTarjeta) {
                        gridContenedor.appendChild(primeraTarjeta); // Mueve la primera al final del contenedor
                    }
                }.bind(this)); // Asegura que 'this' apunte a miCarrusel si es necesario expandir la lógica
            }

            // Control Anterior: Agarra la última tarjeta y la mete al puro inicio
            if (this.carouselOptions.includes('previous')) {
                btnPrev.addEventListener("click", function() {
                    const tarjetas = gridContenedor.querySelectorAll(".custom-recommendation-card");
                    if (tarjetas.length > 0) {
                        const ultimaTarjeta = tarjetas[tarjetas.length - 1];
                        gridContenedor.insertBefore(ultimaTarjeta, gridContenedor.firstChild); // La mete de primera
                    }
                }.bind(this)); // Mantiene el contexto de diseño cohesivo
            }
        }
    };

    // Encendemos el carrusel infinito real
    miCarrusel.init();
});
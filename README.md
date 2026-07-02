La Esquinita

Sistema web de organización de tareas universitarias, desarrollado como Mini Proyecto para el curso ISW-521 Programación en Ambiente Web I, Universidad Técnica Nacional.

Descripción del proyecto

Muchos estudiantes universitarios tienen dificultades para recordar fechas de entrega, organizar sus pendientes y llevar el control de sus trabajos, porque la información suele estar dispersa en distintos lugares.

La Esquinita es un espacio digital donde el estudiante puede ver, buscar y organizar sus tareas académicas de forma sencilla, tanto desde la computadora como desde el celular.

Integrantes

| Nombre | Rol técnico |
|---|---|
| Mariana Alfaro Ulate | Diseñadora Web y Desarrolladora Frontend |
| Yecsen Mauricio Ulate Chinchilla | Desarrollador de Lógica y Persistencia |

Curso: ISW-521 Programación en Ambiente Web I
Profesora: Nathalie Paniagua López

Tecnologías utilizadas

- HTML5 — estructura semántica (header, nav, main, section, footer)
- CSS3 — diseño propio, responsivo, con Flexbox y Grid 
- JavaScript — lógica, DOM, eventos, validaciones
- JSON — datos precargados (catálogo de tareas y testimonios)
- localStorage — persistencia de las tareas creadas por el usuario
- [SweetAlert2](https://sweetalert2.github.io/) — librería externa 

Estructura del proyecto

```
LaEsquinita/
├── asset/
│   ├── audio/
│   ├── images/
│   └── video/
├── css/
│   └── styles.css
├── data/
│   ├── tareaEjemplo.json      # Catálogo de tareas precargadas (mín. 10 registros)
│   └── testimonios.json       # Testimonios para el carrusel de Inicio
├── js/
│   ├── inicio.js
│   ├── organizador.js
│   ├── tareas.js
│   └── misTareas.js
├── index.html
├── tareas.html
├── Organizador.html
├── misTareas.html
└── README.md

Páginas del sistema

Inicio (index.html)
Es la primera página que ve cualquier persona al entrar al sitio. Explica de qué trata La Esquinita, qué problema resuelve y a quién está dirigida. También muestra comentarios de otros estudiantes sobre su experiencia usando la herramienta.

Tareas (tareas.html)
Muestra un catálogo de tareas de ejemplo, ya cargadas en el sistema. El usuario puede buscarlas y filtrarlas por curso, categoría o estado, pero no puede modificarlas.

Organizador (Organizador.html)
Aquí el estudiante llena un formulario para registrar sus propias tareas: nombre, curso, fecha de entrega, prioridad, etc. El sistema revisa que los datos estén completos y correctos antes de guardarlos.

Mis Tareas (misTareas.html)
Muestra únicamente las tareas que el propio estudiante registró en el Organizador. Desde aquí puede buscarlas, filtrarlas, marcarlas como completadas o eliminarlas. La información se guarda en el navegador, así que no se pierde aunque se cierre la página.

Funcionalidades principales

- Búsqueda y filtros combinados por curso, categoría y estado
- Registro de tareas con validación de datos y fechas
- La información del usuario se guarda automáticamente y no se pierde al cerrar el navegador
- Estadísticas en tiempo real (total, completadas, pendientes)
- Menú de navegación adaptado para celular (tipo hamburguesa)
- Encabezado siempre visible al desplazarse por la página
- Mensajes claros de éxito, error o confirmación
- Diseño adaptado para computadora, tablet y celular

Cómo ejecutar el proyecto
1. Descarga o clona la carpeta del proyecto.
2. Abre el archivo index.html directamente en tu navegador, o
3. Si prefieres usar un servidor local (recomendado), puedes usar la extensión Live Server de VS Code y abrir index.html desde ahí.

Sitio publicado
Agregar aquí la URL una vez publicado (por ejemplo con GitHub Pages, Netlify o Vercel).

Licencia
Proyecto académico desarrollado con fines educativos para el curso ISW-521, Universidad Técnica Nacional.

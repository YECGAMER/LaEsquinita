# La Esquinita

Sistema web de organización de tareas universitarias, desarrollado como Mini Proyecto para el curso ISW-521 Programación en Ambiente Web I, Universidad Técnica Nacional.

## Descripción del proyecto

Muchos estudiantes universitarios tienen dificultades para recordar fechas de entrega, organizar sus pendientes y llevar el control de sus trabajos, porque la información suele estar dispersa en distintos lugares.

La Esquinita es un espacio digital donde el estudiante puede ver, buscar y organizar sus tareas académicas de forma sencilla, tanto desde la computadora como desde el celular.

## Integrantes

| Nombre | Rol técnico |
|---|---|
| Mariana Alfaro Ulate | Diseñadora Web y Desarrolladora Frontend |
| Yecsen Mauricio Ulate Chinchilla | Desarrollador de Lógica y Persistencia |

Curso: ISW-521 Programación en Ambiente Web I
Profesora: Nathalie Paniagua López

## Tecnologías utilizadas

- HTML5 — estructura semántica (header, nav, main, section, footer)
- CSS3 — diseño propio, responsivo, con Flexbox y Grid (sin frameworks)
- JavaScript (vanilla) — lógica, DOM, eventos, validaciones
- JSON — datos precargados (catálogo de tareas y testimonios)
- localStorage — persistencia de las tareas creadas por el usuario
- [SweetAlert2](https://sweetalert2.github.io/) — librería autorizada 

## Estructura del proyecto

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
│   └── tareas.js
│  
├── index.html
├── tareas.html
├── Organizador.html
└── README.md
```

## Páginas del sistema

### Inicio (index.html)
Es la primera página que ve cualquier persona al entrar al sitio. Explica de qué trata La Esquinita, qué problema resuelve y a quién está dirigida. También muestra comentarios de otros estudiantes sobre su experiencia usando la herramienta.

### Tareas (tareas.html)
Muestra un catálogo de tareas de ejemplo, ya cargadas en el sistema. El usuario puede buscarlas y filtrarlas por curso, categoría o estado, pero no puede modificarlas.

### Organizador y Mis Tareas (Organizador.html)
Esta página tiene dos partes conectadas entre sí. Arriba, el estudiante llena un formulario para registrar una nueva tarea: nombre, curso, fecha de entrega, prioridad, etc. El sistema revisa que los datos estén completos y correctos antes de guardarlos.

Justo debajo, en la misma página, aparece automáticamente la lista de "Mis tareas": todo lo que el estudiante ha registrado. Desde ahí puede buscar, filtrar, marcar tareas como completadas o eliminarlas. La información se guarda en el navegador, así que no se pierde aunque se cierre la página.

En el menú de navegación, "Organizador" y "Mis tareas" llevan a esta misma página: "Organizador" te deja arriba, en el formulario, y "Mis tareas" te lleva directo hacia abajo, a la lista. El menú también detecta automáticamente en qué parte de la página estás mientras te desplazas, y marca la opción correspondiente como activa.

## Funcionalidades principales

- Búsqueda y filtros combinados por curso, categoría y estado
- Registro de tareas con validación de datos y fechas
- La información del usuario se guarda automáticamente y no se pierde al cerrar el navegador
- Estadísticas en tiempo real (total, completadas, pendientes)
- Menú de navegación adaptado para celular (tipo hamburguesa)
- Encabezado siempre visible al desplazarse por la página
- Mensajes claros de éxito, error o confirmación
- Diseño adaptado para computadora, tablet y celular

## Cómo ejecutar el proyecto

1. Descarga o clona la carpeta del proyecto.
2. Abre el archivo index.html directamente en tu navegador, o
3. Si prefieres usar un servidor local (recomendado), puedes usar la extensión Live Server de VS Code y abrir index.html desde ahí.

## Sitio publicado

https://yecgamer.github.io/LaEsquinita/

## Licencia

Proyecto académico desarrollado con fines educativos para el curso ISW-521, Universidad Técnica Nacional.
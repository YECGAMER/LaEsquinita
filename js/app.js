const campos = [
"title",
"course",
"date",
"priority",
"status",
"description"
];


campos.forEach(id=>{

    document.getElementById(id)
    .addEventListener("input", actualizarResumen);

    document.getElementById(id)
    .addEventListener("change", actualizarResumen);

});



function actualizarResumen(){

    document.getElementById("preview").innerHTML = `

    <h3>
    ${title.value || "Sin título"}
    </h3>

    <p>${course.value || "Sin curso"}</p>

    <p>${date.value || "Sin fecha"}</p>

    <p>Prioridad:
    ${priority.value || "No definida"}
    </p>

    <p>stado:
    ${status.value || "No definido"}
    </p>

    <p>
    ${description.value || "Sin descripción"}
    </p>

    `;

}




document
.getElementById("task-form")
.addEventListener("submit", function(e){

    e.preventDefault();


    let tarea = {

        id: Date.now(),

        nombre:title.value,

        curso:course.value,

        fechaEntrega:date.value,

        prioridad:priority.value,

        estado:status.value,

        descripcion:description.value

    };


    let tareas =
    JSON.parse(localStorage.getItem("tareas")) || [];


    tareas.push(tarea);


    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );


    alert("Tarea agregada correctamente");


    this.reset();


});

let campos = [
    "nombre"

];
const urlbase = variable+"/api/ingrediente";
let tabla = document.getElementById('form-list-client-body');


var myIndexid;
var myIndex;
var ingredientes = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("nombre").value = ""

}
function llenarCampos() {
    var nuevoEmpleado = {
        nombre: document.getElementById("nombre").value,

    }

    return nuevoEmpleado;

}

function validarFormulario(evento) {
    evento.preventDefault();
    let vacio = false;
    let limite = false;
    let falta = []
    for (var i = 0; i < campos.length; i++) {
        var campo = document.getElementById(campos[i]).value;
        if (campo.length == 0) {
            vacio = true;
            falta.push(campos[i]);
        }

    }
    if (vacio) {
        alert("los campos " + falta.toString() + " no deben estar vacios ")
        return;
    }
    if (limite) {
        return;
    }
    addEmpleado();
}
function validarFormularioUpdate(evento) {
    evento.preventDefault();

    let vacio = false;
    let limite = false;
    let falta = []
    for (var i = 0; i < campos.length; i++) {
        var campo = document.getElementById(campos[i]).value;
        if (campo.length == 0) {
            vacio = true;
            falta.push(campos[i]);
        }
    }

    if (vacio) {
        alert("los campos " + falta.toString() + " no deben estar vacios ")
        return;
    }
    if (limite) {
        return;
    }

    updEmpleado();
}

const ShowTabla = (data, container) => {

    container.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        var myTr = document.createElement("tr")
        for (let a in data[i]) {
            var mytd = document.createElement("td")
            //mytd.setAttribute('data-th',a)
            mytd.innerHTML = data[i][a];
            if (a.includes('id_ingrediente')) {
                mytd.style.display = "none"

            }
            myTr.appendChild(mytd)
        }
        var actionTd = document.createElement("td")
        actionTd.setAttribute('class', 'operacion')
        var editBtn = document.createElement("button")
        var btn = document.createElement("i")
        btn.setAttribute("class", "fa fa-edit")
        editBtn.setAttribute("class", "btn btn-sm btn-primary")
        editBtn.appendChild(btn)
        editBtn.setAttribute("onclick", "editEmpleado(" + i + ")")

        var deletebtn = document.createElement("button")
        var btn2 = document.createElement("i")
        btn2.setAttribute("class", "fa fa-trash")
        deletebtn.setAttribute("class", "btn btn-sm btn-danger")
        deletebtn.appendChild(btn2)
        deletebtn.setAttribute("onclick", "deleteEmpleado(" + i + ")")

        actionTd.appendChild(editBtn)
        actionTd.appendChild(deletebtn)
        myTr.appendChild(actionTd)
        document.getElementById("form-list-client-body").appendChild(myTr)

    }
    borrarCampos();
}
async function fetchText() {
    let response = await fetch(variable+'/api/ingredientes');
    let data;
    const { status, statusText } = response;

    if (response.status === 200) {
        data = response.json();
        return data;
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    var pathname = window.location.pathname;
    var user = localStorage.getItem("sesion")
    var ruta = pathname.split("/")[pathname.split("/").length - 1].split(".")[0]
    validarRuta(ruta, user)
    validarRuta1(ruta, user)
    fetchText().then(res => {
        ingredientes.push(...res);
        ShowTabla(ingredientes, tabla)
    })

})

function addEmpleado() {
    let nuevoIngrediente = llenarCampos();


    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevoIngrediente)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            if (json[0]) {
                ingredientes.push(json[0]);
                ShowTabla(ingredientes, tabla)
                swal("Creado correctamente!");

            } else {
                swal("Ya existe el nombre del ingrediente!");
            }

        });
    toggle2()
}
function updateEmpleado() {
    let modificaIngrediente = llenarCampos();

    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificaIngrediente)
    }).then(response => response.json())

        .then(json => {
            if (json[0]) {
                ingredientes[myIndex] = json[0];
                ShowTabla(ingredientes, tabla)
                swal("Actualizado correctamente!");

            } else {
                swal("Ya existe el nombre del ingrediente!");
            }

        });
    return "completado"
}
function editEmpleado(i) {
    myIndexid = ingredientes[i].id_ingrediente;
    myIndex = i;
    var updatebtn = document.createElement("button")
    updatebtn.innerHTML = "Update";
    updatebtn.setAttribute("class", "btn btn-sm btn-success")
    updatebtn.setAttribute("id", "btn-save2")
    document.getElementById("saveupdate").appendChild(updatebtn);
    document.getElementById("btn-save2").addEventListener('click', validarFormularioUpdate);
    var cancelbtn = document.createElement("button")
    cancelbtn.innerHTML = "Cancelar";
    cancelbtn.setAttribute("class", "btn btn-sm")
    cancelbtn.setAttribute("onclick", "cancelSeleccion()")

    document.getElementById("saveupdate").innerHTML = "";
    document.getElementById("saveupdate").appendChild(updatebtn);
    document.getElementById("saveupdate").appendChild(cancelbtn);


    document.getElementById("nombre").value = ingredientes[i].nombre
    document.getElementById("muestradiv").style.display = "none";
    toggle()




}
function updEmpleado() {
    if (updateEmpleado() == "error") {

    } else {
        var crbtn = document.createElement("button")
        crbtn.innerHTML = "Registrar";
        crbtn.setAttribute("class", "btn btn-primary btn-block")
        crbtn.setAttribute("id", "btn-save")
        document.getElementById("saveupdate").innerHTML = ""
        document.getElementById("saveupdate").appendChild(crbtn);
        document.getElementById("btn-save").addEventListener('click', validarFormulario);
    }
    document.getElementById("muestradiv").style.display = "inline-block";
}
function cancelSeleccion() {
    var crbtn = document.createElement("button")
    crbtn.innerHTML = "Registrar";
    crbtn.setAttribute("class", "btn btn-primary btn-block")
    crbtn.setAttribute("id", "btn-save")
    document.getElementById("saveupdate").innerHTML = ""
    document.getElementById("saveupdate").appendChild(crbtn);
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
    toggle2()
    borrarCampos()
    document.getElementById("muestradiv").style.display = "inline-block";

}

function deleteEmpleado(i) {
    myIndexid = ingredientes[i].id_ingrediente;
    myIndex = i;
    swal({
        title: "¿Estás seguro?",
        text: "¡No hay marcha atras!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "¡Si, borrar ahora!",
        closeOnConfirm: false
    },
        function () {

            fetch(urlbase + "/" + myIndexid, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(response => response.json())
                .then(json => {
                    if (!Object.keys(json).includes("error")) {

                        ingredientes.splice(i, 1)
                        ShowTabla(ingredientes, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}
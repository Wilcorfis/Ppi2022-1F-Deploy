let campos = [
    "hora_entrada",
    "hora_salida",
    "dias"
];
const urlbase = "https://pedidoambrosia.herokuapp.com/api/horario";


let tabla = document.getElementById('form-list-client-body');

var myIndexid;
var myIndex;
var horarios = [];


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("hora_entrada").value = ""
    document.getElementById("hora_salida").value = ""
    document.getElementById("dias").value = ""

}

function llenarCampos() {
    var nuevaCategoria = {
        hora_entrada: document.getElementById("hora_entrada").value,
        hora_salida: document.getElementById("hora_salida").value,
        dias: document.getElementById("dias").value,

    }

    return nuevaCategoria;

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
    const inicio = document.getElementById("hora_entrada");
    const final = document.getElementById("hora_salida");

    const vInicio = inicio.value;
    const vFinal = final.value;

    if (!vInicio || !vFinal) {
        return;
    }

    const tIni = new Date();

    const pInicio = vInicio.split(":");

    tIni.setHours(pInicio[0], pInicio[1]);


    const tFin = new Date();

    const pFin = vFinal.split(":");

    tFin.setHours(pFin[0], pFin[1]);
    /*if (pFin[0]>21 || pFin<14 || pInicio<7 || pInicio>14) {
        alert("horario no valido ")
        return; 

    }*/

    if (tFin.getTime() < tIni.getTime()) {

        alert("hora salida menor a hora de entrada");
        return;

    }

    if (tFin.getTime() === tIni.getTime()) {

        alert("hora entrada y hora final son iguales");
        return;

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
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/horarios');
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
    validarRuta(ruta,user)
    fetchText().then(res => {
        horarios.push(...res);
        ShowTabla(horarios, tabla)

    })

})

function addEmpleado() {
    let nuevoHorario = llenarCampos();
    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevoHorario)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            horarios.push(json[0]);
            ShowTabla(horarios, tabla)
            swal("Creado correctamente!");
        });
        toggle2()
}

function updateEmpleado() {
    let modificaHorario = llenarCampos();
    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificaHorario)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            horarios[myIndex] = json[0];
            ShowTabla(horarios, tabla)
            swal("Actualizado correctamente!");
        });
    return "completado"
}

function editEmpleado(i) {
    myIndexid = horarios[i].id_horario;
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

    document.getElementById("hora_entrada").value = horarios[i].hora_entrada
    document.getElementById("hora_salida").value = horarios[i].hora_salida
    document.getElementById("dias").value = horarios[i].dias
    document.getElementById("muestradiv").style.display="none";
    toggle()
}

//Updating Client
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
    document.getElementById("muestradiv").style.display="inline-block";
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
    document.getElementById("muestradiv").style.display="inline-block";

}

function deleteEmpleado(i) {
    myIndexid = horarios[i].id_horario;
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

                        horarios.splice(i, 1)
                        ShowTabla(horarios, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}
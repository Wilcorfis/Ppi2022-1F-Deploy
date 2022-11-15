
let campos = [
    "cantidad_personas",
    "disponible",
    "codigo"
];
const urlbase = variable+"/api/mesa";


let tabla = document.getElementById('form-list-client-body');

var myIndexid;
var myIndex;
var mesas = [];

document.addEventListener("DOMContentLoaded", function () {
    var pathname = window.location.pathname;
    var user = localStorage.getItem("sesion")
    var ruta = pathname.split("/")[pathname.split("/").length - 1].split(".")[0]
    validarRuta(ruta,user)
    validarRuta4(ruta,user)

    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("cantidad_personas").value = ""
    if (document.getElementById("disponible")) {
        document.getElementById("disponible").value = ""
    }

    document.getElementById("codigo").value = ""
}

function llenarCampos() {
    var nuevaCategoria = {
        cantidad_personas: document.getElementById("cantidad_personas").value,
        codigo: document.getElementById("codigo").value
    }
    return nuevaCategoria;
}
function llenarCampos2() {
    var nuevaCategoria = {
        cantidad_personas: document.getElementById("cantidad_personas").value,
        disponible: document.getElementById("disponible").value,
        codigo: document.getElementById("codigo").value
    }
    return nuevaCategoria;
}

function validarFormulario(evento) {
    evento.preventDefault();
    let vacio = false;
    let limite = false;
    let falta = []
    for (var i = 0; i < campos.length; i++) {
        if (document.getElementById(campos[i])) {
            var campo = document.getElementById(campos[i]).value;
            if (campo.length == 0) {
                vacio = true;
                falta.push(campos[i]);
            }

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
            if (a != "id_mesa") {
                mytd.innerHTML = data[i][a];
                myTr.appendChild(mytd)

            }
           
            

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
    let response = await fetch(variable+'/api/mesas');
    let data;
    const { status, statusText } = response;

    if (response.status === 200) {
        data = response.json();


        return data;
    }

}

document.addEventListener('DOMContentLoaded', async () => {
    fetchText().then(res => {
        mesas.push(...res);
        ShowTabla(mesas, tabla)
    })
})

function addEmpleado() {
    let nuevoMesa = llenarCampos();
    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevoMesa)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            if (json[0]) {
                mesas.push(json[0]);
                ShowTabla(mesas, tabla)
                swal("Creado correctamente!");
            } else {
                swal("Ya existe el codigo de la mesa!");
            }

        });
        toggle2()
}

function updateEmpleado() {
    let modificaMesa = llenarCampos2();
    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificaMesa)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            if (json[0]) {
                mesas[myIndex] = json[0];
                ShowTabla(mesas, tabla)
                swal("Actualizado correctamente!");
            } else {
                swal("Ya existe el codigo de la mesa!");
            }

        });
    let aux = document.getElementById("formulario");
    let r = document.getElementById("remove");
    aux.removeChild(r);

    return "completado"
}

function editEmpleado(i) {
    if (!document.getElementById("remove")) {
    document.getElementById("formulario").innerHTML += `
    <div id="remove" class="form-group">
   
        <label for="disponible">*Disponible :</label>
        <select id="disponible" class="custom-select" required>
            <option checked value="">Seleccionar un estado</option>
            <option value="s">Disponible</option>
            <option value="n">No Disponible</option>

        </select>
    </div>`
    }
    myIndexid = mesas[i].id_mesa;
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

    document.getElementById("cantidad_personas").value = mesas[i].cantidad_personas

    document.getElementById("codigo").value = mesas[i].codigo

    document.getElementById("disponible").value = mesas[i].disponible

    document.getElementById("muestradiv").style.display="none";
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
    document.getElementById("muestradiv").style.display="inline-block";
}
function cancelSeleccion() {
    let aux = document.getElementById("formulario");
    let r = document.getElementById("remove");
    aux.removeChild(r);
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
    myIndexid = mesas[i].id_mesa;
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

                        mesas.splice(i, 1)
                        ShowTabla(mesas, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}
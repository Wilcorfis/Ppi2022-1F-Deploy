let campos = [
    "fk_id_plato",
    "nombre_receta"
];
const urlbase = "https://pedidoambrosia.herokuapp.com/api/receta";
let tabla = document.getElementById('form-list-client-body');
let plato = document.getElementById("fk_id_plato");

const urlplato = "https://pedidoambrosia.herokuapp.com/api/plato";


var myIndexid;
var myIndex;
var recetas = [];
var platos = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("nombre_receta").value = ""
    document.getElementById("fk_id_plato").value = ""
}

function llenarCampos() {
    var nuevoEmpleado = {
        fk_id_plato: document.getElementById("fk_id_plato").value,
        nombre_receta: document.getElementById("nombre_receta").value
    }
    return nuevoEmpleado;
}

function validarFormulario(evento) {
    evento.preventDefault();
    let vacio = false;
    let limite = false;
    let falta = []
    for (var i = 0; i < campos.length ; i++) {
        var campo = document.getElementById(campos[i]).value;
        if (campo.length == 0) {
            vacio = true;
            falta.push(campos[i]);
        }
    }
    if (vacio) {
        alert("los campos "+falta.toString()+" no deben estar vacios ")
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
    for (var i = 0; i < campos.length ; i++) {
        var campo = document.getElementById(campos[i]).value;
        if (campo.length == 0) {
            vacio = true;
            falta.push(campos[i]);
        }
    }
    if (vacio) {
        alert("los campos "+falta.toString()+" no deben estar vacios ")
        return;
    }
    if (limite) {
        return;
    }
    updEmpleado();
}


const ShowPlato = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_plato").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un plato";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_plato").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = data[i].nombre;
            myTr.value = data[i].id_plato;
            document.getElementById("fk_id_plato").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_plato").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un plato";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_plato").appendChild(myTr2)
    }
}

const ShowTabla = (data, container) => {
    let t=0;
    container.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        var myTr = document.createElement("tr")
        for (let a in data[i]) {
            var mytd = document.createElement("td")
            //mytd.setAttribute('data-th',a)
            mytd.innerHTML = data[i][a];
            if (a.includes('id_receta')) {
                mytd.style.display="none"

            }
            if (a.includes('fk_id_plato')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                getnombre(urlplato,data[i][a],mya);
                mytd.appendChild(mya)
            }


            myTr.appendChild(mytd)
        }
        var actionTd = document.createElement("td")
        actionTd.setAttribute('class','operacion')
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
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/recetas');
    let data;
    const { status, statusText } = response;

    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getPlatos() {
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/platos');
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
    validarRuta1(ruta,user)
    fetchText().then(res => {
        recetas.push(...res);
        ShowTabla(recetas, tabla)
    })
    getPlatos().then(res => {
        platos.push(...res);
        ShowPlato(platos, plato)
    })
})

function addEmpleado() {
    let nuevaReceta = llenarCampos();
    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevaReceta)
    }).then(response => response.json())
        .then(json => {
            if (json[0]) {
                recetas.push(json[0]);
                ShowTabla(recetas, tabla)
                swal("Creado correctamente!");
            } else {
                swal("Ya existe el nombre de la receta!");
            }

        });
        toggle2()
}
function updateEmpleado() {
    let modificaReceta = llenarCampos();
    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificaReceta)
    }).then(response => response.json())
        .then(json => {
            if (json[0]) {
                recetas[myIndex] = json[0];
                ShowTabla(recetas, tabla)
                swal("Actualizado correctamente!");
            } else {
                swal("Ya existe el nombre de la receta!");
            }

        });
    return "completado"
}

function editEmpleado(i) {
    myIndexid = recetas[i].id_receta;
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

    document.getElementById("fk_id_plato").value = recetas[i].fk_id_plato
    document.getElementById("nombre_receta").value = recetas[i].nombre_receta

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

function getnombre(url,i,t) {
    fetch(url + "/" + i, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())

        .then(json => {
            t.innerHTML=json[0].nombre
        });
}

function deleteEmpleado(i) {
    myIndexid = recetas[i].id_receta;
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

                        recetas.splice(i, 1)
                        ShowTabla(recetas, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}
let campos = [
    "nombre",
    "fk_id_categoria",
    "costo"
];
let campos2 = [
    "nombre",
    "fk_id_categoria",
    "costo",
    "activo"
];
const urlbase = "https://pedidoambrosia.herokuapp.com/api/plato";
let tabla = document.getElementById('form-list-client-body');
let categoria = document.getElementById("fk_id_categoria");
let activo = document.getElementById("activo");

const urlcategoria = "https://pedidoambrosia.herokuapp.com/api/categoria";


var myIndexid;
var myIndex;
var platos = [];
var categorias = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("nombre").value = ""
    document.getElementById("costo").value = ""
    document.getElementById("fk_id_categoria").value = ""
    /*var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar una categoria";
    myTr2.value = "";
    myTr2.selected = true;
    categorias=[]
    getCategorias().then(res => {
        categorias.push(...res);
        ShowCategoria(categorias,categoria)
    })
    */
    //document.getElementById("fk_id_categoria").appendChild(myTr2)
    if (document.getElementById("activo")) {
        document.getElementById("activo").value = ""
    }
   

}

function llenarCampos() {
    var nuevoEmpleado = {
        nombre: document.getElementById("nombre").value,
        fk_id_categoria: document.getElementById("fk_id_categoria").value,
        costo: document.getElementById("costo").value
   
    }
    return nuevoEmpleado;
}
function llenarCampos2() {
    var nuevoEmpleado = {
        nombre: document.getElementById("nombre").value,
        fk_id_categoria: document.getElementById("fk_id_categoria").value,
        costo: document.getElementById("costo").value,
        activo: document.getElementById("activo").value
    }
    return nuevoEmpleado;
}

function validarFormulario(evento) {
    evento.preventDefault();

    let vacio = false;
    let limite = false;
    let falta = []
    let contienenumeros = false;
    for (var i = 0; i < campos.length; i++) {
        var campo = document.getElementById(campos[i]).value;
        if (campo.length == 0) {
            vacio = true;
            falta.push(campos[i]);
        }

    }
    let connumeros = []
    let aux = []

    connumeros.push(tiene_numeros(document.getElementById(campos[0]).value));

    for (let k = 0; k < connumeros.length; k++) {
        if (connumeros[k] == 1) {
            aux.push(campos[k]);
            contienenumeros = true;
        }

    }

    if (contienenumeros) {
        alert("los campos " + aux.toString() + " no deben contener numeros ")
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
    let contienenumeros = false;
    for (var i = 0; i < campos2.length; i++) {
        var campo = document.getElementById(campos2[i]).value;
        if (campo.length == 0) {
            vacio = true;
            falta.push(campos2[i]);
        }

    }
    let connumeros = []
    let aux = []

    connumeros.push(tiene_numeros(document.getElementById(campos2[0]).value));

    for (let k = 0; k < connumeros.length; k++) {
        if (connumeros[k] == 1) {
            aux.push(campos2[k]);
            contienenumeros = true;
        }
    }
    if (contienenumeros) {
        alert("los campos " + aux.toString() + " no deben contener numeros ")
        return;
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
function tiene_numeros(texto) {
    var regex = /(\d+)/g;
    var cadena = texto.match(regex);
    if (Number.isInteger(parseInt(cadena))) {
        return 1;
    }
    return 0;
}

const ShowCategoria = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_categoria").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar una categoria";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_categoria").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = data[i].nombre;
            myTr.value = data[i].id_categoria;
            document.getElementById("fk_id_categoria").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_categoria").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar una categoria";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_categoria").appendChild(myTr2)
    }
}

const ShowTabla = (data, container) => {

    container.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        var myTr = document.createElement("tr")
        for (let a in data[i]) {
            var mytd = document.createElement("td")
            //mytd.setAttribute('data-th',a)
            mytd.innerHTML = data[i][a];
            if (a.includes('id_plato')) {
                mytd.style.display="none"

            }
            if (a.includes('fk_id_categoria')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                getnombre(urlcategoria, data[i][a], mya);
                mytd.appendChild(mya)
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
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/platos');
    let data;
    const { status, statusText } = response;

    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getCategorias() {
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/categorias');
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
        platos.push(...res);
        ShowTabla(platos, tabla)
    })
    getCategorias().then(res => {
        categorias.push(...res);
        ShowCategoria(categorias, categoria)
    })
})

function addEmpleado() {
    let nuevoPlato = llenarCampos();
    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevoPlato)
    }).then(response => response.json())
        .then(json => {
            if (json[0]) {
                platos.push(json[0]);
                ShowTabla(platos, tabla)
                swal("Creado correctamente!");
            } else {
                swal("Ya existe el nombre del plato!");
            }

        });
        toggle2()
}
function updateEmpleado() {

    let modificaPlato = llenarCampos2();
    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificaPlato)
    }).then(response => response.json())
        .then(json => {
            if (json[0]) {
                platos[myIndex] = json[0];
                ShowTabla(platos, tabla)
                swal("Actualizado correctamente!");
            } else {
                swal("Ya existe el nombre del plato!");
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
   
        <label for="activo">*activo :</label>
        <select id="activo" class="custom-select" required>
            <option checked value="">Seleccionar un estado</option>
            <option value="s">activo</option>
            <option value="n">inactivo</option>

        </select>
    </div>`
    }
    myIndexid = platos[i].id_plato;
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


    document.getElementById("nombre").value = platos[i].nombre

    document.getElementById("fk_id_categoria").value = platos[i].fk_id_categoria
    document.getElementById("costo").value = platos[i].costo
    document.getElementById("activo").value = platos[i].activo

    document.getElementById("muestradiv").style.display="none";
    toggle()

}

//Updating Client
function updEmpleado() {
    if (updateEmpleado() == "error") {

    } else {

        var crbtn = document.createElement("button")
        crbtn.innerHTML = "Registrar";
        //crbtn.setAttribute("onclick", "validarFormulario()")

        crbtn.setAttribute("class", "btn btn-primary btn-block")
        crbtn.setAttribute("id", "btn-save")//btn btn-sm btn-success
        document.getElementById("saveupdate").innerHTML = ""

        document.getElementById("saveupdate").appendChild(crbtn);
        document.getElementById("btn-save").addEventListener('click', validarFormulario);
    }
    document.getElementById("muestradiv").style.display="inline-block";

}
function cancelSeleccion() {
    var crbtn = document.createElement("button")
    crbtn.innerHTML = "Registrar";
    //crbtn.setAttribute("onclick", "validarFormulario")

    crbtn.setAttribute("class", "btn btn-primary btn-block")
    crbtn.setAttribute("id", "btn-save")//btn btn-sm btn-success
    document.getElementById("saveupdate").innerHTML = ""

    document.getElementById("saveupdate").appendChild(crbtn);
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
    toggle2()
    borrarCampos()
    document.getElementById("muestradiv").style.display="inline-block";

}

function getnombre(url, i, t) {
    fetch(url + "/" + i, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            t.innerHTML = json[0].nombre
        });
}



//deleting client
function deleteEmpleado(i) {
    myIndexid = platos[i].id_plato;
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

                        platos.splice(i, 1)
                        ShowTabla(platos, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}


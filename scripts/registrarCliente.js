let campos = [
    "identificacion",
    "primer_nombre",
    "primer_apellido",
    "fk_id_genero",
    "fk_id_municipio",
    "correo",
    "segundo_nombre",
    "segundo_apellido",
];
let campos2 = [
    "identificacion",
    "primer_nombre",
    "primer_apellido",
    "fk_id_genero",
    "fk_id_municipio",
    "activo",
    "correo",
    "segundo_nombre",
    "segundo_apellido",
];
let tabla = document.getElementById('form-list-client-body');

let departamento = document.getElementById("fk_id_departamento");
let municipio = document.getElementById("fk_id_municipio");
let genero = document.getElementById("fk_id_genero");

let activo = document.getElementById("activo");
const urlbase = "https://pedidoambrosia.herokuapp.com/api/cliente";

const urlmunicipio = "https://pedidoambrosia.herokuapp.com/api/municipio";
const urldepartamento = "https://pedidoambrosia.herokuapp.com/api/departamento";
const urlgenero = "https://pedidoambrosia.herokuapp.com/api/genero";


var myIndexid;
var myIndex;
var clientes = [];
var municipios = [];
var departamentos = [];
var generos = []


document.addEventListener("DOMContentLoaded", function () {
    var pathname = window.location.pathname;
    var user = localStorage.getItem("sesion")
    var ruta = pathname.split("/")[pathname.split("/").length - 1].split(".")[0]
    validarRuta(ruta,user)

    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("identificacion").value = ""
    document.getElementById("primer_nombre").value = ""
    document.getElementById("segundo_nombre").value = ""
    document.getElementById("primer_apellido").value = ""
    document.getElementById("segundo_apellido").value = ""
    document.getElementById("correo").value = ""
    document.getElementById("fk_id_genero").value = ""
    document.getElementById("fk_id_municipio").innerHTML = ""
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un municipio";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_municipio").appendChild(myTr2)
    document.getElementById("fk_id_departamento").value = ""
    if (document.getElementById("activo")) {
        document.getElementById("activo").value = ""

    }


}

function llenarCampos() {
    var nuevoEmpleado = {
        identificacion: document.getElementById("identificacion").value,
        primer_nombre: document.getElementById("primer_nombre").value,
        segundo_nombre: document.getElementById("segundo_nombre").value,
        primer_apellido: document.getElementById("primer_apellido").value,
        segundo_apellido: document.getElementById("segundo_apellido").value,
        fk_id_genero: document.getElementById("fk_id_genero").value,
        fk_id_municipio: document.getElementById("fk_id_municipio").value,
        correo: document.getElementById("correo").value
    }
    return nuevoEmpleado;
}
function llenarCampos2() {
    var nuevoEmpleado = {
        identificacion: document.getElementById("identificacion").value,
        primer_nombre: document.getElementById("primer_nombre").value,
        segundo_nombre: document.getElementById("segundo_nombre").value,
        primer_apellido: document.getElementById("primer_apellido").value,
        segundo_apellido: document.getElementById("segundo_apellido").value,
        fk_id_genero: document.getElementById("fk_id_genero").value,
        fk_id_municipio: document.getElementById("fk_id_municipio").value,
        activo: document.getElementById("activo").value,
        correo: document.getElementById("correo").value
    }
    return nuevoEmpleado;
}

function validarFormulario(evento) {
    evento.preventDefault();

    let vacio = false;
    let limite = false;
    let falta = []
    let contienenumeros = false;
    for (var i = 0; i < campos.length - 2; i++) {
        var campo = document.getElementById(campos[i]).value;
        if (campo.length == 0) {
            vacio = true;
            falta.push(campos[i]);
        }

    }
    let connumeros = []
    let aux = []


    connumeros.push(tiene_numeros(document.getElementById(campos[1]).value) === 1 ? 1 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos[2]).value) === 1 ? 2 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos[6]).value) === 1 ? 6 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos[7]).value) === 1 ? 7 : "");
    for (let k = 0; k < connumeros.length; k++) {
        if (connumeros[k] != "") {
            aux.push(campos[connumeros[k]]);
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
    var text = document.getElementById("correo").value;
    if (validarEmail(text) === 0) {
        alert("La dirección de email " + document.getElementById("correo").value + " es incorrecta.");
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
    for (var i = 0; i < campos2.length - 2; i++) {
        var campo = document.getElementById(campos2[i]).value;
        if (campo.length == 0) {
            vacio = true;
            falta.push(campos2[i]);
        }

    }
    let connumeros = []
    let aux = []

    connumeros.push(tiene_numeros(document.getElementById(campos2[1]).value) === 1 ? 1 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos2[2]).value) === 1 ? 2 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos2[7]).value) === 1 ? 7 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos2[8]).value) === 1 ? 8 : "");
    for (let k = 0; k < connumeros.length; k++) {
        if (connumeros[k] != "") {
            aux.push(campos2[connumeros[k]]);
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
    var text = document.getElementById("correo").value;
    if (validarEmail(text) === 0) {
        alert("La dirección de email " + document.getElementById("correo").value + " es incorrecta.");
        return;
    }

    //let nuevoEmpleado = llenarCampos();

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
function validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
        //alert("La dirección de email " + valor + " es correcta.");
        return 1;
    } else {
        return 0;
    }
}

const ShowGenero = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_genero").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un genero";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_genero").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = `${data[i].nombre}`;
            myTr.value = data[i].id_genero;
            document.getElementById("fk_id_genero").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_genero").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un genero";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_genero").appendChild(myTr2)
    }
}

const ShowDepartamento = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_departamento").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un departamento";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_departamento").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = data[i].nombre;
            myTr.value = data[i].id_departamento;
            document.getElementById("fk_id_departamento").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_departamento").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un departamento";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_departamento").appendChild(myTr2)
    }
}
const ShowMunicipio = (data, container) => {

    container.innerHTML = ""
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = data[i].nombre;
            myTr.value = data[i].id_municipio;
            document.getElementById("fk_id_municipio").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_municipio").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un municipio";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_municipio").appendChild(myTr2)
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

            /*if (a.includes('fk_id_municipio')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")

                getnombre(urlmunicipio, data[i][a], mya);
                mytd.appendChild(mya)
            }

            if (a.includes('fk_id_genero')) {
                mytd.innerHTML = "";
                var mya3 = document.createElement("span")

                getnombre(urlgenero, data[i][a], mya3);
                mytd.appendChild(mya3)
            }*/


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
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/clientes');
    let data;
    const { status, statusText } = response;

    if (response.status === 200) {
        data = response.json();


        return data;
    }

}

async function getGeneros() {

    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/generos');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}


async function getDepartamentos(id_pais) {

    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/departamentos');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getMunicipios(id_departamento) {
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/municipios/' + id_departamento);
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    fetchText().then(res => {
        clientes.push(...res);
        ShowTabla(clientes, tabla)

    })
    getDepartamentos().then(res => {
        departamentos.push(...res);
        ShowDepartamento(departamentos, departamento)
    })
    getGeneros().then(res => {
        generos.push(...res);
        ShowGenero(generos, genero)
    })


})

departamento.addEventListener('change', function () {
    municipios = []
    if (this.value) {
        getMunicipios(this.value).then(res => {
            municipios.push(...res);
            ShowMunicipio(municipios, municipio)
        })
    } else {
        ShowMunicipio(municipios, municipio)
    }
});


function addEmpleado() {
    let nuevoCliente = llenarCampos();


    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevoCliente)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            if (json[0]) {
                clientes.push(json[0]);
                ShowTabla(clientes, tabla)
                swal("Creado correctamente!");               
            }else{
                swal("la identificacion ya existe")
            }

        });
        toggle2();
}
function updateEmpleado() {

    let modificaCliente = llenarCampos2();

    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificaCliente)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            if (json[0]) {
                clientes[myIndex] = json[0];
                ShowTabla(clientes, tabla)
                swal("Actualizado correctamente!");
                
            } else {
                swal("la identificacion ya existe!");
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


    myIndexid = clientes[i].id_cliente;
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


    document.getElementById("identificacion").value = clientes[i].identificacion
    document.getElementById("primer_nombre").value = clientes[i].primer_nombre
    document.getElementById("segundo_nombre").value = clientes[i].segundo_nombre
    document.getElementById("primer_apellido").value = clientes[i].primer_apellido
    document.getElementById("segundo_apellido").value = clientes[i].segundo_apellido
    document.getElementById("correo").value = clientes[i].correo

    //document.getElementById("fk_id_departamento").value = clientes[i].fk_id_departamento
    municipios = []
    if (clientes[i].fk_id_departamento) {
        const $select = document.querySelector('#fk_id_departamento');
        const $options = Array.from($select.options);
        const optionToSelect = $options.find(item => item.text === clientes[i].fk_id_departamento);
        optionToSelect.selected = true;

        getMunicipios(optionToSelect.value).then(res => {
            municipios.push(...res);
            ShowMunicipio(municipios, municipio)
            const select = document.querySelector('#fk_id_municipio');
            const options = Array.from(select.options);
            const optionToSelect2 = options.find(item => item.text === clientes[i].fk_id_municipio);
            optionToSelect2.selected = true;
        })
  
    } else {
        ShowMunicipio(municipios, municipio)
    }
    const selectg = document.querySelector('#fk_id_genero');
    const optionsg = Array.from(selectg.options);
    const optionToSelectg = optionsg.find(item => item.text == clientes[i].fk_id_genero);
    optionToSelectg.selected = true;



    //document.getElementById("fk_id_genero").value = clientes[i].fk_id_genero
    //document.getElementById("fk_id_municipio").value = clientes[i].fk_id_municipio
    document.getElementById("activo").value = clientes[i].activo
    document.getElementById("muestradiv").style.display="none";
    toggle();



}

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
    let aux = document.getElementById("formulario");
    let r = document.getElementById("remove");
    aux.removeChild(r);
    var crbtn = document.createElement("button")
    crbtn.innerHTML = "Registrar";
    //crbtn.setAttribute("onclick", "validarFormulario")

    crbtn.setAttribute("class", "btn btn-primary btn-block")
    crbtn.setAttribute("id", "btn-save")//btn btn-sm btn-success
    document.getElementById("saveupdate").innerHTML = ""

    document.getElementById("saveupdate").appendChild(crbtn);
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
    toggle2();
    borrarCampos();
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
            if (json[0]) {
                t.innerHTML = json[0].nombre
            }

        });
}


//deleting client
function deleteEmpleado(i) {
    myIndexid = clientes[i].id_cliente;
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

                        clientes.splice(i, 1)
                        ShowTabla(clientes, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}
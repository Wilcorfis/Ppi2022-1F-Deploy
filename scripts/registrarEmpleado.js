
let campos = [
    "tipo_empleado",
    "identificacion",
    "primer_nombre",
    "primer_apellido",
    "celular",
    "clave",
    "confirmarclave",
    "direccion",
    "correo",
    "fecha_nacimiento",
    "genero",
    "municipio",
    "horario",
    "segundo_nombre",
    "segundo_apellido",
];
let campos2 = [
    "tipo_empleado",
    "identificacion",
    "primer_nombre",
    "primer_apellido",
    "celular",
    "clave",
    "confirmarclave",
    "direccion",
    "correo",
    "fecha_nacimiento",
    "genero",
    "municipio",
    "horario",
    "activo",
    "segundo_nombre",
    "segundo_apellido",
];
let tabla = document.getElementById('form-list-client-body');//contenedor
//let pais = document.getElementById("pais");
let departamento = document.getElementById("departamento");
let horario = document.getElementById("horario");
let municipio = document.getElementById("municipio");//contenedor2
let genero = document.getElementById("genero");
let tipo_empleado = document.getElementById("tipo_empleado");
let activo = document.getElementById("activo");
const urlbase = variable+"/api/empleado";

const urlmunicipio = variable+"/api/municipio";
const urldepartamento = variable+"/api/departamento";
const urltipo_empleado = variable+"/api/tipo_empleado";
const urlgenero = variable+"/api/genero";
const urlhorario = variable+"/api/horario";

var myIndexid;
var myIndex;
var empleados = [];//marcas
var municipios = [];
//var paises = [];
var departamentos = [];
var tipo_empleados = []
var generos = []
var horarios = []
var municipios = []



document.addEventListener("DOMContentLoaded", function () {

    var pathname = window.location.pathname;
    var user = localStorage.getItem("sesion")
    var ruta = pathname.split("/")[pathname.split("/").length - 1].split(".")[0]
    if (ruta == "crud_empleado2") {
        if (localStorage.getItem("sesion") && localStorage.getItem("id")) {
            localStorage.removeItem("sesion");
            localStorage.removeItem("id");
        }



    }
    //rutas
    validarRuta(ruta, user)

    var today = new Date();
    var hace100 = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy2 = today.getFullYear() - 118;
    var yyyy = today.getFullYear() - 18;
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    hace100 = yyyy2 + '-' + mm + '-' + dd;
    document.getElementById("fecha_nacimiento").setAttribute("min", hace100);
    document.getElementById("fecha_nacimiento").setAttribute("max", today);
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("identificacion").value = ""
    document.getElementById("tipo_empleado").value = ""
    document.getElementById("primer_nombre").value = ""
    document.getElementById("segundo_nombre").value = ""
    document.getElementById("primer_apellido").value = ""
    document.getElementById("segundo_apellido").value = ""
    document.getElementById("telefono").value = ""
    document.getElementById("celular").value = ""
    document.getElementById("clave").value = ""
    document.getElementById("direccion").value = ""
    document.getElementById("correo").value = ""
    document.getElementById("fecha_nacimiento").value = ""
    document.getElementById("genero").value = ""
    document.getElementById("municipio").innerHTML = ""
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un municipio";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("municipio").appendChild(myTr2)
    document.getElementById("departamento").value = ""
    document.getElementById("horario").value = ""


}
function entradafecha(fecha) {
    let arr = fecha.split("-");
    return arr[2] + "/" + arr[1] + "/" + arr[0]


}
function llenarCampos2() {
    var nuevoEmpleado = {
        identificacion: document.getElementById("identificacion").value,
        tipo_empleado: document.getElementById("tipo_empleado").value,
        primer_nombre: document.getElementById("primer_nombre").value,
        segundo_nombre: document.getElementById("segundo_nombre").value,
        primer_apellido: document.getElementById("primer_apellido").value,
        segundo_apellido: document.getElementById("segundo_apellido").value,
        telefono: document.getElementById("telefono").value,
        celular: document.getElementById("celular").value,
        clave: document.getElementById("clave").value,
        direccion: document.getElementById("direccion").value,
        correo: document.getElementById("correo").value,
        fecha_nacimiento: entradafecha(document.getElementById("fecha_nacimiento").value),
        genero: document.getElementById("genero").value,
        municipio: document.getElementById("municipio").value,
        horario: document.getElementById("horario").value,
        activo: document.getElementById("activo").value
    }

    return nuevoEmpleado;

}
function llenarCampos() {
    var nuevoEmpleado = {
        identificacion: document.getElementById("identificacion").value,
        tipo_empleado: document.getElementById("tipo_empleado").value,
        primer_nombre: document.getElementById("primer_nombre").value,
        segundo_nombre: document.getElementById("segundo_nombre").value,
        primer_apellido: document.getElementById("primer_apellido").value,
        segundo_apellido: document.getElementById("segundo_apellido").value,
        telefono: document.getElementById("telefono").value,
        celular: document.getElementById("celular").value,
        clave: document.getElementById("clave").value,
        direccion: document.getElementById("direccion").value,
        correo: document.getElementById("correo").value,
        fecha_nacimiento: entradafecha(document.getElementById("fecha_nacimiento").value),
        genero: document.getElementById("genero").value,
        municipio: document.getElementById("municipio").value,
        horario: document.getElementById("horario").value,

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

    connumeros.push(tiene_numeros(document.getElementById(campos[2]).value) === 1 ? 2 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos[3]).value) === 1 ? 3 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos[13]).value) === 1 ? 14 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos[14]).value) === 1 ? 15 : "");
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
    if (document.getElementById(campos[5]).value !== document.getElementById(campos[6]).value) {
        alert("campo clave y repetir clave no coinciden")
        return;
    }
    //let nuevoEmpleado = llenarCampos();

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

    connumeros.push(tiene_numeros(document.getElementById(campos2[2]).value) === 1 ? 2 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos2[3]).value) === 1 ? 3 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos2[14]).value) === 1 ? 14 : "");
    connumeros.push(tiene_numeros(document.getElementById(campos2[15]).value) === 1 ? 15 : "");
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
    if (document.getElementById(campos2[5]).value !== document.getElementById(campos2[6]).value) {
        alert("campo clave y repetir clave no coinciden")
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
////////
/*const ShowPais = (data, container) => {
    container.innerHTML = ""
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un pais";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("pais").appendChild(myTr2)
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = data[i].nombre;
            myTr.value = data[i].id_pais;
            document.getElementById("pais").appendChild(myTr)

        }
    } else {
        document.getElementById("pais").innerHTML = '';
    }
}*/
const ShowTipoEmpleado = (data, container) => {
    container.innerHTML = ""
    document.getElementById("tipo_empleado").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un tipo de empleado";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("tipo_empleado").appendChild(myTr2)
    var pathname = window.location.pathname;

    var ruta = pathname.split("/")[pathname.split("/").length - 1].split(".")[0]
    var selectobject = document.getElementById("tipo_empleado");


    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
   
            if (ruta == "crud_empleado2" && data[i].nombre!="Administrador" ) {
                var myTr = document.createElement("option")
                myTr.innerHTML = `${data[i].nombre}`;
                myTr.value = data[i].id_tipo_empleado;
                document.getElementById("tipo_empleado").appendChild(myTr)
  

            }
            if (ruta!="crud_empleado2") {
                var myTr = document.createElement("option")
                myTr.innerHTML = `${data[i].nombre}`;
                myTr.value = data[i].id_tipo_empleado;
                document.getElementById("tipo_empleado").appendChild(myTr)
                
            }

        }
    } else {
        document.getElementById("tipo_empleado").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un tipo empleado";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("tipo_empleado").appendChild(myTr2)
    }
}
const ShowGenero = (data, container) => {
    container.innerHTML = ""
    document.getElementById("genero").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un genero";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("genero").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = `${data[i].nombre}`;
            myTr.value = data[i].id_genero;
            document.getElementById("genero").appendChild(myTr)

        }
    } else {
        document.getElementById("genero").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un genero";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("genero").appendChild(myTr2)
    }
}
const ShowHorario = (data, container) => {
    container.innerHTML = ""
    document.getElementById("horario").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un horario";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("horario").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = `${data[i].hora_entrada} ${data[i].hora_salida} ${data[i].dias}`;
            myTr.value = data[i].id_horario;
            document.getElementById("horario").appendChild(myTr)

        }
    } else {
        document.getElementById("horario").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un horario";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("horario").appendChild(myTr2)
    }
}
const ShowDepartamento = (data, container) => {
    container.innerHTML = ""
    document.getElementById("departamento").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un departamento";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("departamento").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = data[i].nombre;
            myTr.value = data[i].id_departamento;
            document.getElementById("departamento").appendChild(myTr)

        }
    } else {
        document.getElementById("departamento").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un departamento";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("departamento").appendChild(myTr2)
    }
}
const ShowMunicipio = (data, container) => {

    container.innerHTML = ""
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = data[i].nombre;
            myTr.value = data[i].id_municipio;
            document.getElementById("municipio").appendChild(myTr)

        }
    } else {
        document.getElementById("municipio").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un municipio";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("municipio").appendChild(myTr2)
    }
}
const ShowTabla = (data, container) => {
    if (container) {


        container.innerHTML = ""
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("tr")
            for (let a in data[i]) {
                var mytd = document.createElement("td")
                //mytd.setAttribute('data-th', a)

                mytd.innerHTML = data[i][a];
                if (a.includes('id_empleado')) {
                    mytd.style.display="none"
    
                }

                if (a.includes('fecha_nacimiento')) {
                    mytd.innerHTML = data[i][a].toString().split("T")[0];
                }

                /*if (a.includes('fk_id_municipio')) {
                    mytd.innerHTML = "";
                    var mya = document.createElement("span")
                    mya.innerHTML = ""
                    getnombre(urlmunicipio, data[i][a], mya);
                    mytd.appendChild(mya)
                }*/
                /*if (a.includes('departamento')) {
                    mytd.innerHTML = "";
                    var mya = document.createElement("span")
                    mya.innerHTML = ""
                    getnombre(urldepartamento, data[i][a], mya);
                    mytd.appendChild(mya)
                }*/
                /*if (a.includes('genero')) {
                    mytd.innerHTML = "";
                    var mya = document.createElement("span")
                    mya.innerHTML = ""
                    getnombre(urlgenero, data[i][a], mya);
                    mytd.appendChild(mya)
                }*/

                if (a.includes('horario')) {
                    mytd.innerHTML = "";
                    var mya = document.createElement("span")
                    mya.innerHTML = ""
                    getnombreHorario(urlhorario, data[i][a], mya);
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

}
async function fetchText() {
    let response = await fetch(variable+'/api/empleados');
    let data;
    const { status, statusText } = response;

    if (response.status === 200) {
        data = response.json();


        return data;
    }

}
async function getTipoEmpleados() {

    let response = await fetch(variable+'/api/tipo_empleados');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getGeneros() {

    let response = await fetch(variable+'/api/generos');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getHorarios() {

    let response = await fetch(variable+'/api/horarios');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
/*async function getPaises() {
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/paises');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}*/
async function getDepartamentos() {

    let response = await fetch(variable+'/api/departamentos');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getMunicipios(id_departamento) {
    let response = await fetch(variable+'/api/municipios/' + id_departamento);
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
function entradafecha(fecha) {
    let arr = fecha.split("-");
    return arr[2] + "/" + arr[1] + "/" + arr[0]


}


document.addEventListener('DOMContentLoaded', async () => {
    fetchText().then(res => {
        empleados.push(...res);
        ShowTabla(empleados, tabla)

    })
    getDepartamentos().then(res => {
        departamentos.push(...res);
        ShowDepartamento(departamentos, departamento)
    })
    getHorarios().then(res => {
        horarios.push(...res);
        ShowHorario(horarios, horario);
    })
    getTipoEmpleados().then(res => {
        tipo_empleados.push(...res);
        ShowTipoEmpleado(tipo_empleados, tipo_empleado)
    })
    getGeneros().then(res => {
        generos.push(...res);
        ShowGenero(generos, genero)
    })


})


/*pais.addEventListener('change', function () {
    //departamento.textContent = "Você selecionou a " + this.value;

    departamentos = [];
    municipios = []
    if (this.value) {
        getDepartamentos(this.value).then(res => {
            departamentos.push(...res);
            ShowDepartamento(departamentos, departamento)
        })
    } else {
        ShowDepartamento(departamentos, departamento)
        ShowMunicipio(municipios, municipio)
    }

});*/
departamento.addEventListener('change', function () {
    //departamento.textContent = "Você selecionou a " + this.value;
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


    let nuevoEmpleado = llenarCampos();



    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevoEmpleado)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            if (json[0]) {
                empleados.push(json[0]);
                ShowTabla(empleados, tabla)
                swal("Creado correctamente!");
            } else {
                swal("la identificacion ya existe")
            }

        });
    toggle2();

}
function updateEmpleado() {

    let modificaEmpleado = llenarCampos2();


    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificaEmpleado)
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            if (json[0]) {
                empleados[myIndex] = json[0];
                ShowTabla(empleados, tabla)
                swal("actualizado correctamente!");

            } else {
                swal("la identificacion ya existe!");
            }


        });
    let aux = document.getElementById("formulario");
    let r = document.getElementById("remove");
    aux.removeChild(r);
    return "completado"
}




//Editing Client
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


    //console.log(empleados[i])
    //document.getElementById("saveupdate").innerHTML = ""
    myIndexid = empleados[i].id_empleado;
    myIndex = i;
    var updatebtn = document.createElement("button")
    updatebtn.innerHTML = "Update";
    updatebtn.setAttribute("class", "btn btn-sm btn-success")

    updatebtn.setAttribute("id", "btn-save2")//btn btn-sm btn-success
    //document.getElementById("saveupdate").innerHTML = ""

    document.getElementById("saveupdate").appendChild(updatebtn);
    document.getElementById("btn-save2").addEventListener('click', validarFormularioUpdate);
    //updatebtn.setAttribute("onclick", "updEmpleado()")
    var cancelbtn = document.createElement("button")
    cancelbtn.innerHTML = "Cancelar";
    cancelbtn.setAttribute("class", "btn btn-sm")
    cancelbtn.setAttribute("onclick", "cancelSeleccion()")

    document.getElementById("saveupdate").innerHTML = "";
    document.getElementById("saveupdate").appendChild(updatebtn);
    document.getElementById("saveupdate").appendChild(cancelbtn);


    document.getElementById("identificacion").value = empleados[i].identificacion

    const selecttipo = document.querySelector('#tipo_empleado');
    const optiont = Array.from(selecttipo.options);

    const optionToSelecttipo = optiont.find(item => item.text === empleados[i].tipo_empleado);
    optionToSelecttipo.selected = true;
    //document.getElementById("tipo_empleado").value = empleados[i].fk_id_tipo_empleado
    document.getElementById("primer_nombre").value = empleados[i].primer_nombre
    document.getElementById("segundo_nombre").value = empleados[i].segundo_nombre
    document.getElementById("primer_apellido").value = empleados[i].primer_apellido
    document.getElementById("segundo_apellido").value = empleados[i].segundo_apellido

    document.getElementById("telefono").value = empleados[i].telefono
    document.getElementById("celular").value = empleados[i].celular
    document.getElementById("clave").value = empleados[i].clave
    document.getElementById("direccion").value = empleados[i].direccion

    document.getElementById("fecha_nacimiento").value = empleados[i].fecha_nacimiento.split("T")[0];
    //document.getElementById("departamento").value = empleados[i].fk_id_departamento
    municipios = []
    if (empleados[i].fk_id_departamento) {
        const $select = document.querySelector('#departamento');
        const $options = Array.from($select.options);
        const optionToSelect = $options.find(item => item.text === empleados[i].fk_id_departamento);
        optionToSelect.selected = true;

        getMunicipios(optionToSelect.value).then(res => {
            municipios.push(...res);
            ShowMunicipio(municipios, municipio)
            const select = document.querySelector('#municipio');
            const options = Array.from(select.options);
            const optionToSelect2 = options.find(item => item.text === empleados[i].fk_id_municipio);
            optionToSelect2.selected = true;
        })
    } else {
        ShowMunicipio(municipios, municipio)
    }
    const selectg = document.querySelector('#genero');
    const optionsg = Array.from(selectg.options);
    const optionToSelectg = optionsg.find(item => item.text == empleados[i].fk_id_genero);
    
    optionToSelectg.selected = true;

    //document.getElementById("genero").value = empleados[i].fk_id_genero
    //document.getElementById("municipio").value = empleados[i].fk_id_municipio
    document.getElementById("horario").value = empleados[i].fk_id_horario
    document.getElementById("activo").value = empleados[i].activo
    document.getElementById("correo").value = empleados[i].correo
    toggle();
    document.getElementById("muestradiv").style.display = "none";




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
    document.getElementById("muestradiv").style.display = "inline-block";
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
    document.getElementById("muestradiv").style.display = "inline-block";

}

/*function getnombre(url, i, t) {
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
}*/
function getnombreHorario(url, i, t) {
    fetch(url + "/" + i, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())

        // Displaying results to console
        .then(json => {
            t.innerHTML = json[0].hora_entrada + " " + json[0].hora_salida + " " + json[0].dias
        });
}


//deleting client
function deleteEmpleado(i) {
    myIndexid = empleados[i].id_empleado;
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

                        empleados.splice(i, 1)
                        ShowTabla(empleados, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}
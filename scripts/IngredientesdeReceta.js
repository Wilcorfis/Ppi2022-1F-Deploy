

let campos = [
    "descripcion",
    "fk_id_ingrediente",
    "fk_id_receta",
    "cantidad",
    "unidad"
];
const urlbase = "https://pedidoambrosia.herokuapp.com/api/receta_ingrediente";
let tabla = document.getElementById('form-list-client-body');

let ingrediente = document.getElementById("fk_id_ingrediente");
let receta = document.getElementById("fk_id_receta");
 

const urlingrediente = "https://pedidoambrosia.herokuapp.com/api/ingrediente";
const urlreceta= "https://pedidoambrosia.herokuapp.com/api/receta";

var myIndexid;
var myIndex;
var receta_ingredientes = [];
var ingredientes = [];
var recetas = [];

document.addEventListener("DOMContentLoaded", function () {
    var pathname = window.location.pathname;
    var user = localStorage.getItem("sesion")
    var ruta = pathname.split("/")[pathname.split("/").length - 1].split(".")[0]
    validarRuta(ruta,user)
    validarRuta1(ruta,user)
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
//voy aqui
function borrarCampos() {
    document.getElementById("descripcion").value = ""
    document.getElementById("fk_id_ingrediente").value = ""
    document.getElementById("fk_id_receta").value = ""
    document.getElementById("cantidad").value = ""
    document.getElementById("unidad").value = ""
   
}

function llenarCampos() {
    var nuevoEmpleado = {
        descripcion: document.getElementById("descripcion").value,
        fk_id_ingrediente: document.getElementById("fk_id_ingrediente").value,
        fk_id_receta: document.getElementById("fk_id_receta").value,
        cantidad: document.getElementById("cantidad").value,
        unidad: document.getElementById("unidad").value
       
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

const ShowReceta = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_receta").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar una receta";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_receta").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = `${data[i].nombre_receta}`;
            myTr.value = data[i].id_receta;
            document.getElementById("fk_id_receta").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_receta").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar una receta";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_receta").appendChild(myTr2)
    }
}
const ShowIngrediente = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_ingrediente").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un ingrediente";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_ingrediente").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = `${data[i].nombre}`;
            myTr.value = data[i].id_ingrediente;
            document.getElementById("fk_id_ingrediente").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_ingrediente").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un ingrediente";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_ingrediente").appendChild(myTr2)
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

            if (a.includes('fk_id_ingrediente')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                getnombre(urlingrediente,data[i][a],mya);
                mytd.appendChild(mya)
            }
            if (a.includes('fk_id_receta')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                getnombrereceta(urlreceta,data[i][a],mya);
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
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/receta_ingredientes');
    let data;
    const { status, statusText } = response;

    if (response.status === 200) {
        data = response.json();


        return data;
    }

}
async function getRecetas() {

    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/recetas');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getIngredientes() {

    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/ingredientes');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    fetchText().then(res => {
        receta_ingredientes.push(...res);
        ShowTabla(receta_ingredientes, tabla)

    })
    getRecetas().then(res => {
        recetas.push(...res);
        ShowReceta(recetas, receta)
    })
    getIngredientes().then(res => {
        ingredientes.push(...res);
        ShowIngrediente(ingredientes, ingrediente);
    })

})

function addEmpleado() {
    let nuevorecetaIngrediente = llenarCampos();
    

    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevorecetaIngrediente)
    }).then(response => response.json())

        .then(json => {
            receta_ingredientes.push(json[0]);
            ShowTabla(receta_ingredientes, tabla)
            swal("Creado correctamente!");
        });

        toggle2();
}
function updateEmpleado() {
    let modificarecetaIngrediente = llenarCampos();

    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificarecetaIngrediente)
    }).then(response => response.json())
        .then(json => {
            receta_ingredientes[myIndex] = json[0];
            ShowTabla(receta_ingredientes, tabla)
            swal("Actualizado correctamente!");
        });
    return "completado"
}

function editEmpleado(i) {

    myIndexid = receta_ingredientes[i].id_receta_ingrediente;
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


    document.getElementById("descripcion").value = receta_ingredientes[i].descripcion
    document.getElementById("fk_id_ingrediente").value = receta_ingredientes[i].fk_id_ingrediente
    document.getElementById("fk_id_receta").value = receta_ingredientes[i].fk_id_receta
    document.getElementById("cantidad").value = receta_ingredientes[i].cantidad
    document.getElementById("unidad").value = receta_ingredientes[i].unidad

    document.getElementById("muestradiv").style.display="none";
    toggle();
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
    toggle2();
    borrarCampos();
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
function getnombrereceta(url,i,t) {
    fetch(url + "/" + i, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => {
            t.innerHTML=json[0].nombre_receta
        });
}

function deleteEmpleado(i) {
    myIndexid = receta_ingredientes[i].id_receta_ingrediente;
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

                        receta_ingredientes.splice(i, 1)
                        ShowTabla(receta_ingredientes, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}
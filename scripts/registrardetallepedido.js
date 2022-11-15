
let campos = [
    "fk_id_pedido",
    "fk_id_plato"
];
let codigo="";
let tabla = document.getElementById('form-list-client-body');

let pedido = document.getElementById("fk_id_pedido");
let plato = document.getElementById("fk_id_plato");


const urlbase = variable+"/api/detalle_pedido";

const urlpedido = variable+"/api/pedido";
const urlmesa = variable+"/api/meso";
const urlplato = variable+"/api/platos";


var myIndexid;
var myIndex;
var detalle_pedidos = [];

var pedidos = [];
var platos = []

document.addEventListener("DOMContentLoaded", function () {
    var pathname = window.location.pathname;
    var user = localStorage.getItem("sesion")
    var ruta = pathname.split("/")[pathname.split("/").length - 1].split(".")[0]
    validarRuta(ruta,user)
    validarRuta4(ruta,user)
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("fk_id_pedido").value = "";
    document.getElementById("fk_id_plato").value = "";


}

function llenarCampos() {
    let date = new Date();
    var nuevoEmpleado = {
        fk_id_pedido: document.getElementById("fk_id_pedido").value,
        fk_id_plato: document.getElementById("fk_id_plato").value,

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

const ShowPedido = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_pedido").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un pedido";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_pedido").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            if (data[i].estado === "En espera") {
                myTr.innerHTML = data[i].id_pedido;
                myTr.value = data[i].id_pedido;
                document.getElementById("fk_id_pedido").appendChild(myTr)

            }


        }
    } else {
        document.getElementById("fk_id_pedido").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un pedido";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_pedido").appendChild(myTr2)
    }
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
            if (data[i].activo === "s") {
                myTr.innerHTML = `${data[i].nombre} ${data[i].costo}`;
                myTr.value = data[i].id_plato;
                document.getElementById("fk_id_plato").appendChild(myTr)

            }


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

    container.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        var myTr = document.createElement("tr")
        for (let a in data[i]) {
            var mytd = document.createElement("td")
            //mytd.setAttribute('data-th', a)

            if (!a.includes('id_detalle_pedido')) {


                mytd.innerHTML = data[i][a];
            }

            if (a.includes('fk_id_pedido')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                elpedido(urlpedido, data[i][a], mya);
                mytd.appendChild(mya)
            }
            if (a.includes('fk_id_plato')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                elplato(urlplato, data[i][a], mya);
                mytd.appendChild(mya)
            }
            if (!a.includes('id_detalle_pedido')) {


                myTr.appendChild(mytd)
            }


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


        /*var pagobtn = document.createElement("button")
        pagobtn.innerHTML = "Pagar"
        pagobtn.setAttribute("class", "btn btn-sm btn-secondary")
        pagobtn.setAttribute("onclick", "pagoPedido(" + i + ")")*/

        actionTd.appendChild(editBtn)
        actionTd.appendChild(deletebtn)
        //actionTd.appendChild(pagobtn)
        myTr.appendChild(actionTd)
        document.getElementById("form-list-client-body").appendChild(myTr)

    }
    borrarCampos();
}
async function fetchText() {
    let response = await fetch(variable+'/api/detalle_pedidos');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }

}

async function getPedidos() {

    let response = await fetch(variable+'/api/pedidos');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getPlatos() {

    let response = await fetch(variable+'/api/platos');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    fetchText().then(res => {
        detalle_pedidos.push(...res);
        ShowTabla(detalle_pedidos, tabla)
    })
    getPedidos().then(res => {
        pedidos.push(...res);
        ShowPedido(pedidos, pedido)
    })
    getPlatos().then(res => {
        platos.push(...res);
        ShowPlato(platos, plato);
    })

})

function addEmpleado() {
    let nuevodetallePedido = llenarCampos();

    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevodetallePedido)
    }).then(response => response.json())
        .then(json => {
            detalle_pedidos.push(json[0]);
            ShowTabla(detalle_pedidos, tabla)
            swal("Creado correctamente!");
        });
    //CambiarEstadomesa_n(nuevoPedido.fk_id_mesa)
    toggle2()

}
function updateEmpleado() {
    let modificadetallePedido = llenarCampos();

    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificadetallePedido)
    }).then(response => response.json())
        .then(json => {
            detalle_pedidos[myIndex] = json[0];
            ShowTabla(detalle_pedidos, tabla)
            swal("Actualizado correctamente!");
        });
    return "completado"
}

function editEmpleado(i) {
    myIndexid = detalle_pedidos[i].id_detalle_pedido;
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


    document.getElementById("fk_id_pedido").value = detalle_pedidos[i].fk_id_pedido
    document.getElementById("fk_id_plato").value = detalle_pedidos[i].fk_id_plato

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
    toggle2();
    borrarCampos();
    document.getElementById("muestradiv").style.display="inline-block";

}

function elplato(url, i, t) {
    fetch(url + "/" + i, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => {
            t.innerHTML = `${json[0].nombre} ${json[0].costo} `
        });
}

function elpedido(url, i, t) {
    fetch(url + "/" + i, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => {
            console.log(json[0])
         
                  
            t.innerHTML = `pedido: ${json[0].id_pedido}  mesa : ${json[0].codigo} `
        });
}


function CambiarEstadomesa_n(id) {

    fetch(variable+"/api/mesaestadon" + "/" + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => {
            console.log(json);

        });
    return "completado"
}
/*function CambiarEstadomesa_s(id) {
    
    fetch("https://pedidoambrosia.herokuapp.com/api/mesaestados" + "/" + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => {
            console.log(json);
          
        });
    return "completado"
}*/



function deleteEmpleado(i) {
    myIndexid = detalle_pedidos[i].id_detalle_pedido;
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

                        detalle_pedidos.splice(i, 1)
                        ShowTabla(detalle_pedidos, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });
            swal("¡Borrado!", "Borrado correctamente", "success");
        });

}
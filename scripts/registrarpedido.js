import { variable } from "../variables";
let campos = [
    "fk_id_cliente",
    "fk_id_empleado",
    "fk_id_mesa"
];
let tabla = document.getElementById('form-list-client-body');

let cliente = document.getElementById("fk_id_cliente");
let empleado = document.getElementById("fk_id_empleado");
let mesa = document.getElementById("fk_id_mesa");

const urlbase = variable+"/api/pedido";

const urlcliente = variable+"/api/cliente";
const urlempleado = variable+"/api/empleado";
const urlmesa = variable+"/api/mesa";

var myIndexid;
var myIndex;
var pedidos = [];

var clientes = [];
var empleados = []
var mesas = []

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("fk_id_cliente").value = "";
    document.getElementById("fk_id_empleado").value = "";
    document.getElementById("fk_id_mesa").value = "";

}
function entradafecha(fecha) {
    let arr = fecha.split("-");
    return arr[2] + "/" + arr[1] + "/" + arr[0]


}
function llenarCampos() {
    let date = new Date();
    var nuevoEmpleado = {
        fk_id_cliente: document.getElementById("fk_id_cliente").value,
        fk_id_empleado: document.getElementById("fk_id_empleado").value,
        fk_id_mesa: document.getElementById("fk_id_mesa").value,
        fecha: String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear()
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

const ShowCliente = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_cliente").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un cliente";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_cliente").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = `${data[i].primer_nombre} ${data[i].segundo_nombre} ${data[i].primer_apellido} ${data[i].segundo_apellido}`;
            myTr.value = data[i].id_cliente;
            document.getElementById("fk_id_cliente").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_cliente").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un cliente";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_cliente").appendChild(myTr2)
    }
}
const ShowEmpleado = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_empleado").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar un empleado";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_empleado").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            myTr.innerHTML = `${data[i].primer_nombre} ${data[i].segundo_nombre} ${data[i].primer_apellido} ${data[i].segundo_apellido}`;
            myTr.value = data[i].id_empleado;
            document.getElementById("fk_id_empleado").appendChild(myTr)

        }
    } else {
        document.getElementById("fk_id_empleado").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar un empleado";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_empleado").appendChild(myTr2)
    }
}
const ShowMesa = (data, container) => {
    container.innerHTML = ""
    document.getElementById("fk_id_mesa").innerHTML = '';
    var myTr2 = document.createElement("option")
    myTr2.innerHTML = "Seleccionar una mesa";
    myTr2.value = "";
    myTr2.selected = true;

    document.getElementById("fk_id_mesa").appendChild(myTr2)

    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            var myTr = document.createElement("option")
            if (data[i].disponible === "s") {
                myTr.innerHTML = `${data[i].codigo}`;
                myTr.value = data[i].id_mesa;
                document.getElementById("fk_id_mesa").appendChild(myTr)

            }

        }
    } else {
        document.getElementById("fk_id_mesa").innerHTML = '';
        var myTr2 = document.createElement("option")
        myTr2.innerHTML = "Seleccionar una mesa";
        myTr2.value = "";
        myTr2.selected = true;

        document.getElementById("fk_id_mesa").appendChild(myTr2)
    }
}

const ShowTabla = (data, container) => {

    container.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        var myTr = document.createElement("tr")
        for (let a in data[i]) {
            var mytd = document.createElement("td")
            //mytd.setAttribute('data-th', a)
            

            mytd.innerHTML = data[i][a];
            

            if (a.includes('fecha')) {
                mytd.innerHTML = data[i][a].toString().split("T")[0];
            }

            if (a.includes('fk_id_cliente')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                getnombres(urlcliente, data[i][a], mya);
                mytd.appendChild(mya)
            }
            if (a.includes('fk_id_empleado')) {
                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                getnombres(urlempleado, data[i][a], mya);
                mytd.appendChild(mya)
            }

            myTr.appendChild(mytd)
        }

        var actionTd = document.createElement("td")
        actionTd.setAttribute('class','operacion')
        /*var editBtn = document.createElement("button")
        var btn = document.createElement("i")
        btn.setAttribute("class", "fa fa-edit")
        editBtn.setAttribute("class", "btn btn-sm btn-primary")
        editBtn.appendChild(btn)
        editBtn.setAttribute("onclick", "editEmpleado(" + i + ")")*/

        var deletebtn = document.createElement("button")
        var btn2 = document.createElement("i")
        btn2.setAttribute("class", "fa fa-trash")
        deletebtn.setAttribute("class", "btn btn-sm btn-danger")
        deletebtn.appendChild(btn2)
        deletebtn.setAttribute("onclick", "deleteEmpleado(" + i + ")")

        //actionTd.appendChild(editBtn)
        actionTd.appendChild(deletebtn)
        myTr.appendChild(actionTd)
        document.getElementById("form-list-client-body").appendChild(myTr)

    }
    borrarCampos();
}
async function fetchText() {
    let response = await fetch(variable+'/api/pedidos');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }

}

async function getClientes() {

    let response = await fetch(variable+'/api/clientes');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getEmpleados() {

    let response = await fetch(variable+'/api/empleadosw');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
async function getMesas() {

    let response = await fetch(variable+'/api/mesas');
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
    validarRuta4(ruta,user)
    fetchText().then(res => {
        pedidos.push(...res);
        ShowTabla(pedidos, tabla)
    })
    getClientes().then(res => {
        clientes.push(...res);
        ShowCliente(clientes, cliente)
    })
    getEmpleados().then(res => {
        empleados.push(...res);
        ShowEmpleado(empleados, empleado);
    })
    getMesas().then(res => {
        mesas.push(...res);
        ShowMesa(mesas, mesa)
    })
})

function addEmpleado() {
    let nuevoPedido = llenarCampos();

    fetch(urlbase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevoPedido)
    }).then(response => response.json())
        .then(json => {
            pedidos.push(json[0]);
            ShowTabla(pedidos, tabla)
            swal("Creado correctamente!");
        });
    CambiarEstadomesa_n(nuevoPedido.fk_id_mesa)
    forceReload()
    toggle2()

    
    

}
async function forceReload() {
    window.location.href = window.location.href;
}
function updateEmpleado() {
    let modificaPedido = llenarCampos();

    fetch(urlbase + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(modificaPedido)
    }).then(response => response.json())
        .then(json => {
            pedidos[myIndex] = json[0];
            ShowTabla(pedidos, tabla)
            swal("Actualizado correctamente!");
        });
    return "completado"
}

/*function editEmpleado(i) {
    myIndexid = pedidos[i].id_pedido;
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


    document.getElementById("fk_id_cliente").value = pedidos[i].fk_id_cliente
    document.getElementById("fk_id_empleado").value = pedidos[i].fk_id_empleado
    document.getElementById("fk_id_mesa").value = pedidos[i].codigo

}
*/
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

function getnombres(url, i, t) {
    fetch(url + "/" + i, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => {
            t.innerHTML = `${json[0].primer_nombre} ${json[0].segundo_nombre} ${json[0].primer_apellido} ${json[0].segundo_apellido}`
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
function CambiarEstadomesa_s(id) {
    
    fetch(variable+"/api/mesaestados" + "/" + id, {
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



function deleteEmpleado(i) {
    myIndexid = pedidos[i].id_pedido;
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

                        pedidos.splice(i, 1)
                        ShowTabla(pedidos, tabla)


                    } else {
                        alert("No se puede borrar porque se usa como foreign key")
                    }
                });

            swal("¡Borrado!", "Borrado correctamente", "success");
           
            CambiarEstadomesa_s(pedidos[i].codigo)
            forceReload()
            
        });
        

}
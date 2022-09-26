let identificacion = document.getElementById("identificacion");
let clave = document.getElementById("clave");

const urlbase = "https://pedidoambrosia.herokuapp.com/api/empleados";
const urllogin = "https://pedidoambrosia.herokuapp.com/api/login";
const now=new Date()
let t=60000


var login;

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btn-save").addEventListener('click', validarFormulario);
});
function borrarCampos() {
    document.getElementById("identificacion").value = ""
    document.getElementById("clave").value = ""

}

function llenarCampos() {
    var nuevoEmpleado = {
        identificacion: document.getElementById("identificacion").value,
        clave: document.getElementById("clave").value,
    }

    return nuevoEmpleado;

}

function validarFormulario(evento) {
    evento.preventDefault();
    if (document.getElementById("identificacion").value == "") {
        return

    }
    if (document.getElementById("clave").value == "") {
        return

    }



    addEmpleado();
}


async function fetchText() {
    let response = await fetch('https://pedidoambrosia.herokuapp.com/api/empleados');
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }
}
document.addEventListener('DOMContentLoaded', async () => {

})

function addEmpleado() {
    let nuevoEmpleado = llenarCampos();
    fetch(urllogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(nuevoEmpleado)
    }).then(response => response.json())
        .then(json => {

            login = json[0];

            if (login.length > 0) {


                if (login[0].activo == "s") {
                    if (login[0].tipo_empleado == "Cajero") {
                        localStorage.setItem("time",now.getTime()+t)
                        localStorage.setItem("sesion", login[0].tipo_empleado);
                        localStorage.setItem("id", login[0].identificacion);
                        location.href = "./dashboards/cajero.html"
                    }
                    if (login[0].tipo_empleado == "Administrador") {
                        localStorage.setItem("time",now.getTime()+t)
                        localStorage.setItem("sesion", login[0].tipo_empleado);
                        localStorage.setItem("id", login[0].identificacion);
                        location.href = "./dashboards/administrador.html"
                    }
                    if (login[0].tipo_empleado == "Mesero") {
                        localStorage.setItem("time",now.getTime()+t)
                        localStorage.setItem("sesion", login[0].tipo_empleado);
                        localStorage.setItem("id", login[0].identificacion);
                        location.href = "./dashboards/mesero.html"
                    }
                    if (login[0].tipo_empleado == "Cocinero") {
                        localStorage.setItem("time",now.getTime()+t)
                        localStorage.setItem("sesion", login[0].tipo_empleado);
                        localStorage.setItem("id", login[0].identificacion);
                        location.href = "./dashboards/cocinero.html"
                    }
                } else {
                    swal("empleado inactivo")
                }
            } else {
                swal("usuario o contraseña incorrecta")
            }


        });
}

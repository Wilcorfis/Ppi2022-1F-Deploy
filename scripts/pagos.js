import { variable } from "../variables";
let tabla = document.getElementById('form-list-client-body');

const urldetalle_pedido = variable+"/api/detalle_pedidopago";
var myIndexid;
var myIndex;

var detalle_pedidos = [];
function recorreString(index, array) {
    let val = ""

    for (i = index + 1; i < array.length; i++) {
        val += array.charAt(i)
    }
    return val;
}
function recorreString2(index, array) {

    let val = ""
    for (var i = index - 1; i >= 0; i--) {
        val += array.charAt(i);
    }



    return val.split("").reverse().join("");
}

const ShowTabla = (data, container) => {
  
    var mytd=""

    container.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        var myTr = document.createElement("tr")
        for (let a in data[i]) {
            if (!a.includes('fk_id_mesa')) {
                mytd = document.createElement("td")
                //mytd.setAttribute('data-th', a)
    
                mytd.innerHTML = data[i][a];
                
            }




            if (a.includes('fk_id_mesa')) {
                fetch(variable+"/api/mesa" + "/" + data[i][a], {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }).then(response => response.json())
                    .then(json => {
                        var cod = document.createElement("td")
                        var acc = document.createElement("span")

                        acc.innerHTML = json[0].codigo

                        cod.appendChild(acc)
                        myTr.appendChild(cod)

                    });
            }


            if (a.includes('cantidad')) {

                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""
                mya.innerHTML = recorreString(data[i][a].indexOf(","), data[i][a])
                mytd.appendChild(mya)

            }
            if (a.includes('total')) {

                mytd.innerHTML = "";
                var mya = document.createElement("span")
                mya.innerHTML = ""

                mya.innerHTML = recorreString2(data[i][a].lastIndexOf(","), data[i][a])
                mytd.appendChild(mya)

            }
            myTr.appendChild(mytd)


        }

        var actionTd = document.createElement("td")
        actionTd.setAttribute('class', 'operacion')

        var pagobtn = document.createElement("button")
        var btn2 = document.createElement("i")
        btn2.setAttribute("class", "fa fa-money")
        pagobtn.setAttribute("class", "btn btn-sm btn-success")
        pagobtn.appendChild(btn2)
        pagobtn.setAttribute("onclick", "pagoPedido(" + i + ")")

        actionTd.appendChild(pagobtn)
        myTr.appendChild(actionTd)
        document.getElementById("form-list-client-body").appendChild(myTr)

    }

}
async function fetchText() {
    let response = await fetch(urldetalle_pedido);
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
    validarRuta2(ruta,user)
    validarRuta4(ruta,user)
    fetchText().then(res => {
        detalle_pedidos.push(...res);
        ShowTabla(detalle_pedidos, tabla)
    })


})

//ACTUALIZA EL ESTADO DE LA MESA A S
function CambiarEstadomesa_s(id) {

    fetch(variable+"/api/mesaestados2" + "/" + id, {
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



//ACTUALIZA ESTADO PEDIDO A TERMINADO
function pagoPedido(i) {
    CambiarEstadomesa_s(detalle_pedidos[i].fk_id_mesa)
    myIndexid = detalle_pedidos[i].fk_id_pedido;
    myIndex = i;
    fetch(urldetalle_pedido + "/" + myIndexid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
        .then(json => {
            console.log(json)
            swal("Pedido pagado exitosamente!");


        });
        //location.reload(true)
        
}

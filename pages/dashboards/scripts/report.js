function sumar(){
    var total_col1 = 0;
    //Recorro todos los tr ubicados en el tbody
$('#ctable tbody').find('tr').each(function (i, el) {
           
    //Voy incrementando las variables segun la fila ( .eq(0) representa la fila 1 )  
    if(!isHidden(this)){
        total_col1 += parseFloat($(this).find('td').eq(2).text());
    }   
    
    
            
});
//Muestro el resultado en el th correspondiente a la columna
document.getElementById("idtotal").textContent=total_col1

}
function isHidden(el) {
    var style = window.getComputedStyle(el);
    return ((style.display === 'none') || (style.visibility === 'hidden'))
}
let tabla = document.getElementById('form-list-client-body');

const urldetalle_pedido = "https://pedidoambrosia.herokuapp.com/api/detalle_pedidopago2";
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
                fetch("https://pedidoambrosia.herokuapp.com/api/mesa" + "/" + data[i][a], {
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
    fetchText().then(res => {
        detalle_pedidos.push(...res);
        ShowTabla(detalle_pedidos, tabla)
    })


})







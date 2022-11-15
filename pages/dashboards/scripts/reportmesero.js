
let tablita = document.getElementById('form-list-client-body2');

const urlConsultameseros = variable+"/api/meseros";
var myIndexid;
var myIndex;

var Consultameseros = [];


const ShowTablita = (data, container) => {
  
    var mytd=""

    container.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        var myTr = document.createElement("tr")
        for (let a in data[i]) {

            mytd = document.createElement("td")
            //mytd.setAttribute('data-th', a)

            mytd.innerHTML = data[i][a];
            if (a.includes('fecha')) {
                mytd.innerHTML = data[i][a].toString().split("T")[0];
            }
            myTr.appendChild(mytd)


        }


        document.getElementById("form-list-client-body2").appendChild(myTr)

    }

}
async function fetchTextmesero() {
    var id=localStorage.getItem("id")
    let response = await fetch(urlConsultameseros+"/"+id);
    let data;
    const { status, statusText } = response;
    if (response.status === 200) {
        data = response.json();
        return data;
    }

}



document.addEventListener('DOMContentLoaded', async () => {
    fetchTextmesero().then(res => {
        Consultameseros.push(...res);
        ShowTablita(Consultameseros, tablita)
    })


})
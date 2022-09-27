function expirecajero() {
    const w=new Date()
    if (w.getTime()>localStorage.getItem("time")) {
        localStorage.removeItem("id")
        localStorage.removeItem("sesion")
        localStorage.removeItem("time")      
    }else if(w.getTime()<localStorage.getItem("time")){
        localStorage.setItem("time",parseInt(localStorage.getItem("time"))+60000)

    }       
}
function validarRuta2(ruta,user) {
    expirecajero()
    if (ruta == "pagos2") {
        if (user != "Cajero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
}
function validarDashcajero(user) {
    expirecajero()
    if (user != "Cajero") {
        if (!user) {
            location.href = "../index.html"
        }
        location.href = "../dashboards/" + user.toLowerCase() + ".html"
    }
    
}
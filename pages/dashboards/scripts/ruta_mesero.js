function expiremesero() {
    const w=new Date()
    if (w.getTime()>localStorage.getItem("time")) {
        localStorage.removeItem("id")
        localStorage.removeItem("sesion")
        localStorage.removeItem("time")      
    }else if(w.getTime()<localStorage.getItem("time")){
        localStorage.setItem("time",parseInt(localStorage.getItem("time"))+60000)

    }       
}
function validarDashmesero(user) {
    expiremesero();
    if (user != "Mesero") {
        if (!user) {
            location.href = "../index.html"
        }
        location.href = "../dashboards/" + user.toLowerCase() + ".html"
    }

    
}
function validarRuta4(ruta, user) {
    expiremesero();
    if (ruta == "crud_mesa2") {
        if (user != "Mesero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "pedido2") {
        if (user != "Mesero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "detalle_pedido2") {
        if (user != "Mesero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "pagos3") {
        if (user != "Mesero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
}
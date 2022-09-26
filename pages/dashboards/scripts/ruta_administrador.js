function expireadmin() {
    const w=new Date()
    if (w.getTime()>localStorage.getItem("time")) {
        localStorage.removeItem("id")
        localStorage.removeItem("sesion")
        localStorage.removeItem("time")      
    }else if(w.getTime()<localStorage.getItem("time")){
        localStorage.setItem("time",localStorage.getItem("time")+60000)

    }    
}
function validarDashadmin(user) {
    expireadmin()
    if (user != "Administrador") {
        if (!user) {
            location.href = "../index.html"
        }
        location.href = "../dashboards/" + user.toLowerCase() + ".html"
    }
    
}
function validarRuta(ruta,user) {
    expireadmin()
    if (ruta == "crud_empleado") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_cliente") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_horario") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_categoria2") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_plato") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_ingrediente") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_receta") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "ingredientesDeReceta") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_mesa") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "pedido") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "detalle_pedido") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "pagos") {
        if (user != "Administrador") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    
}

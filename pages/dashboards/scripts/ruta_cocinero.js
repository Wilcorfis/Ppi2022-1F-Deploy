function expirecocinero() {
    const w=new Date()
    if (w.getTime()>localStorage.getItem("time")) {
        localStorage.removeItem("id")
        localStorage.removeItem("sesion")
        localStorage.removeItem("time")      
    }else if(w.getTime()<localStorage.getItem("time")){
        localStorage.setItem("time",parseInt(localStorage.getItem("time"))+60000)

    }       
}
function validarDashcocinero(user) {
    expirecocinero()
    if (user != "Cocinero") {
        if (!user) {
            location.href = "../index.html"
        }
        location.href = "../dashboards/" + user.toLowerCase() + ".html"
    }
    
}
function validarRuta1(ruta,user) {
    expirecocinero()
    if (ruta == "crud_categoria") {
        if (user != "Cocinero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_plato2") {
        if (user != "Cocinero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_ingrediente2") {
        if (user != "Cocinero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "crud_receta2") {
        if (user != "Cocinero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
    if (ruta == "ingredientesDeReceta2") {
        if (user != "Cocinero") {
            if (!user) {
                location.href = "../pages/index.html"
            }
            location.href = "../pages/dashboards/" + user.toLowerCase() + ".html"
        }
    }
}
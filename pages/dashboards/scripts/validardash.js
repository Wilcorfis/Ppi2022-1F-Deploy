document.addEventListener("DOMContentLoaded", function () {

    if (!localStorage.getItem("sesion")) {
        this.location.href="../index.html"
    }
    if (localStorage.getItem("sesion")[0].tipo_empleado=="Administrador") {
        //alert("error")
        this.location.href="./admin.html"
    }
});
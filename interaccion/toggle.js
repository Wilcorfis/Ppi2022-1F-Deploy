


function toggle() {


    document.getElementById("muestradiv").style.display = "none";
    document.getElementById("ctable").style.display = "none";
    document.getElementById("pagination").style.display = "none";
    document.getElementById("ctmain").style.display = "block";
    document.getElementById("maxRows").style.display = "none";
    document.getElementById("op1").style.display = "none";
    document.getElementById("op2").style.display = "none";


}
function toggle2() {
    document.getElementById("muestradiv").style.display="inline-block";
    document.getElementById("pagination").style.display = "block";
    document.getElementById("maxRows").style.display = "inline-block";
    document.querySelector("#ctable").setAttribute("style", "display:block")
    document.querySelector("#ctable").setAttribute("style", "table-layout: fixed")

    document.getElementById("ctmain").style.display = "none";
    document.getElementById("op1").style.display = "inline-block";
    document.getElementById("op2").style.display = "inline-block";


    borrarCampos();
    cancelSeleccion();

}
function toggle3() {
    $("#ctdtable").animate(
        {
            scrollLeft: "-=300px"
        },
        "slow"
    );

}
function toggle4() {


    $("#ctdtable").animate(
        {
            scrollLeft: "+=300px"
        },
        "slow"
    );

}
function toggle8() {
    $("#ctdtable2").animate(
        {
            scrollLeft: "-=300px"
        },
        "slow"
    );

}
function toggle9() {


    $("#ctdtable2").animate(
        {
            scrollLeft: "+=300px"
        },
        "slow"
    );

}
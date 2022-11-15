import { variable } from "../variables";
const u = variable+"/api/empleados";
function get() {
    
    if (localStorage.getItem("id")) {
        fetch(u + "/" + parseInt(localStorage.getItem("id")), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(response => response.json())
    
            // Displaying results to console
            .then(json => {
                
                document.getElementById("log").innerText=json[0].primer_nombre+" "+json[0].primer_apellido
            });
    }
    
}
get()
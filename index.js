function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var departamento = document.getElementById("Input4").value;
   

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var empleados = {
            id, //matricula:id
            nombre,
            correo,
            departamento,
           

        }
//console.log(alumno);
var lista_empleados=JSON.parse(localStorage.getItem("Negocios"));

if(lista_empleados==null)
{ 
    var lista_empleados = [];
}

const existe = lista_empleados.some(element=>element.id==id); 

if(!existe||document.getElementById("Input1").disabled==true)
{
    
    if(document.getElementById("Input1").disabled==true)
    {
        var lista_empleados=lista_empleados.filter(empleados=>empleados.id!=id);

    }
        
    lista_empleados.push(empleados);
    var temporal = lista_empleados.sort((a,b) => a.id-b.id);
    localStorage.setItem("Negocios", JSON.stringify(temporal));
    
    read();
    resetFields();
    swal("Listo!", "Agregado correctamente", "success");

}
else
{
    swal("Error", "Ya existe ese id de empleado","warning");
}

} 
else 
{
swal("Error", "Llena todos los campos","warning");
}

document.getElementById("Input1").disabled = false;

}

function read(){
document.getElementById("Table1").innerHTML='';


const lista_empleados = JSON.parse(localStorage.getItem("Negocios"));


if(lista_empleados)
{
lista_empleados.forEach((empleados)=>printRow(empleados));
}

}

function printRow(empleados){
    
    if(empleados!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
       
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = empleados.id;
        cell2.innerHTML = empleados.nombre; 
        cell3.innerHTML = empleados.correo;
        cell4.innerHTML = empleados.departamento; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${empleados.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+empleados.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_empleados = JSON.parse(localStorage.getItem("Negocios"));
    var temporal=lista_empleados.filter(empleados=>empleados.id!=id);
    localStorage.setItem("Negocios", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Negocios");
    }
  
    read();
}

function seekR(id){
    const lista_empleados = JSON.parse(localStorage.getItem("Negocios"));
    var empleados=lista_empleados.filter(empleados=>empleados.id==id);
    //console.log(alumno[0]);
    updateR(empleados[0]);
}

function updateR(empleados){
    if(empleados!=null)
    {
        document.getElementById("Input1").value=empleados.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=empleados.nombre;
        document.getElementById("Input3").value=empleados.correo;
        document.getElementById("Input4").value=empleados.departamento;
       
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Negocios");
    ref.orderByChild("departamento").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}

/**function readQ(){
    document.getElementById("Table2").innerHTML='';
    var e = document.getElementById("Input9").value;
    var ref = firebase.database().ref("Negocios");
    ref.orderByChild("sueldo").equalTo(e).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });
}
*/
function printRowQ(empleados){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
 
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = empleados.id;
    cell2.innerHTML = empleados.nombre; 
    cell3.innerHTML = empleados.correo;
    cell4.innerHTML = empleados.departamento; 
   
}


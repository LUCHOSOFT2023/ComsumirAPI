let url ='https://luchosoftapi.onrender.com/api/produccion'

const listarOrdenProduccion =async (busqueda)=>{
    let respuesta = ''
    let body = document.getElementById("contenidoProduccion")

    let urlAPI= url;

    if (busqueda){
        alert(busqueda)
        urlAPI+= `?id_produccion=${encodeURIComponent(busqueda)}`;
    }

    //Al desplegar en el servidor colocar la api del servidor 

    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: {"content-type": "application/json; charset-UTF-8"}
    })
        .then((resp)=>resp.json())//obtener la respuesta y convertirla a json
        .then(function(data){
            let listaproduccion = data.produccion//captura el array devuelto por la api

            //limpia la tabla antes de agregar datos nuevos

            table.clear().draw();

            console.log(listaproduccion)
            datos =
            listaproduccion.map(function (produccion) {//Recorrer el array
                respuesta += `<tr><td>${produccion.id_produccion}</td>` +
                    `<td>${produccion.descripcion_produccion}</td>` +
                    `<td>${produccion.fecha_produccion}</td>` +
                    `<td>${produccion.insumo_produccion}</td>` +
                    `<td>${produccion.id_empleado}</td>` +
                    `</tr>`
            })
        // Agrega los datos a la tabla y redibuja la tabla
        table.rows.add($(respuesta)).draw();


        })
}

const registrarOrden = async () => {
    let id= document.getElementById('IdOrdenProd').value
    let descripcion=document.getElementById('DescOrden').value
    let fecha = document.getElementById('FechaOrden').value
    let insumo = document.getElementById('insumo').value
    let idempleado = document.getElementById('id_empleado').value

    let orden = {
        id_produccion: id,
        descripcion_produccion: descripcion,
        fecha_produccion: fecha,
        insumo_produccion: insumo,
        id_empleado:idempleado
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(orden),//Convertir el objeto _usuario  a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if (json.msg) {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'OrdenProduccion.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
}

function Registrar(){
    var fecha=document.getElementById("FechaOrden").value
    var idempleado = document.getElementById("id_empleado").value
    var insumo= document.getElementById("insumo").value
    var id=document.getElementById("IdOrdenProd").value
    var descripcion= document.getElementById('DescOrden').value
    if(id==0){
      Swal.fire({
        title:'Error',
        text:'Aun no se agregado una Indentificación',
        confirmButtonColor: '#722F37',
        icon: 'error'
      })
    }
    else if (fecha==""){
      Swal.fire({
        title:'Error',
        text:'Aun no se agregado una fecha',
        confirmButtonColor: '#722F37',
        icon: 'error'
      })
    }else if( idempleado==""||insumo==""||descripcion==""){
      Swal.fire({
        title: 'Sin elección',
        text: "Necesitas agregar una cantidad y/o seleccionar un insumo",
        confirmButtonColor: '#722F37',
        icon: 'warning'
      })
    }else{
        registrarOrden()
    }
}
// Calcula el ancho de la barra de desplazamiento y ajusta los estilos
window.addEventListener('DOMContentLoaded', () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.textContent = `
        .scrollbar::-webkit-scrollbar {
            width: ${scrollbarWidth}px;
        }
    `;
    document.head.appendChild(scrollbarStyle);
});
// imprimir

function imprimirTabla() {
    window.print();
}
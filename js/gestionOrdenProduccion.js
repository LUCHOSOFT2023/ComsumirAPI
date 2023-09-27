let url ='https://luchosoftapi.onrender.com/api/produccion'

const listarOrdenProduccion =async (busqueda)=>{
    let respuesta = ''
    let body = document.getElementById("contenidoProduccion")

    let urlAPI= url;

    if (busqueda){
        alert(busqueda)
        urlAPI+= `id_produccion=${encodeURIComponent(busqueda)}`;
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
function insertarDatosEnTablaDestino(dataToInsert) {
    const tablaDestino = document.getElementById('insumosAgregados');
    const tbody = tablaDestino.querySelector('tbody');

    const newRow = document.createElement('tr');
    
    // Recorre los datos a insertar y crea celdas para cada uno
    dataToInsert.forEach(function(data) {
        const cell = document.createElement('td');
        cell.textContent = data;
        newRow.appendChild(cell);
    });

    // Agrega la fila a la tabla de destino
    tbody.appendChild(newRow);

    
}

// Luego, dentro de tu evento de clic, puedes llamar a esta función para insertar los datos
document.getElementById('insertBtn').addEventListener('click', function() {
    const dataTable = document.getElementById('dataTable');
    const rows = dataTable.getElementsByTagName('tr');
    let seleccionada = false;

    for (let i = 1; i < rows.length; i++) {
        const checkbox = rows[i].querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            seleccionada = true;
            const cells = rows[i].getElementsByTagName('td');
            const dataToInsert = [];
            for (let j = 1; j < cells.length; j++) {
                dataToInsert.push(cells[j].textContent);
            }

            // Llama a la función para insertar los datos en la tabla de destino
            insertarDatosEnTablaDestino(dataToInsert);
        }
    }

    document.getElementById('popup').style.display = 'none';
});

const registrarOrden = async () => {
    let id= document.getElementById('IdOrdenProd').value
    let descripcion=document.getElementById('DescOrden').value
    let fecha = document.getElementById('FechaOrden').value
    let insumo= "No disponible"
    let empleado=0

    let orden = {
        id_produccion: id,
        descripcion_produccion: descripcion,
        fecha_produccion: fecha,
        insumo_produccion: insumo,
        id_empleado:empleado
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
    var id=document.getElementById("IdOrdenProd").value
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
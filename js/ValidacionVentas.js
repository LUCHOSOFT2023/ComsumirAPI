url='https://luchosoftapi.onrender.com/api/venta'

document.addEventListener("DOMContentLoaded", function() {
  const fechaInput = document.getElementById("FechaVenta");
  const fechaActual = new Date().toISOString().split("T")[0];
  fechaInput.min = fechaActual;
});

const listarVentas = async () => {
  let respuesta = ''
  let body = document.getElementById('contenidoventas')

  // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
  let urlAPI = url;
  

  //url: Es la url de la api.
  //Al deslpegarla en el servidor colocar la api del servidor
  fetch(urlAPI, {
      method: 'GET',
      mode: 'cors',
      headers: { "Content-type": "application/json; charset=UTF-8" }
  })
      .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
      .then(function (data) {
          let listaVentas = data.venta //Capturar el array devuelto por la api

          // Limpia la tabla antes de agregar datos nuevos
          table.clear().draw();

          console.log(listaVentas)
          datos =
              listaVentas.map(function (venta) {//Recorrer el array
                  let estado = ""
                  if (venta.estado_venta == false) {
                      estado = "fas fa-toggle-off iconos toggle-icon gris"
                  } else {
                      estado = "fas fa-toggle-on iconos toggle-icon"
                  }
                  let estado_nuevo;
                  if (venta.estado_venta == true) {
                      estado_nuevo = false;
                  } else {
                      estado_nuevo = true;
                  }
                  respuesta += `<tr><td>${venta.id_venta}</td>` +
                      `<td>${venta.descripcion_venta}</td>` +
                      `<td>${venta.precio_venta}</td>` +
                      `<td>${venta.fecha_venta}</td>` +
                      `<td>${venta.id_pedido}</td>` +
                      `<td>
                          <i onclick="cambiarEstadoVenta('${venta.id_venta}', '${estado_nuevo}')" class="${estado}"></i>

                      </td>`+
                      `</tr>`
              })
          // Agrega los datos a la tabla y redibuja la tabla
          table.rows.add($(respuesta)).draw();
      })
}

const cambiarEstadoVenta = async (id_venta, estado_nuevo) => {

  try {

      let venta = {
        id_venta: id_venta,
        estado_venta: estado_nuevo
      }

      const response = await fetch(url, {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(venta),
          headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      if (response.ok) {
          const json = await response.json();
          Swal.fire({
              title: json.msg,
              icon: 'success',
              showCancelButton: false, // Evita que aparezca el botón "Cancelar"
              confirmButtonColor: '#722F37',
              confirmButtonText: 'OK',
          }).then((result) => {
              if (result.isConfirmed) {
                  // El usuario hizo clic en "OK"
                  window.location.href = 'Ventas.html'; // Redireccionar después del clic en OK
              }
          });
      } else {
          alert("Error al cambiar el estado de la venta.");
      }
  } catch (error) {
      console.error("Error de red:", error);
  }
}

const registrarVentas = async () => {
  let id_venta= document.getElementById('IdVenta').value
  let descripcion= document.getElementById('Descripcion').value
  let fecha=document.getElementById('FechaVenta').value
  let precio=document.getElementById('precio').value
  let pedido=0

  let venta = {
    id_venta: id_venta,
    descripcion_venta: descripcion,
    fecha_venta: fecha,
    precio_venta: precio,
    id_pedido: pedido
  }

  fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(venta),//Convertir el objeto _usuario  a un JSON
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
                  confirmButtonColor: '#722F37',
                  confirmButtonText: 'OK',
              }).then((result) => {
                  if (result.isConfirmed) {
                      // El usuario hizo clic en "OK"
                      window.location.href = 'Ventas.html'; // Redireccionar después del clic en OK
                  }
              });
          }
      })
}
const CancelarV=()=>{
  Swal.fire({
    title: 'Salir sin guardar',
    text: "¿Quieres cancelar el registro?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#722F37',
    cancelButtonColor: '#E12424',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      closePopup();
    }
  })
}

const Agregar=()=>{
  var fecha=document.getElementById("FechaVenta").value
  var id=document.getElementById("IdVenta").value
  const rows = dataTable.getElementsByTagName('tr');
  let seleccionada=false
  for (let i = 1; i < rows.length; i++) {
      const checkbox = rows[i].querySelector('input[type="radio"]');
      if(id==0){
        Swal.fire({
          title:'Error',
          text:'Aun no se agregado una identificación',
          confirmButtonColor: '#722F37',
          icon: 'error'
        })
      }
      else if(fecha==""){
          Swal.fire({
              title:'Error',
              text:'Aun no se agregado una fecha',
              confirmButtonColor: '#722F37',
              icon: 'error'
            })
      }else if(checkbox.checked){
          seleccionada=true
            registrarVentas()
      }else if(!seleccionada){
          Swal.fire({
              title: 'Sin elección',
              text: "Necesitas agregar un pedido",
              confirmButtonColor: '#722F37',
              icon: 'warning'
          })
      }
  }

}

function Cancelar(){
  Swal.fire({
      title: 'Salir sin guardar',
      text: "¿Quieres cancelar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#722F37',
      cancelButtonColor: '#E12424',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
          window.location.href = 'Ventas.html';
      }
    })
}



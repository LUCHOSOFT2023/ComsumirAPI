console.log("Archivo vinculado")
document.addEventListener("DOMContentLoaded", function() {
    const fechaInput = document.getElementById("FechaOrden");
    const fechaActual = new Date().toISOString().split("T")[0];
    fechaInput.min = fechaActual;
});
/*VENTANA EMERGENTE*/
document.getElementById('openPopupBtn').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'block';
});

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

document.getElementById('insertBtn').addEventListener('click', function() {
  const dataTable = document.getElementById('dataTable');
  const rows = dataTable.getElementsByTagName('tr');
  let seleccionada=false

  for (let i = 1; i < rows.length; i++) {
      const checkbox = rows[i].querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
          seleccionada=true
          const cells = rows[i].getElementsByTagName('td');
          const dataToInsert = [];
          for (let j = 1; j < cells.length; j++) {
              dataToInsert.push(cells[j].textContent);
          }

          // Aquí podrías realizar la inserción de datos en otra tabla o en cualquier otro lugar
          console.log('Insertar:', dataToInsert);
          const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: 'Agregado exitosamente'
          })
      }else if(!seleccionada){
          Swal.fire({
              title: 'No has seleccionado un insumo',
              icon: 'error',
              confirmButtonColor: '#722F37'
          })
      }
  }

  document.getElementById('popup').style.display = 'none';
});

//barra de navegacion
document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const dataTable = document.getElementById('dataTable');
  const rows = dataTable.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      let rowMatch = false;
      for (let j = 1; j < cells.length; j++) {
          if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
              rowMatch = true;
              break;
          }
      }
      rows[i].style.display = rowMatch ? 'table-row' : 'none';
  }
});
/**
 * 
 */
const Agregar=()=>{
  var cantidad = document.getElementById("cantidad").value
  var eleccion= document.getElementById("eleccion").value

  if(cantidad =="" || eleccion==""){
    Swal.fire({
      title: 'Sin elección',
      text: "Necesitas agregar una cantidad y seleccionar un insumo",
      confirmButtonColor: '#722F37',
      icon: 'warning'
    })
  }else if(cantidad==0){
    Swal.fire({
      title: 'Error',
      text: "Necesitas agregar una cantidad",
      confirmButtonColor: '#722F37',
      icon: 'warning'
    })
  }
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

function Registrar(){
  var fecha=document.getElementById("FechaOrden").value
  var cantidad = document.getElementById("cantidad").value
  var eleccion= document.getElementById("eleccion").value
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
  }else if( cantidad =="" || eleccion==""){
    Swal.fire({
      title: 'Sin elección',
      text: "Necesitas agregar una cantidad y/o seleccionar un insumo",
      confirmButtonColor: '#722F37',
      icon: 'warning'
    })
  }
  else{
    Swal.fire({
      icon: 'success',
      title: 'Guardado exitosamente',
      confirmButtonColor: '#722F37',
    }).then(() => {
      // Redireccionar a una ruta específica
      window.location.href = 'OrdenProduccion.html';
    });
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
          window.location.href = 'OrdenProduccion.html';
      }
    })
}


  
  
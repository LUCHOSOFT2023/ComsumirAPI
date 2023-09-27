url = 'https://luchosoftapi.onrender.com/api/insumos'


function Cancelar() {
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
            window.location.href = 'CategoriaInsumos.html';
        }
    })
}

function Agregar() {
    let id= document.getElementById('Idcategoria').value
    let nombre=document.getElementById('ActualizarCategoria').value
    
    if(id==0){
        Swal.fire({
            title: 'Error',
            text: 'Aun no se agregado una identificación',
            confirmButtonColor: '#722F37',
            icon: 'error'
        })
    } else if (nombre == "") {
        Swal.fire({
            title: 'Error',
            text: 'Aun no se agregado una categoría',
            confirmButtonColor: '#722F37',
            icon: 'error'
        })
    }else{
        actualizarCategoria();
    }
}

const listarCategoria = async () => {
    let respuesta = ''
    let body = document.getElementById('contenidoCategoria')

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
            let listaCategoria = data.insumo //Capturar el array devuelto por la api

            // Limpia la tabla antes de agregar datos nuevos
            table.clear().draw();

            console.log(listaCategoria)
            datos =
                listaCategoria.map(function (insumos) {//Recorrer el array
                    let estado = ""
                    if (insumos.estado_categoriaInsumo == false) {
                        estado = "fas fa-toggle-off iconos toggle-icon gris"
                    } else {
                        estado = "fas fa-toggle-on iconos toggle-icon"
                    }
                    let estado_nuevo;
                    if (insumos.estado_categoriaInsumo == true) {
                        estado_nuevo = false;
                    } else {
                        estado_nuevo = true;
                    }
                    respuesta += `<tr><td>${insumos.id_categoriaInsumo}</td>` +
                        `<td>${insumos.nombre_categoriaInsumo}</td>` +
                        `<td>
                            <i onclick="window.location.href='ActualizarCategoriaInsumos.html?id_categoriaInsumo=${insumos.id_categoriaInsumo}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
                            <i onclick="cambiarEstadoCategoria('${insumos.id_categoriaInsumo}', '${estado_nuevo}')" class="${estado}"></i>
                        </td>`+
                        `</tr>`
                })
            // Agrega los datos a la tabla y redibuja la tabla
            table.rows.add($(respuesta)).draw();
        })
}

const cambiarEstadoCategoria = async (id_categoriaInsumo, estado_nuevo) => {

    try {

        let insumos = {
            id_categoriaInsumo: id_categoriaInsumo,
            estado_categoriaInsumo: estado_nuevo
        }

        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(insumos),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        if (response.ok) {
            const json = await response.json();
            Swal.fire({
                title: json.msg,
                icon: 'success',
                showCancelButton: false, // Evita que aparezca el botón "Cancelar",
                confirmButtonColor: '#722F37',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "OK"
                    window.location.href = 'CategoriaInsumos.html'; // Redireccionar después del clic en OK
                }
            });
        } else {
            alert("Error al cambiar el estado de la categoría de insumos.");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
}



const registrarcategoriaInsumo = async () => {
    let idcategoria = document.getElementById('IdCategoria').value
    let nombre_categoria = document.getElementById('NombreCategoria').value

    let insumos = {
        id_categoriaInsumo: idcategoria,
        nombre_categoriaInsumo: nombre_categoria
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(insumos),//Convertir el objeto _usuario  a un JSON
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
                        window.location.href = 'CategoriaInsumos.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
}

function Agregar1() {
    var nombre = document.getElementById("NombreCategoria").value
    var id = document.getElementById("IdCategoria").value
    if (id == 0) {
        Swal.fire({
            title: 'Error',
            text: 'Aun no se agregado una identificación',
            confirmButtonColor: '#722F37',
            icon: 'error'
        })
    } else if (nombre == "") {
        Swal.fire({
            title: 'Error',
            text: 'Aun no se agregado una categoría',
            confirmButtonColor: '#722F37',
            icon: 'error'
        })
    } else {
        // Todos los campos son válidos, llama a la función agregarCliente
        registrarcategoriaInsumo();
    }
}

function consultarCategoria(busqueda) {
    let urlAPI = url;
    if (busqueda) {
        urlAPI += `?id_categoriaInsumo=${encodeURIComponent(busqueda)}`;

    }
    fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json())
        .then(function (data) {
            let insumos = data.insumo[0];

            document.getElementById('Idcategoria').value = insumos.id_categoriaInsumo;
            document.getElementById('ActualizarCategoria').value = insumos.nombre_categoriaInsumo;
        })
        .catch(function (error) {
            console.error('Error al obtener los detalle de la categoría', error)
        })
}


const actualizarCategoria = async () => {
    let id = document.getElementById('Idcategoria').value
    let nombre = document.getElementById('ActualizarCategoria').value

    let insumos = {
        id_categoriaInsumo: id,
        nombre_categoriaInsumo: nombre
    }

    fetch(url, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(insumos),//Convertir el objeto _usuario  a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            Swal.fire({
                title: json.msg,
                icon: 'success',
                showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                confirmButtonColor: '#722F37',
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    // El usuario hizo clic en "OK"
                    window.location.href = 'CategoriaInsumos.html'; // Redireccionar después del clic en OK
                }
            });
        })
}

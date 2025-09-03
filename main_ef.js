// Captura la información del nombre del implemento en el formulario
function activarNombre() {
    const implemento = document.querySelector('#implemento_name');
    return implemento.value;
}
// Captura la información del nombre de la categoria en el formulario
function activarCategoria() {
    const categoria = document.querySelector('#categoria');
    return categoria.value;
}
// Captura la información del nombre del departamento en el formulario
function activarDepartamento() {
    const inventario = document.querySelector('#departamento');
    return inventario.value;
}
// Captura la información del nombre de la condición en el formulario
function activarCondicion() {
    const inventario = document.querySelector('#condicion');
    return inventario.value;
}
// Captura la información del nombre del propietario en el formulario
function activarPertenencia() {
    const inventario = document.querySelector('#pertenencia');
    return inventario.value;
}

function activarPropietario() {
    const inventario = document.querySelector('#propietario');
    return inventario.value;
}


// Captura la información del nombre del valor en el formulario
function activarValor() {
    const inventario = document.querySelector('#valor');
    if (Number(inventario.value) < 10000) {
        alert("El valor debe ser mayor a 10000")
        inventario.reset();
        return;
    }
    return inventario.value;
}
// Captura la información del nombre de la fecha en el formulario
function activarFecha() {
    const inventario = document.querySelector('#fecha');
    return inventario.value;
}

function activarEstado(){
    const estado = document.querySelector('#estado');
    return estado.value;
    
}

//Inserta la información en la tabla del front
const tabla = document.querySelector('#tabla #tabla-body');

// Captura la información del formulario y la agrega a la tabla
const form = document.querySelector('#formulario');

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const id_implemento = await idImplementos();
    const nombre = activarNombre();
    const categoria = activarCategoria();
    const departamento = activarDepartamento();
    const condicion = activarCondicion();
    const pertenencia = activarPertenencia();
    const propietario = activarPropietario();
    const valor = activarValor();
    const fecha = activarFecha();
    const estado = activarEstado();

    const datos = {
        id_implemento,
        nombre,
        categoria,
        departamento,
        condicion,
        pertenencia,
        propietario,
        valor,
        fecha,
        estado
    };
    actualizarImplemento(datos)
    limpiarFormulario();
})

// Inserta en cada fila de la tabla los datos del formulario
function agregarFila(formulario) {
    const fila = tabla.insertRow();
    fila.insertCell().textContent = formulario.id_implemento;
    fila.insertCell().textContent = formulario.nombre;
    fila.insertCell().textContent = formulario.categoria;
    fila.insertCell().textContent = formulario.departamento;
    fila.insertCell().textContent = formulario.condicion;
    fila.insertCell().textContent = formulario.pertenencia;
    fila.insertCell().textContent = formulario.Propietario;
    fila.insertCell().textContent = formulario.valor;
    fila.insertCell().textContent = formulario.fecha;
    fila.insertCell().textContent = formulario.total;
    limpiarFormulario();
}


// Limpia el formulario después de agregar la fila o darle click en el botónde limpiar
function limpiarFormulario() {
    document.querySelector('#formulario').reset();
}

function enviarAlBackend(datos) {
    fetch('http://localhost:3000/api/inventario/implemento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(res => res.json())
        .then(data => {
            console.log('✔ Enviado al backend:', data);
            alert(data.mensaje);
        })
        .catch(error => {
            console.error('❌ Error al enviar al backend:', error);
            alert('Error al guardar en la base de datos');
        });
}



async function nombre(selectedValue = null) {
    const name = document.querySelector("#implemento_name");
    const categoria = document.querySelector("#categoria").value;
    const url = `http://localhost:3000/api/inventario/cat_implemento/${encodeURIComponent(categoria)}`;
    if(!categoria){
        name.innerHTML = "";
        return;
    }
    // Limpia las opciones previas
    name.innerHTML = "";
    try {
        const res = await fetch(url, { method: 'GET' });
        const lista_cat = await res.json();
        for (let implemento of lista_cat) {
            let nuevaOpcion = document.createElement("option");
            nuevaOpcion.value = implemento.nom_implemento;
            nuevaOpcion.text = implemento.nom_implemento;
            name.add(nuevaOpcion);
        }
        // Si se pasa un valor seleccionado, asígnalo
        if (selectedValue) {
            name.value = selectedValue;
        }
    } catch (error) {
        console.error("¡Error!", error);
    }
}


function recorrerDepartamentos() {
const select = document.querySelector("#departamento");
const url = 'http://localhost:3000/api/inventario/departamento';
    fetch(url, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(lista_de_departamentos => {
            for (let departamento of lista_de_departamentos) {
                let nuevaOpcion = document.createElement("option");
                nuevaOpcion.value = departamento.id;
                nuevaOpcion.text = departamento.nombre;
                select.add(nuevaOpcion);
            }
        })
        .catch(function (error) {
            console.error("¡Error!", error);
        });
}

function recorrerImplementos(){
const select = document.querySelector("#categoria");
const url = 'http://localhost:3000/api/inventario/cat_implemento';
    fetch(url,{
        method: 'GET',
    })
        .then(res => res.json())
        .then(lista_cat =>{
            for (let implemento of lista_cat){
                let nuevaOpcion = document.createElement("option");
                nuevaOpcion.value = implemento.id;
                nuevaOpcion.text = implemento.nombre;
                select.add(nuevaOpcion);
            }
        })
        .catch(function (error){
            console.error("¡Error!", error);
        })
}

function traerInformacion(){
    return new Promise((resolve, reject) => {
        const id_implemento = sessionStorage.getItem('id_implemento');
        const url = 'http://localhost:3000/api/inventario/implemento/' + id_implemento;
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(implemento =>{
                resolve(implemento);
            })
            .catch(function (error) {
                console.error("¡Error!", error);
                reject(error);
            }
        );
    })
    
}




function actualizarImplemento(datos){
    fetch(`http://localhost:3000/api/inventario/implemento/${datos.id_implemento}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(res => res.json())
        .then(data => {
            console.log('✔ Actualizado Correctamente:', data);
            alert(data.mensaje);
        })
        .catch(error => {
            console.error('❌ Error al enviar al backend:', error);
            alert('Error al guardar en la base de datos');
        });
}
//Inserta la información en la tabla del front
const tabla = document.querySelector('#tabla #tabla-body');


function cargarImplementos() {
    fetch('http://localhost:3000/api/inventario/implemento')
        .then(response => response.json())
        .then(data => {
            const tabla = document.querySelector('#tabla-body');
            tabla.innerHTML = '';

            data.forEach(implemento => {
                const fila = tabla.insertRow();
                fila.insertCell().textContent = implemento.id_implemento;
                fila.insertCell().textContent = implemento.nombre;
                fila.insertCell().textContent = implemento.categoria;
                fila.insertCell().textContent = implemento.departamento;
                fila.insertCell().textContent = implemento.condicion;
                fila.insertCell().textContent = implemento.pertenencia;
                fila.insertCell().textContent = implemento.propietario;
                fila.insertCell().textContent = implemento.cantidad;
                fila.insertCell().textContent = Number(implemento.valor).toLocaleString('es-CO');
                const fecha = new Date(implemento.fecha);
                const fechaFormateada = fecha.toLocaleDateString('es-CO', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                fila.insertCell().textContent = fechaFormateada;
                fila.insertCell().textContent = implemento.estado;
                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.className = 'btn btn-warning btn-sm align-items-center';
                btnEditar.style = 'float: center;';
                btnEditar.dataset.id_implemento = implemento.id_implemento;
                btnEditar.onclick = (dataset) => {
                    const id_implemento = dataset.target.dataset.id_implemento;
                    console.log("imprimir valor", id_implemento);
                    sessionStorage.setItem('id_implemento', id_implemento);
                    window.location.href = `editar_frm.html`;
                };
                fila.insertCell().appendChild(btnEditar);
            });
        })
        .catch(error => {
            console.error('❌ Error al cargar implementos:', error);
        })
}
document.addEventListener('DOMContentLoaded', () => {
    cargarImplementos();
});

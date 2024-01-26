// variables Selectores querySelector
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// crear los años
const years = document.createElement('option');
const max = new Date().getFullYear();
const min = max - 10;


// este for recorre los años de adelante hacia atras por ejmplo 2024-2023-2022 por tal muestra 2024 de primero
for(let i = max; i >  min; i--) {
    const option =  document.createElement('option');
    option.value = i;
    option.innerText = i;
    document.querySelector('#year').appendChild(option); // Agrega las opciones de año al select
}

// Datos para la busqueda/filtro que este todos los datos en una sola variable
const datosBusqueda = {
    marca : '',
    year: '',
    minimo : '',
    maximo: '',
    puertas: '',
    transmision:'',
    color:''
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra todos los autos a cargar
});

// Event Listeners para el formulario
marca.addEventListener('input', e => {
    datosBusqueda.marca = e.target.value;

    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

year.addEventListener('input', e => {
    datosBusqueda.year = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

minimo.addEventListener('input', e => {
    datosBusqueda.minimo = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


maximo.addEventListener('input', e => {
    datosBusqueda.maximo = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


puertas.addEventListener('input', e => {
    datosBusqueda.puertas = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

transmision.addEventListener('input', e => {
    datosBusqueda.transmision = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

color.addEventListener('input', e => {
    datosBusqueda.color = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

function limpiarHTML() {
    // Leer el elemento Resultado
    const contenedor = document.querySelector('#resultado');

    // limpiar los resultados anteriores
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function mostrarAutos(autos){
    
    // Elimina el html previo
    limpiarHTML();

    // Leer el elemento Resultado
    const contenedor = document.querySelector('#resultado');

    // Construir el HTML de los autos
    autos.forEach(auto => {
        
      // Tambien podemos usar distructuring algo asi y no necesitamos colocar por ejemplo ${auto.marca} sino simplemente ${marca}
      const { marca, modelo, year, puertas, transmision, precio, color } = auto;

      const autoHTML = document.createElement("p");
      autoHTML.innerHTML = `
        <p>${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmisión: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}</p>

        
        <p>${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}</p>
        `;
      contenedor.appendChild(autoHTML);
    })
}
// este es el codigo que nos crea la alerta de no resultados
function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');

    //Crea un nuevo nodo de texto con el contenido "No hay Resultados". 
    //Este es un paso común para crear contenido de texto que se agregará a un elemento HTML.
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}

// esta funcion es para filtrar en base a la busqueda
function filtrarAuto() {

    // esta es una funcion de alto nivel, osea es una funcion que toma otra funcion
   const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

//    console.log(resultado);
   if(resultado.length){
        mostrarAutos(resultado);
   } else {
       noResultado();
   }
}


// Aplica los filtros para buscar por cada con una funcion
function filtrarMarca(auto) {

    //en esta parte tambien se puede crear el distroturing por ejemplo
   // const {marca} = auto;

    if(datosBusqueda.marca){
        //si hay un valor en la busqueda de marca entonces filtro los que tienen esa marca
        return auto.marca === datosBusqueda.marca;
    } 
    // si no pues me traigo todos de regreso
    return auto;
}


/** todo esto de aqui para abajo se conoce como programacion funcional */ 
/** Es escribir funciones que no modifican el arreglo original y son funciones que van realizando ciertas operaciones*/ 
function filtrarYear(auto) {
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    } 
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    } 
    return  auto;
}
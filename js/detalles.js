const query = window.location.search


//apartir de un string devuelva parametros del query
const parametros = new URLSearchParams(query)
console.log(parametros);

const id= parseInt(parametros.get("id"))
console.log(id);

const divDetalles = document.getElementById("detalles")
fetch(`http://localhost:1337/muebles/${id}`)
    .then(resultado=>resultado.json())
    .then(conversion=>{
        const nombre = document.createElement("h2")
        const descripcion = document.createElement("p")
        const imagen = document.createElement("img")

        imagen.src="http://localhost:1337"+conversion.imagen.url
        nombre.innerText = conversion.nombre
        descripcion.innerText = conversion.descripcion
        
        divDetalles.appendChild(imagen)
        divDetalles.appendChild(nombre)
        divDetalles.appendChild(descripcion)

})
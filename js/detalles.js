const query = window.location.search
console.log(query);


//apartir de un string devuelva parametros del query
const parametros = new URLSearchParams
console.log(parametros.get("id"));

const id= parametros.get("id")

const divDetalles = document.getElementById("detalles")
fetch("http://localhost:1337/muebles",id)
    .then(resultado=>resultado.json())
    .then(conversion=>{
        const h2 = document.createElement("h2")
        const p = document.createElement("p")

        h2.innerText = conversion.nombre
        p.innerText = conversion.descripcion
        
        divDetalles.appendChild(h2)
        divDetalles.appendChild(p)

})
const boton = document.getElementById("saludo")

if(localStorage.getItem("username")){
    const saludo = "Cerrar sesión"
    boton.innerText= saludo
    
    boton.onclick = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        window.location.href="/index/login.html"
    }
}

else{
    const saludo = "Iniciar sesión"
    boton.innerText = saludo
    boton.onclick = ()=>{
        window.location.href="/index/login.html"
    }

}

const query = window.location.search

//apartir de un string devuelva parametros del query
const parametros = new URLSearchParams(query)
console.log(parametros);

const id= parseInt(parametros.get("id"))
console.log(id);

const divDetalles = document.getElementById("detalles")
divDetalles.classList.add("container-detalles")
fetch(`http://localhost:1337/muebles/${id}`)
    .then(resultado=>resultado.json())
    .then(conversion=>{
        const detallesInfo = document.createElement("div")
        
        const imagen = document.createElement("img")
        const nombre = document.createElement("h2")
        const precio = document.createElement("h3")
        const descripcion = document.createElement("p")
        const btnAgregar = document.createElement("button")

        nombre.classList.add("contenedorInfo-nombre")
        detallesInfo.classList.add("container-detalles__info")
        precio.classList.add("contenedorInfo-precio")
        btnAgregar.classList.add("div-container__btn")
        
        imagen.src="http://localhost:1337"+conversion.imagen.url
        nombre.innerText = conversion.nombre
        precio.innerText = conversion.precio
        descripcion.innerText = conversion.descripcion
        btnAgregar.innerText = "Agregar a carrito"

        
        divDetalles.appendChild(imagen)
        detallesInfo.appendChild(nombre)
        detallesInfo.appendChild(precio)
        detallesInfo.appendChild(descripcion)
        detallesInfo.appendChild(btnAgregar)
        divDetalles.appendChild(detallesInfo)

        const token = localStorage.getItem("token")
        btnAgregar.onclick= ()=> {
            if(localStorage.getItem("username")){
                if(token){
                    const idCarrito = localStorage.getItem("idCarrito")
                    if(idCarrito){
                        fetch("http://localhost:1337/carritos/"+idCarrito,{
                            headers:{
                                "Authorization": `Bearer ${token}`,
                                "Content-Type":"application/json"
                            }
                        })
                        .then(res => res.json())
                        .then(carrito=>{
                            const idsProductos = carrito.muebles.map(mueble=>mueble.id)
                            idsProductos.push(conversion.id)
                            fetch("http://localhost:1337/carritos/"+idCarrito,{
                                method: "PUT",
                                headers:{
                                    "Authorization": `Bearer ${token}`,
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify({
                                    muebles:idsProductos
                                })
                            })
                            .then(res => res.json())
                            .then(carrito=>{
                                console.log("Mi carrito nuevo ",carrito);
                                alert("Se a agregado correctamnete su producto a carrito :)")
                            })
                    })
                }   
                else {
                    fetch("http://localhost:1337/carritos/",{
                            method: "POST",
                            headers:{
                                "Authorization": `Bearer ${token}`,
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                muebles:[conversion.id],
                                users_permissions_user:1,
                                cantidad:2
                            })
                        })
                        .then(res => res.json())
                        .then(carrito=>{
                            console.log("Mi carrito creado ",carrito);
                            localStorage.setItem("idCarrito",carrito.id)
                        })
                }
                }
            }
            else{
                alert("Para agregar a carrito debe de iniciar sesión")
            }
        }

})
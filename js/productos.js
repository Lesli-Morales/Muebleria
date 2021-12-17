const boton = document.getElementById("saludo")

if(localStorage.getItem("username")){
    const saludo = "Cerrar sesión"
    boton.innerText= saludo
   
    boton.onclick = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("idCarrito")
        window.location.href="/index/index.html"
    }
}else{
    const saludo = "Iniciar sesión"
    boton.innerText = saludo

    boton.onclick = ()=>{
        window.location.href="/index/login.html"
    }
}


fetch("http://localhost:1337/muebles")
.then(resultado=>resultado.json())
.then(conversion=>{
    const productos = document.getElementById("productos")
    
    
    conversion.forEach((producto)=>{
        const contenedor = document.createElement("div")
        contenedor.classList.add("productos-contenedor")

        const contenedorInfo = document.createElement("div")
        contenedorInfo.classList.add("productos-contenedorInfo")

        const link = document.createElement("a")
        link.classList.add("contenedorInfo-link")
        
        const precio = document.createElement("p")
        precio.classList.add("contenedorInfo-precio")

        const nombre = document.createElement("p")
        nombre.classList.add("contenedorInfo-nombre")
        
        nombre.innerText= producto.nombre
        precio.innerText= producto.precio

        link.innerText= "VER PRODUCTO"
        link.href="/index/detalles.html?id="+producto.id


        contenedor.appendChild(nombre)

        if(producto.imagen){
            const imagen = document.createElement("img")
            imagen.src = "http://localhost:1337"+producto.imagen.url
            contenedor.appendChild(imagen)   
            
            const nuevo = document.getElementById("section-nuevo__div")
            if(producto.id==="7"){
                const sillon = document.getElementById("div-container__img")
                sillon.appendChild(imagen)
            }

        }

        contenedorInfo.appendChild(precio)
        contenedorInfo.appendChild(link)
        contenedor.appendChild(contenedorInfo)
        productos.appendChild(contenedor)

    })
})
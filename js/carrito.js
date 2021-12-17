const boton = document.getElementById("saludo")

if(localStorage.getItem("username")){
    const saludo = "Cerrar sesión"
    boton.innerText= saludo
    
    boton.onclick = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        window.location.href="/index/index.html"
    }
}

else{
    alert("Para poder ver el carrito de compra debe de iniciar sesión")
    window.location.href = "/index/index.html"
}


const token = localStorage.getItem("token")
if(token){
    fetch("http://localhost:1337/users/me",{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data=>{
        console.log("Mis datos ",data);
        fetch("http://localhost:1337/carritos/"+data.carrito,{
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(carrito=>{
        console.log("Mi carrito enseña",carrito);
        const {muebles} = carrito

        const divCarrito = document.getElementById("container-carrito")
        const divTotal = document.getElementById("container-pago")
        const pago = document.createElement("label")
        pago.classList.add("carrito-precio")
        let  monto, total=0
        for(let x=0;x<=muebles.length;x++){
            const carrito = document.createElement("div")
            carrito.classList.add("container-carrito__div")
            const imagen = document.createElement("img")
            const nombre = document.createElement("p")
            const precio = document.createElement("p")
            precio.classList.add("carrito-precio")

            imagen.src=muebles[x].imagen.url
            nombre.innerText = muebles[x].nombre
            precio.innerText = muebles[x].precio
            
            monto = parseInt(muebles[x].precio)
            total += monto
            pago.innerText= total

            carrito.appendChild(imagen)
            carrito.appendChild(nombre)
            carrito.appendChild(precio)
            
            divTotal.appendChild(pago)
            
            divCarrito.appendChild(carrito)
            console.log("PAgo: ",[x]+" "+total);
        }
    })
    })
}
const form= document.getElementById("contenedor__form")
const aviso = document.getElementById("aviso")

    form.onsubmit = (event)=>{
        event.preventDefault()

        fetch("http://localhost:1337/auth/local",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                identifier:form.email.value,
                password:form.password.value
            })
        }).then(res=>res.json())

        .then(data=>{
            if(data.error){
                const p = document.createElement("p")
                p.innerText="Usuario y/o password incorrecto"
                aviso.appendChild(p)
            }else{
                localStorage.setItem("token",data.jwt)
                localStorage.setItem("username",data.user.username)
                if(data.user.carrito){
                    localStorage.setItem("idCarrito",data.user.carrito.id)
                }
                window.location.href="/index/index.html"

            }
        }).catch(error=> console.log("Error: ",error))
    }

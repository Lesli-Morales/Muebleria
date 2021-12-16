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
    alert("Para poder ver su usuario debe de iniciar sesión")
    window.location.href = "/index/index.html"
}





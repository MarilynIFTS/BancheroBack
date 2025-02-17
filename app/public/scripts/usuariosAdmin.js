document.addEventListener("DOMContentLoaded", async () =>{
    const res = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }, 
    })
    const usersData = await res.json();

    const table = document.querySelector(".table");
    usersData.forEach(user => {
        let divMensaje =`<div class="row-rv">
                    <img src="../../profilePics/${user.FotoPerfil}" alt="" class="user-photo">
                    <h4>${user.Nombre}</h4>
                    <h4>${user.Email}</h4>
                    <h4>${user.Telefono}</h4>
                </div>`
        table.innerHTML += divMensaje;
    });
})
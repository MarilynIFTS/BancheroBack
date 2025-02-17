let editingDishId = "";

document.addEventListener("DOMContentLoaded", async () =>{
    if(localStorage.getItem("admin")){
        const storedAdmin = localStorage.getItem("admin");
        console.log(storedAdmin)
            if(storedAdmin){
                const res = await fetch("http://localhost:3000/mensajes/Datos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },  
                })

                const mensajesData = await res.json();

                const table = document.querySelector(".table");
                mensajesData.forEach(mensaje => {
                    let divMensaje =`<div class="row-msjs" id="${mensaje.IDMensaje}">
                                <h4>${mensaje.Email}</h4>
                                <h4>${mensaje.Motivo}</h4>
                                <h4>${mensaje.Mensaje}</h4>
                                <div class="abm-container">
                                    <button class="btn-trash"><img src="imgs/icon-trash.svg" alt="trash icon"></button>
                                </div>
                            </div>`
                    table.innerHTML += divMensaje;
                });
            }
    }

    document.addEventListener("click", (event) => {
        if (event.target.closest(".btn-trash")) {
            let btn = event.target.closest(".btn-trash");
            let parent = btn.closest(".row-msjs");
            console.log(parent)
            deleteMessage(parent.id);
        }
    });
})

document.querySelector(".contacto").addEventListener("submit", async(e) =>{
    e.preventDefault();
    try{
        const Motivo = e.target.elements.matter.value;
        const Mensaje = e.target.elements.message.value;
        
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        const user = JSON.parse(storedUser);
        const messageData = {
            Motivo,
            Mensaje,
            Usuario: user.IDUser,
        };

        console.log(messageData);
        const res = await fetch("http://localhost:3000/mensajes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData),
        })

        const resJson = await res.json();
        const errorText = document.querySelector(".error");
        if (!res.ok) {
            errorText.style.display = "block";
            return
        }else{
            const formContainer = document.querySelector(".form-container");
            formContainer.innerHTML= `<h2 class="form-title">Mensaje enviado</h2>`;
            const h2 = formContainer.querySelector("h2");
            h2.style.textAlign = "center"
        }
        }else{
            const errorSesion = document.querySelector(".sesion");
            errorSesion.style.display = "block";
        }
    }catch{}
});

async function deleteMessage(id){
    try{
        const res = await fetch(`http://localhost:3000/mensajes/${id}`, {
            method: "DELETE",
        })
        if (res.ok) {
            console.log("Mensaje eliminado");
            window.location.reload();
        }
    }catch{}
}
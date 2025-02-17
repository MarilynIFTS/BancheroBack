let editingDishId ="";
document.addEventListener("DOMContentLoaded", async () =>{
    if(localStorage.getItem("admin")){
        const storedAdmin = localStorage.getItem("admin");
        console.log(storedAdmin)
            if(storedAdmin){
                const res = await fetch("http://localhost:3000/reservas/Datos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },  
                })
            
                const reservasData = await res.json();

                const table = document.querySelector(".table");
                reservasData.forEach(reserva => {
                    let fechaConExtension = reserva.Fecha.split('/')[0];
                    let horaConExtension = reserva.Hora;
                    let divReserva =`<div class="row-rv" id="${reserva.IDReserva}">
                                <h4 class="tbl-nombre">${reserva.Nombre}</h4>
                                <h4 class="tbl-sucursal">${reserva.Sucursal}</h4>
                                <h4 class="tbl-fecha">${fechaConExtension.slice(8, 10)}/${fechaConExtension.slice(5, 7)}/${fechaConExtension.slice(2, 4)}</h4>
                                <h4 class="tbl-hora">${horaConExtension.slice(0, 5)}</h4>
                                <h4 class="tbl-personas">${reserva.CantidadDePersonas}</h4>
                                <h4 class="tbl-telefono">${reserva.Telefono}</h4> 
                                <div class="abm-container">
                                    <button class="btn-edit"><img src="imgs/icon-edit.svg" alt="edit icon"></button>
                                    <button class="btn-trash"><img src="imgs/icon-trash.svg" alt="trash icon"></button>
                                </div>
                            </div>`
                    table.innerHTML += divReserva;
                });
            }
    }
    if(localStorage.getItem("user")){
        const res = await fetch("http://localhost:3000/reservas/Datos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },  
        })
    
        const reservasData = await res.json();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const table = document.querySelector(".table-user");
                reservasData.forEach(reserva => {
                    let fechaConExtension = reserva.Fecha.split('/')[0];
                    let horaConExtension = reserva.Hora;
                    if(storedUser && storedUser.IDUser == reserva.IDUser){
                        table.style.display = "block"
                        let divReserva =`<div class="row-rv" id="${reserva.IDReserva}">
                                <h4 class="tbl-sucursal">${reserva.Sucursal}</h4>
                                <h4 class="tbl-fecha">${fechaConExtension.slice(8, 10)}/${fechaConExtension.slice(5, 7)}/${fechaConExtension.slice(2, 4)}</h4>
                                <h4 class="tbl-hora">${horaConExtension.slice(0, 5)}</h4>
                                <h4 class="tbl-personas">${reserva.CantidadDePersonas}</h4>
                                <h4 class="tbl-telefono">${reserva.Telefono}</h4> 
                                <div class="abm-container">
                                    <button class="btn-edit"><img src="imgs/icon-edit.svg" alt="edit icon"></button>
                                    <button class="btn-trash"><img src="imgs/icon-trash.svg" alt="trash icon"></button>
                                </div>
                            </div>`
                    table.innerHTML += divReserva;
                    }
                });
    }
    document.querySelector(".reservar").addEventListener("submit", async(e) =>{
        e.preventDefault();

        try{
            const Sucursal = e.target.elements.sucursal.value;
        const Fecha = e.target.elements.date.value;
        const Hora = e.target.elements.hour.value;
        const CantidadDePersonas = e.target.elements.people.value;
        const Telefono = e.target.elements.phone.value;


        if (localStorage.getItem("user") && document.querySelector(".form-submit").value == "Reservar") {
            const storedUser = localStorage.getItem("user");
            const user = JSON.parse(storedUser);
            const reserveData = {
                Sucursal,
                Fecha,
                Hora,
                CantidadDePersonas,
                Telefono,
                Usuario: user.IDUser,
            };

            console.log(reserveData);
            const res = await fetch("http://localhost:3000/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reserveData),
            })

            const resJson = await res.json();
            if (!res.ok) {
                const errorText = document.querySelector(".error");
                errorText.style.display = "block";
            }else{
                const formContainer = document.querySelector(".form-container");
                const formSubmit = document.querySelector(".form-submit");
                formContainer.innerHTML =`<h2 class="form-title">Reserva realizada</h2>`;
                formSubmit.remove()
            }

            console.log(resJson);
            }else if(localStorage.getItem("admin")  || localStorage.getItem("user")){
                const reserveData = {
                    Sucursal,
                    Fecha,
                    Hora,
                    CantidadDePersonas,
                    Telefono
                };

                const res = await fetch(`http://localhost:3000/reservas/${editingDishId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reserveData),
                })
                const resJson = await res.json();
                if (!res.ok) {
                    const errorText = document.querySelector(".error");
                    errorText.style.display = "block";
                }else{
                    window.location.reload()
                }
            }else{
                const errorSesion = document.querySelector(".sesion");
                errorSesion.style.display = "block";
            }
        }catch{

        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.closest(".btn-trash")) {
            let btn = event.target.closest(".btn-trash");
            let parent = btn.closest(".row-rv");
            console.log(parent.id)
            deleteReserv(parent.id);
        } else if(event.target.closest(".btn-edit")){
            let resrvContainer = event.target.closest(".row-rv");
            let tblSucursal = resrvContainer.querySelector(".tbl-sucursal").textContent;
            let tblFecha = resrvContainer.querySelector(".tbl-fecha").textContent;
            let tblHora = resrvContainer.querySelector(".tbl-hora").textContent;
            let tblPersonas = resrvContainer.querySelector(".tbl-personas").textContent;
            let tblTelefono = resrvContainer.querySelector(".tbl-telefono").textContent;

            const [dia, mes, anio] = tblFecha.split("/");
            const anioCompleto = `20${anio}`
            const fechaFinal = `${anioCompleto}-${mes}-${dia}`

            let id = event.target.closest(".row-rv").id;
            
            const selSucursal = document.getElementById("sucursal");
            const inputFecha = document.getElementById("fecha");
            const inputHora = document.getElementById("hora");
            const inputPersonas = document.getElementById("cantidadgente");
            const inputTelefono = document.getElementById("telefono");

            selSucursal.value = tblSucursal;
            inputFecha.value = fechaFinal;
            inputHora.value = tblHora;
            inputPersonas.value = tblPersonas;
            inputTelefono.value = tblTelefono;

            document.querySelector(".form-submit").value = "Modificar reserva"

            editingDishId = id;
        }
    });
})

async function deleteReserv(id){
    try{
        const res = await fetch(`http://localhost:3000/reservas/${id}`, {
            method: "DELETE",
        })
        if (res.ok) {
            window.location.reload();
            console.log("Reserva eliminada");
        }
    }catch{}
}
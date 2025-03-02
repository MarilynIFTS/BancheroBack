/*funcionalidad de botones incrementar y decrementar*/
let cantCarrito = document.querySelector(".cantidad-carrito");
let menuGuardado = JSON.parse(localStorage.getItem("arrPlatos"));
const storedUser = localStorage.getItem("user");

document.addEventListener("click", (event) =>{
    const btnLess = document.querySelectorAll(".less");
    const btnPlus = document.querySelectorAll(".plus");
    const dish = event.target.closest(".dish")

    btnLess.forEach(btn => {
    btn.onclick = () =>{
        const inputCounter = btn.nextElementSibling;
        if(inputCounter.value > 0){
            inputCounter.value--;
        }
        if(inputCounter.value == 0){
            const addBtn = dish.querySelector(".ir-carrito")
            addBtn.textContent = "Agregar";
            dish.querySelector(".counter").remove();
            addBtn.classList.toggle("add-chart");
            addBtn.classList.toggle("ir-carrito");
        }
        guardarPlatos()
        actualizarPrecios()
    }

    if(event.target.closest(".buy")){
        const main = document.querySelector("main")
        const summaryTitle = document.querySelector(".summary-title");
        const cantidadCarrito = document.querySelector(".cantidad-carrito");
        const summaryContainer = document.querySelector(".summary-container");
        if(storedUser){
            summaryTitle.innerHTML="muchas gracias por su compra 😊 su pedido llegará pronto";
            localStorage.removeItem("arrPlatos");
            summaryContainer.remove()
            cantidadCarrito.remove();
        }else{
            summaryTitle.innerHTML="debe ingresar para finalizar la compra";
            summaryContainer.remove()
        }
        summaryTitle.style.height = "59vh";
        summaryTitle.style.paddingTop = "10%";
    }

    return
});

btnPlus.forEach(btn => {
    btn.onclick = () =>{
        const inputCounter = btn.previousElementSibling;
        if(inputCounter.value < 15){
            inputCounter.value++;
        }
        guardarPlatos()
        actualizarPrecios()
    }
});

const dishes = document.querySelectorAll(".dish");
const items = document.querySelectorAll(".item");

let valor=0;
let valores = document.querySelectorAll(".counter-number");

if(dishes.length > 0 || items.length > 0){
    valores.forEach((cant) => {
        valor += parseInt(cant.value, 10); 
    })
}


if(valor !== 0){
    cantCarrito.textContent = valor;
}

if(valor == 0 && (dishes.length > 0 || items.length > 0)){
    cantCarrito.style.display = "none"
}
})

document.addEventListener("DOMContentLoaded", async () =>{
    try{
        let valor = 0;
        
        for (const plato of menuGuardado) {
            const response = await fetch(`https://bancheroback-production.up.railway.app/platos/${plato.id}`, {
                method: "GET",
            });
            const platoData = await response.json();
            const itemPlato = `<span class="line"></span>
            <div class="item" id="${platoData.IDPlato}">
                <div class="description">
                    <h3 class="dish">${platoData.Descripcion}</h3>
                    <h3 class="price">$${platoData.Precio}</h3>
                </div>
                <div class="counter">
                    <button class="less">-</button>
                    <input class="counter-number" type="number" min="0" max="15" value="${plato.cant}" readonly>
                    <button class="plus">+</button>
                </div>
            </div>`

            const items = document.querySelector(".items");
            if(items){
                items.innerHTML += itemPlato;
            }
            valor += parseInt(plato.cant, 10);
        }

        if(menuGuardado.length > 0){
            cantCarrito.style.display = "block";
            cantCarrito.textContent = valor;
        }
    }catch{}
})

const guardarPlatos = () => {
    let nuevosPlatos = [];
    const dishes = document.querySelectorAll(".dish");
    const items = document.querySelectorAll(".item");
    if(dishes.length > 0){
        dishes.forEach((dish) => {
            if(dish.querySelector(".counter-number")){
                let plato = {
                    id: `${dish.id}`,
                    cant: parseInt(`${dish.querySelector(".counter-number").value}`,10)
                }
    
                let existingPlato = nuevosPlatos.find(item  => item.id === plato.id);
    
                if (existingPlato) {
                    existingPlato.cant += plato.cant;
                } else {
                    nuevosPlatos.push(plato);
                }
            }
        })
        }
        if(items.length > 0){
            items.forEach((item) =>{
                let plato = {
                    id: `${item.id}`,
                    cant: parseInt(`${item.querySelector(".counter-number").value}`,10)
                }
                nuevosPlatos.push(plato)
            })
        }

        if(nuevosPlatos.length > 0){
            localStorage.setItem("arrPlatos", JSON.stringify(nuevosPlatos));
        }
}
window.addEventListener("beforeunload", guardarPlatos);

const actualizarPrecios = () =>{
    let subt =0;
    const items = document.querySelectorAll(".item");
        items.forEach((item) => {
            let precio = item.querySelector(".price").textContent;
            let cant = item.querySelector(".counter-number").value;
            subt += parseInt(cant, 10) * parseInt(precio.slice(1), 10);
        })
    let tot = subt + 60;
    const subtotal = document.querySelector(".subtotal");
    const total = document.querySelector(".total");
    subtotal.textContent = subt;
    total.textContent = tot;
}
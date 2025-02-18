const menu = document.querySelector(".menu-container");
let categoryOptions="<option>Seleccione una categoría</option>";


async function fetchCategories(){
    let categoriesData;
    try{
        const response = await fetch("https://bancheroback-production.up.railway.app/categorias", {
            method: "GET",
        })
        if (!response.ok) {
            throw new Error("Error al cargar la galería");
        }

        categoriesData = await response.json();

        const storedAdmin = localStorage.getItem("admin");

        let btnEliminar = "";
        let classdiv ="";

        if(storedAdmin){
            btnEliminar = `<button class="btn-trash-categ"><img class="btn-trash-img" src="imgs/icon-trash.svg" alt="trash icon"></button>`;
            classdiv = "btn-container"
        }

        let sel = document.createElement("select");
        categoriesData.forEach((category) =>{
            let sectionCategories = `<section class="dish-section ${category.NombreCategoria}" id="${category.NombreCategoria}">
            <div class="dish-img"><img src="../imgCateg/${category.ImagenIlustrativa}" alt="${category.NombreCategoria}"></div>
            <div class="${classdiv}" id=${category.IDCategoria}>
            <h3 class="dish-title">${category.NombreCategoria}</h3>${btnEliminar}
            </div>
            </section>`

            const option = document.createElement("option");
            option.textContent = category.NombreCategoria;
            option.value = category.NombreCategoria;
            sel.appendChild(option);
            menu.innerHTML += sectionCategories;
        })
        return sel;

    }catch{}
}

async function chargeDishes(){
    let dishesData;
    try{
        const response = await fetch("https://bancheroback-production.up.railway.app/platos", {
            method: "GET",
        })

        dishesData = await response.json();

        const responseCateg = await fetch("https://bancheroback-production.up.railway.app/categorias", {
            method: "GET",
        })

        categoriesData = await responseCateg.json();

        const storedAdmin = localStorage.getItem("admin");
        const storedUser = localStorage.getItem("user");

        let ctrlBtns = "";
        let addBtn = `<button class="add-chart">Agregar</button>`

        if(storedAdmin){
            ctrlBtns = `<div class="abm-container-dish">
                        <button class="btn-edit-dish"><img src="imgs/icon-edit.svg" alt="edit icon"></button>
                        <button class="btn-trash-dish"><img src="imgs/icon-trash.svg" alt="trash icon"></button>
                    </div>`
            addBtn="";
        }

        dishesData.forEach((dish) => {
        let divDish= `<div class="dish" id="${dish.IDPlato}">
                    <div class="data-container">
                    <h4 class="description">${dish.Descripcion}</h4>
                    <h4 class="price">$${dish.Precio}</h4>
                    </div>
                    ${ctrlBtns}
                    ${addBtn}
                </div>`
            categoriesData.forEach((category) => {
                const categoryNom = category.NombreCategoria
                const dishCateg = dish.Categoria;
                if(categoryNom == dishCateg){
                    let categoryContainer = document.querySelector(`.${category.NombreCategoria}`);
                    categoryContainer.innerHTML += divDish;
                }
            })
        })
        menu.innerHTML += divDish;
    }catch{}
}

let editingDishId = "";

document.addEventListener("DOMContentLoaded", async () =>{
    try{
        const storedPlatos = localStorage.getItem("arrPlatos");
        const arrPlatos = storedPlatos ? JSON.parse(storedPlatos) : [];
        const select = await fetchCategories();
        await chargeDishes();
        await platosGuardados(arrPlatos);
        const form = document.querySelector(".plato-form");
        let innerForm = `<label for="input-dish">
                    <input type="text" name="dish" id="input-dish" placeholder="Nombre del plato">
                </label>
                <label for="input-price">
                    <input type="text" name="price" id="input-price" placeholder="Precio">
                </label>
                <label for="categoria" id="label-sel">
                <select id="categoria" name="category">
                    <option>Seleccione una categoría</option>
                    ${select.innerHTML}
                </select>
                </label>
                <input type="submit" id="btn-add-dish" value="+">`
                form.innerHTML =innerForm;
            document.querySelector(".categoria-form").addEventListener("submit", async(e) =>{
                e.preventDefault();
        
                const formData = new FormData(e.target);
        
                const res = await fetch("https://bancheroback-production.up.railway.app/categorias", {
                    method: "POST",
                    body: formData,
                })
        
                const resJson = await res.json();
                if (res.ok) {
                    console.log("Plato agregado");
                    window.location.reload();
                }
            })
            document.querySelector(".plato-form").addEventListener("submit", async(e) =>{
                e.preventDefault();

                try{
                    const btnAddDish = document.getElementById("btn-add-dish");

                    const Descripcion = e.target.elements.dish.value;
                    const Precio = e.target.elements.price.value.replace(/\$/g, "");;
                    const Categoria = e.target.elements.category.value;

                    const dishData = {
                        Descripcion,
                        Precio,
                        Categoria
                    };

                    if(btnAddDish.value == "+"){
                    
                        const res = await fetch("https://bancheroback-production.up.railway.app/platos", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(dishData),
                        })
                    
                        const resJson = await res.json();
                        if (res.ok) {
                            console.log("Plato agregado");
                            window.location.reload();
                        }
                    }else if(btnAddDish.value == "✔"){
                        console.log(dishData)
                        const res = await fetch(`https://bancheroback-production.up.railway.app/platos/${editingDishId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(dishData),
                        })

                        const resJson = await res.json();
                        if(resJson){
                            const inputDish = document.getElementById("input-dish");
                            const inputPrice = document.getElementById("input-price");
                            const selCateg = document.getElementById("categoria");
                            const btnAddDish = document.getElementById("btn-add-dish");

                            inputDish.value = "";
                            inputPrice.value = "";
                            selCateg.value = "Seleccione una categoría";
                            btnAddDish.value = "+";
                        }
                        if (res.ok) {
                            console.log("Plato editado");
                            window.location.reload();
                        }
                    }
                    }catch{}
            })

            document.addEventListener("click", (event) => {
                if (event.target.closest(".btn-trash-dish")) {
                    let btn = event.target.closest(".btn-trash-dish");
                    let parent = btn.closest(".dish");
                    deleteDish(parent.id);
                } else if(event.target.closest(".btn-edit-dish")){
                    let dishContainer = event.target.closest(".dish");
                    let description = dishContainer.querySelector(".description").textContent;
                    let price = dishContainer.querySelector(".price").textContent;
                    let categ = event.target.closest(".dish-section").id;
                    let id = event.target.closest(".dish").id;
                    
                    const inputDish = document.getElementById("input-dish");
                    const inputPrice = document.getElementById("input-price");
                    const categoria = document.getElementById("categoria");
                    const btnAddDish = document.getElementById("btn-add-dish");

                    inputDish.value = description;
                    inputPrice.value = price;
                    categoria.value = categ;
                    btnAddDish.value = "✔";

                    editingDishId = id;
                }else if (event.target.closest(".btn-trash-categ")){
                    let container = event.target.closest(".btn-container");
                    deleteCateg(container.id);
                }
            });
    }catch{}

});


document.addEventListener("click", (event) =>{
    const dish = event.target.closest(".dish");
    if (!dish) return; 
    if(event.target.closest(".add-chart")){
            const btnCant = `<div class="counter counter-menu">
                        <button class="less">-</button>
                        <input class="counter-number" type="number" min="0" max="25" value="1" readonly>
                        <button class="plus">+</button>
                    </div>`
            const agregar = dish.querySelector(".add-chart");
            agregar.textContent= "Ir al carrito";
            agregar.classList.remove("add-chart");
            agregar.classList.add("ir-carrito");
            agregar.insertAdjacentHTML("beforebegin", btnCant);

            let cantidadCarrito = document.querySelector(".cantidad-carrito");
            cantidadCarrito.style.display = "block";
            return
    }
    if(event.target.closest(".ir-carrito")){
        guardarPlatos();
        window.location.href = "/carrito"
    }
})

async function deleteDish(id){
    try{
        const res = await fetch(`https://bancheroback-production.up.railway.app/platos/${id}`, {
            method: "DELETE",
        })
        if (res.ok) {
            console.log("Plato eliminado");
            window.location.reload();
        }
    }catch{}
}

async function deleteCateg(id){
    try{
        const res = await fetch(`https://bancheroback-production.up.railway.app/categorias/${id}`, {
            method: "DELETE",
        })
        if (res.ok) {
            console.log("Categoria eliminada");
            window.location.reload();
        }
    }catch{}
}

const irCarrito = document.querySelector(".ir-carrito");


async function platosGuardados(arr) {
    try{
        let valor = 0;
        for (const plato of arr) {
            const response = await fetch(`https://bancheroback-production.up.railway.app/platos/${plato.id}`, {
                method: "GET",
            });
            const platoData = await response.json();
            const dishes = document.querySelectorAll(".dish");
            dishes.forEach((dish) => {
                if(dish.id == plato.id){
                        const btnCant = `<div class="counter counter-menu">
                        <button class="less">-</button>
                        <input class="counter-number" type="number" min="0" max="25" value="${plato.cant}" readonly>
                        <button class="plus">+</button>
                        </div>`
                        const agregar = dish.querySelector(".add-chart");
                        agregar.textContent= "Ir al carrito";
                        agregar.classList.remove("add-chart");
                        agregar.classList.add("ir-carrito");
                        agregar.insertAdjacentHTML("beforebegin", btnCant);
                        valor += parseInt(plato.cant, 10);
                }
            })
        }
        if(valor !== 0){
            const cantidadCarrito = document.querySelector(".cantidad-carrito");
            cantidadCarrito.style.display = "block";
            cantidadCarrito.textContent = valor;
        }
    }catch{}
}
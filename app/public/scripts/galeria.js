/*Cargar imagenes*/
const galleryContainer = document.querySelector(".galeria-container");
document.addEventListener("DOMContentLoaded", async () =>{
    try{
        const response = await fetch("http://localhost:3000/imagenes/gallery");

        const galleryData = await response.json();


        galleryData.forEach((imagen) =>{
            galleryContainer.innerHTML += `<img src="../imagenesGaleria/${imagen.imagen}" alt="interior local" class="img-galeria" id="${imagen.imagen}">`
        });

        const storedAdmin = localStorage.getItem("admin");
        const storedUser= localStorage.getItem("user");

        if(!storedUser && !storedAdmin){
            const subir = document.querySelector(".subir");
            subir.parentElement.remove();
        }

        document.querySelectorAll(`.galeria-container .img-galeria`).forEach((image) => {
            image.onclick = () =>{
                const selectedImageId = image.id;

                let showBtn;
                let user = storedUser ? JSON.parse(storedUser) : null;

                const selectedImageData = galleryData.find(imagen => imagen.imagen === selectedImageId);
                const selectedImg = document.querySelector(".selected-img");

                if(storedAdmin || (user && user.IDUser == selectedImageData.IDUser)){
                    showBtn = `<button class="btn-trash"><img class="img-trash" src="imgs/icon-trash.svg" alt="trash icon"></button>`
                }

                selectedImg.style.display = "flex";
                    selectedImg.innerHTML = `
                    ${showBtn}
                    <span>X</span>
                    <img src="../../imagenesGaleria/${selectedImageData.imagen}" alt="interior local" class="img-galeria" id="${selectedImageData.IDImagen}">
                    <div class="publisher">
                        <div><img src="../../profilePics/${selectedImageData.FotoPerfil}" alt="foto de perfil" class="publisher-img"></div>
                        <h3 class="publisher-name">${selectedImageData.Nombre}:</h3>
                        <p>${selectedImageData.comentario}</p>
                    </div>`;
                    
                    document.querySelector(".selected-img span").onclick = () => {
                        selectedImg.style.display = "none";
                    }

                    document.querySelector(".selected-img .img-trash").onclick = () => {
                            let id = document.querySelector(".selected-img .img-galeria").id
                            console.log(id)
                            deleteImage(id);
                    };
            }
        });

        /*Subir imagen*/
        const dropArea = document.querySelector(".drop-area");
        const inputImg = document.getElementById("input-img");
        const iconSubir = document.querySelector(".icon-subir");

        const uploadImage = () => {
            let imgLink = URL.createObjectURL(inputImg.files[0]);
            iconSubir.style.backgroundImage = `url(${imgLink})`;
            iconSubir.textContent = "";
            iconSubir.style.border = "none";
            dropArea.style.width = "100%";
            dropArea.style.height = "100%";
        };

        inputImg.addEventListener("change", uploadImage);

        const subir = document.querySelector(".subir");
        const containerSubir = document.querySelector(".container-subir");

        subir.addEventListener("click", () => {
            containerSubir.style.display = "block";
        });

        document.querySelector(".container-subir span").onclick = () => {
            containerSubir.style.display = "none";
        };

        dropArea.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        dropArea.addEventListener("drop", (e) => {
            e.preventDefault();
            inputImg.files = e.dataTransfer.files;
            uploadImage();
        });

        /*Cargar imagen a la bdd*/
        document.querySelector(".galery-form").addEventListener("submit", async(e) =>{
            e.preventDefault();
            const formData = new FormData();

            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                formData.append("img", e.target.elements.img.files[0]);
                formData.append("coment", e.target.elements.coment.value);
                formData.append("iduser", user.IDUser);
            }

            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            const res = await fetch("http://localhost:3000/imagenes", {
                method: "POST",
                body: formData,
            })
            
            const errorText = document.querySelector(".error");
            if(!res.ok){
                return errorText.style.display = "block";
            }

            window.location.reload();
    });
    }
    catch{
        
    }
});

async function deleteImage(id){
    try{
        const res = await fetch(`http://localhost:3000/imagenes/${id}`, {
            method: "DELETE",
        })
        if (res.ok) {
            console.log("Imagen eliminada");
            window.location.reload();
        }
    }catch{}
}

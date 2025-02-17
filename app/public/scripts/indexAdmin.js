

/*header */

const btnLogin = document.getElementById("btn-login");
const userControls = document.getElementById("user-controls");
const navMenu = document.querySelector(".nav-menu");
const header = document.querySelector("header");
const btnMenu = document.getElementById("btn-menu");
const userOptions = document.querySelector(".user-options");
const profilePic = document.querySelector("#profile-pic");
const userName = document.querySelector(".user-name");
const btnEdit = document.querySelector(".btn-edit");
const btnCerrar = document.querySelector(".btn-cerrar");

btnCerrar.addEventListener("click", () => {
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("admin")
    window.location.href = "/adminLogin";
});

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    if (profilePic) {
        profilePic.addEventListener('click', () => {
            userOptions.classList.toggle("mostrar");
        });
    }
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
        const admin = JSON.parse(storedAdmin);
        const profilePic = document.querySelector("#profile-pic");
        const userName = document.querySelector(".user-name");
        const btnLogin = document.getElementById("btn-login");

        profilePic.setAttribute("src", `../../profilePics/${admin.FotoPerfil}`);
        userName.textContent = `${admin.Nombre}`;
        if(admin){
            profilePic.style.display = "block";
            btnLogin.style.display = "none";
        }

        /*edicion de perfil*/
    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const phone = document.querySelector(".phone");
    const photo = document.getElementById("photo-profile");

    name.textContent = admin.Nombre;
    email.textContent = admin.Email;
    phone.textContent = admin.Telefono;
    photo.setAttribute("src", `../../profilePics/${admin.FotoPerfil}`);
    }
});

window.addEventListener("beforeunload", () => {
    const hasToken = document.cookie.split(";").some((cookie) => cookie.trim().startsWith("jwt="));
    if (!hasToken) {
        localStorage.removeItem("admin");
    }
});

const responsiveMenuAdmin = () => {
    navMenu.classList.remove("mostrar");
    userOptions.classList.remove("mostrar");
    userOptions.classList.remove("user-menu-options");

    if(window.innerWidth <= 768){
        /*navMenu.children[0].appendChild(btnLogin);*/
        navMenu.children[0].appendChild(profilePic);
        navMenu.children[0].appendChild(userOptions);
        navMenu.children[0].appendChild(userName);
        header.appendChild(navMenu);
        profilePic.style.height = "5rem";
        profilePic.style.width = "5rem";
        if(!userOptions.classList.contains("mostrar")){
            userOptions.classList.toggle("mostrar");
        }
    }else{
        userControls.appendChild(btnLogin);
        userControls.appendChild(profilePic);
        userControls.appendChild(userOptions);
        userOptions.prepend(userName);
    }
};

responsiveMenuAdmin();

window.addEventListener("resize", responsiveMenuAdmin);

btnMenu.addEventListener("click", ()=>{
    navMenu.classList.toggle("mostrar");
    if(navMenu.classList.contains("mostrar") && !userOptions.classList.contains("user-menu-options")){
        userOptions.classList.toggle("user-menu-options");
    }
});
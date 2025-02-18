

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
    localStorage.removeItem("user")
    localStorage.removeItem("arrPlatos")
    window.location.href = "/login";
});

const responsiveMenu = () => {
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

responsiveMenu()

window.addEventListener("resize", responsiveMenu);

btnMenu.addEventListener("click", ()=>{
    navMenu.classList.toggle("mostrar");
    if(navMenu.classList.contains("mostrar") && !userOptions.classList.contains("user-menu-options")){
        userOptions.classList.toggle("user-menu-options");
    }
    const storedUser = localStorage.getItem("user");
    if(!storedUser){
        userOptions.classList.remove("user-menu-options");
    }
});

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    if (profilePic) {
        profilePic.addEventListener('click', () => {
            userOptions.classList.toggle("mostrar");
        });
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const user = JSON.parse(storedUser);
        const profilePic = document.querySelector("#profile-pic");
        const userName = document.querySelector(".user-name");
        const btnLogin = document.getElementById("btn-login");

        profilePic.setAttribute("src", `../../profilePics/${user.FotoPerfil}`);
        userName.textContent = `${user.Nombre}`;
        if(user){
            profilePic.style.display = "block";
            btnLogin.style.display = "none";
        }

        /*edicion de perfil*/
    const name = document.querySelector(".name");
    const email = document.querySelector(".email");
    const phone = document.querySelector(".phone");
    const photo = document.getElementById("photo-profile");

    name.textContent = user.Nombre;
    email.textContent = user.Email;
    phone.textContent = user.Telefono;
    photo.setAttribute("src", `../../profilePics/${user.FotoPerfil}`);
    }
    responsiveMenu();
});

window.addEventListener("beforeunload", () => {
    const hasToken = document.cookie.split(";").some((cookie) => cookie.trim().startsWith("jwt="));
    if (!hasToken) {
        localStorage.removeItem("user");
        localStorage.removeItem("arrPlatos");
    }
});

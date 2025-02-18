/*Loggin*/

let userId;

const obtenerPerfil = async () => {
    try {
        const resProtected = await fetch("https://bancheroback-production.up.railway.app/user/protected", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
            },
        });

        if (!resProtected.ok) {
            throw new Error("Error al obtener el perfil del usuario");
        }

        userId = await resProtected.json();

        const res = await fetch(`https://bancheroback-production.up.railway.app/user/${userId}`, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Error al obtener el perfil del usuario");
        }

        const user = await res.json();
        const storedAdmin = localStorage.getItem("admin");
        localStorage.setItem("user", JSON.stringify(user));
        profilePic.setAttribute("src", `../../profilePics/${user.FotoPerfil}`);
        userName.textContent = `${user.Nombre}`;
        if(user){
            profilePic.style.display = "block";
            btnLogin.style.display = "none";
        }
        if(storedAdmin){
            localStorage.removeItem("admin");
        }

    } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("arrPlatos");
        if (window.location.pathname !== "/inicio") {
            window.location.href = "/inicio";
        }
    }

};

document.addEventListener("DOMContentLoaded", () => {
    if(!userId){
        obtenerPerfil();
    }
});


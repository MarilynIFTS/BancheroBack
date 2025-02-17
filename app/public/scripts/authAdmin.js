/*Loggin*/

let adminId;

const obtenerPerfil = async () => {
    try {
        const resProtected = await fetch("http://localhost:3000/admin/protected", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${document.cookie.split("jwt=")[1]}`,
            },
        });

        adminId = await resProtected.json();

        const res = await fetch(`http://localhost:3000/admin/${adminId}`, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error("Error al obtener el perfil del usuario");
        }

        const admin = await res.json();
        const storedUser = localStorage.getItem("user");
        localStorage.setItem("admin", JSON.stringify(admin));
        profilePic.setAttribute("src", `../../profilePics/${admin.FotoPerfil}`);
        userName.textContent = `${admin.Nombre}`;
        if(admin){
            profilePic.style.display = "block";
            btnLogin.style.display = "none";
        }
        if(storedUser){
            localStorage.removeItem("user");
        }

    } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem("admin");
        if (window.location.pathname !== "/inicioAdmin") {
            window.location.href = "/inicioAdmin";
        }
    }

};

document.addEventListener("DOMContentLoaded", () => {
    if(!adminId){
        obtenerPerfil();
    }
});


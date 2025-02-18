
document.querySelector(".register").addEventListener("submit", async(e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", e.target.elements.name.value);
    formData.append("email", e.target.elements.email.value);
    formData.append("phone", e.target.elements.phone.value);
    formData.append("password", e.target.elements.password.value);
    formData.append("passwordconf", e.target.elements.passwordconf.value);
    formData.append("profilepic", e.target.elements.profilepic.files[0]); // Archivo
    formData.append("notifications", e.target.elements.notifications.checked ? 1 : 0);

    const res = await fetch("https://bancheroback-production.up.railway.app/user/register", {
        method: "POST",
        body: formData,
        mode: 'cors',
    });
    const errorReg = document.querySelector(".error");
    if(!res.ok){
        return errorReg.style.display = "block";
    }

    const errorText = document.querySelector(".error");
    const resJson = await res.json();

    if(resJson){
        const form = document.querySelector(".register");
        form.innerHTML = `
        <h2 class="form-title">Usuario registrado</h2>
        <a href="login" class="form-submit">Ir a Login</a>
    `;
    form.style.maxHeight = "28vh";
    }
})
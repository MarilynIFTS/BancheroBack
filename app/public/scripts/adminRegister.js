
document.querySelector(".register").addEventListener("submit", async(e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", e.target.elements.name.value);
    formData.append("email", e.target.elements.email.value);
    formData.append("phone", e.target.elements.phone.value);
    formData.append("password", e.target.elements.password.value);
    formData.append("profilepic", e.target.elements.profilepic.files[0]);
    formData.append("notifications", e.target.elements.notifications.checked ? 1 : 0);

    const formObject = {};
formData.forEach((value, key) => {
    formObject[key] = value;
});
console.log(formObject);


    const res = await fetch("http://localhost:3000/admin/registerAdmin", {
        method: "POST",
        body: formData,
        mode: 'cors',
    });

    const errorText = document.querySelector(".error");
    const resJson = await res.json();

    if(resJson){
        const form = document.querySelector(".register");
        form.innerHTML = `
        <h2 class="form-title">Administrador registrado</h2>
        <a href="adminLogin" class="form-submit">Ir a Login</a>
    `;
    form.style.maxHeight = "28vh";
    }
})
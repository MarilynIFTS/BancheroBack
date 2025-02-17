document.querySelector(".edit-profile").addEventListener("submit", async(e) => {
    e.preventDefault();
    const formData = new FormData();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
        console.error("No user found in localStorage.");
        return;
    }

    if (storedUser) {
        const user = JSON.parse(storedUser);

        const newName = e.target.elements.name.value;
        const newEmail = e.target.elements.email.value;
        const newPhone = e.target.elements.phone.value;
        const newPassword = e.target.elements.password.value;
        const newPasswordConf = e.target.elements.passwordconf.value;
        const newProfilePic = e.target.elements.profilepic.files[0];
        const newNotifications = e.target.elements.notifications.checked ? 1 : 0;

        console.log(newName, newEmail, newPhone, newPassword, newPasswordConf, newProfilePic, newNotifications);

        if (newName) formData.append("name", newName);
        if (newEmail) formData.append("email", newEmail);
        if (newPhone) formData.append("phone", newPhone);
        if (newPassword) formData.append("password", newPassword);
        if (newPasswordConf) formData.append("passwordconf", newPasswordConf);
        if (newProfilePic) {
            formData.append("profilepic", newProfilePic);
        }
        if (newNotifications) formData.append("notifications", newNotifications);

        console.log("Contenido del FormData:");
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }


        const res = await fetch(`http://localhost:3000/user/${user.IDUser}`, {
            method: "PUT",
            body: formData,
            mode: 'cors',
        })

        const resJson = await res.json();
        if(!res.ok){
            const errorText = document.querySelector(".error");
            return errorText.style.display = "block";
        }else{
            const form = document.querySelector(".edit-profile");
            form.innerHTML = `
            <h2 class="form-title">Usuario actualizado <br> con éxito</h2>
            `;
            form.style.maxHeight = "28vh";
        }
    }
    
})
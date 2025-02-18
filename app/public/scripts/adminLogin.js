document.querySelector(".login").addEventListener("submit", async(e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    const res = await fetch("https://bancheroback-production.up.railway.app/admin/loginAdmin", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email, password
        })
    });
    const errorText = document.querySelector(".error");
    if(!res.ok){
        return errorText.style.display = "block";
    }
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})
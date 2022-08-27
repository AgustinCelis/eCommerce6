window.addEventListener("load", function () {
    let campoNombre = document.getElementById("username");
    let campoPassword = document.getElementById("userpassword");
    let wName = document.querySelector(".wUsername");
    let wPassword = document.querySelector(".wPassword");

    campoNombre.addEventListener("blur", () => {
        if (campoNombre.value.length < 2) {
            wName.innerText = "Debe contener mas de 2 caracteres"
        } else {
            wName.innerText = ""
        }
    })
    campoNombre.addEventListener("blur", () => {
        if (campoNombre.value.length > 32) {
            wName.innerText = "No puede contener mas de 32 cararcteres"
        }
    })
    campoPassword.addEventListener("blur", () => {
        if (campoPassword.value.length < 8) {
            wPassword.innerText = "Debe contener al menos 8 caractertes"
        } else {
            wPassword.innerText = ""
        }
    })
})
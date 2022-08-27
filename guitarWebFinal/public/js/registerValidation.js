window.addEventListener("load", function () {
    let campoNombre = document.getElementById("username");
    let campoEmail = document.getElementById("email");
    let campoPassword = document.getElementById("userpassword");
    let campoConfirmPassword = document.getElementById("confirm-password");
    let wName = document.querySelector(".wUsername");
    let wEmail = document.querySelector(".wEmail");
    let wPassword = document.querySelector(".wPassword");
    let wPasswordConfirm = document.querySelector(".wPasswordConfirm");
    let formulario = document.querySelector("form.register")

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
    campoEmail.addEventListener("blur", () => {
        if (campoEmail.value.length < 5) {
            wEmail.innerText = "Debes completar con un Email valido"
        } else {
            wEmail.innerText = ""
        }
    })
    campoPassword.addEventListener("blur", () => {
        if (campoPassword.value.length < 8) {
            wPassword.innerText = "Debe contener al menos 8 caractertes"
        } else {
            wPassword.innerText = ""
        }
    })
    campoConfirmPassword.addEventListener("change", () => {
        if (campoConfirmPassword.value != campoPassword.value) {
            wPassword.innerText = "Las contraseñas no coinciden"
            wPasswordConfirm.innerText = "Las contraseñas no coinciden"
        } else {
            wPassword.innerText = ""
        }
    })
    formulario.addEventListener("submit", function (e) {
        let errors = []
        if (campoNombre.value == "") {
            wName.innerText = "Debes completar el Nombre"
            errors.push(errors.length + 1)
        } else if (campoNombre.value < 2) {
            wName.innerText = "El nombre debe tener mas de 2 caracteres"
            errors.push(errors.length + 1)
        }
        if (campoEmail.value == "") {
            wEmail.innerText = "Debes completar con un email valido"
            errors.push(errors.length + 1)
        }
        if (campoPassword.value == "") {
            wPassword.innerText = "Debes completar la contraseña"
            errors.push(errors.length + 1)
        } else if (campoPassword.value < 8) {
            wPassword.innerText = "La contraseña debe tener mas de 8 caracteres"
            errors.push(errors.length + 1)
        }
        if (campoConfirmPassword.value != campoPassword.value) {
            wPassword.innerText = "Las contraseñas no coinciden"
            errors.push(errors.length + 1)
        }
        if (errors.length > 0) {
            e.preventDefault();
        }
    })

})
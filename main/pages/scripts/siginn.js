async function check(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    try {
        await sign_in(email, password)
        sessionStorage.setItem("username", email)
        sessionStorage.setItem("unlocked_items",JSON.stringify(await get_user_items()))
        window.location.href = "game.html"
    } catch (error) {
        console.error(error)
        alert("Sign-in failed. Please check your email and password. It also may be an issue with the server, if you think this is the case please open an issue on github.")

    }
}

function show_password_toggle(){
    // Gets the password element
    let password_ = document.getElementById("password")
    // Checks the current type of the element (checks if its in hidden form or text form)
    // It then changes to opposite using a switch if statement
    if (password_.type === "password"){
        password_.type = "text"
    }else{
        password_.type = "password"
    }
}


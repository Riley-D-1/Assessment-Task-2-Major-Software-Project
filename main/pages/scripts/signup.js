function password_test(message){
    // Fetching the length og the password for testing 
    const password_len_test = message.length 
    // Here we use regex's to test for numbers and letters
    const has_number = /[0-9]/.test(message);
    const has_letter = /[a-zA-Z]/.test(message);
    // Debugging statement that logs the result of the password test to the console (true or false)
    console.log(has_number && has_letter && password_len_test >= 8)
    // The operand && will return true only if both values are true
    return has_number && has_letter && password_len_test >= 8;
}

function email_test(email){
    // This operand functions by testing a regex (more complicated version of above)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    // It ensures the format of the email follows this : "____@__.__"
}

async function check(){
    // This firstly checks that the email contains a .com and an @ symbol
    let name_ = document.getElementById("name_").value
    let password = document.getElementById("password").value
    let email = document.getElementById("email").value
    console.log(email_test(email))
    // It also checks that the password includes by using the exisisting password testing function
    // The operand && will return true only if all values are true
    if (email_test(email) === true && password_test(password) === true){
        try {
            await sign_up(email, password)
            console.log("All valid values")
            window.location.href = "results.html"
        } catch (error) {
            console.error(error)
            alert("Sign-up failed. Please check your email and password.")
        }
    }else{
        // Alerts the user
        alert("A problem has occured, please ensure all values are valid.")
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

function password_info_check(){
    // Gets the password element and the informative text above
    let password_2 = document.getElementById("password").value
    let password_info = document.getElementById("password_info")
    // Uses the password test function to check if the password is fufilling requirements or not in an if statement
    // Responds by changing the innfomative text's colour and text content
    if (password_test(password_2) === false){
        password_info.style.color = "red";
        password_info.textContent  = "Password must contain letters, numbers and at least 8 character long."
    }else{
        password_info.style.color = "black";
        password_info.textContent  = "Password:" 
    }
}
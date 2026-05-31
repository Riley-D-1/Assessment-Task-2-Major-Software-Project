function login_redirect(){
    // Redirects the user to the login page
    window.location.href = "signin.html"
}

function signup_redirect(){
    // Redirects the user to the signup page
    window.location.href = "signup.html"
}
function anon_sign_in(){
    // This function is used to sign in the user anonymously, allowing them to play the game without creating an account.
    // It calls the anonymous_sign_in function from the supabase.js file, which handles the actual sign-in process with Supabase.
    anonymous_sign_in()
}
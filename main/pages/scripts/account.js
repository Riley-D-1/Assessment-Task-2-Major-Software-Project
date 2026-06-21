function login_redirect(){
    // Redirects the user to the login page
    window.location.href = "signin.html"
}

function signup_redirect(){
    // Redirects the user to the signup page
    window.location.href = "signup.html"
}
function anon_sign_in(){
    // This function is used to sign in the user anonymously, allowing them to play the game without creating an account/using supabase.
    // Set local storage to all unlocked
    sessionStorage.setItem("username", "Anonymous");
    const all_items = [
        "../assets/items/apple.png",
        "../assets/items/chocolate_bar.png",
        "../assets/items/coin.png",
        "../assets/items/cola.png",
        "../assets/items/cookie_bar.png",
        "../assets/items/icicle.png",
        "../assets/items/key.png",
        "../assets/items/medkit.png",
        "../assets/items/mini_snowman.png",
        "../assets/items/muffin.png",
        "../assets/items/orange_googles.png",
        "../assets/items/pet_rock.png",
        "../assets/items/pizza.png",
        "../assets/items/purple_googles.png",
        "../assets/items/sandwich.png",
        "../assets/items/snowball.png",
    ];
    sessionStorage.setItem("unlocked_items",JSON.stringify(all_items) )
    window.location.href = "game.html"

}
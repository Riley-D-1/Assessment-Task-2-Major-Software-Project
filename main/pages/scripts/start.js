// The start menu for my game, that contains the title screen
function start_menu(){
    let audioCtx;
    document.addEventListener("click", () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            // Keep it alive globally
            sessionStorage.setItem("audioReady", "true");
        }
    });
	play_button = document.getElementById("play_button");
	play_button.addEventListener("click", function() {
		window.location.href = "../pages/account.html";
	});
}
function draw_start_menu(){
    const canvas = document.getElementById("start_window");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const bg_img = new Image();
    bg_img.src = '../assets/start_menu_bg.png';

    bg_img.onload = function() {
        ctx.drawImage(bg_img, 0, 0, canvas.width, canvas.height);
    };
    
    title_img = new Image();
    title_img.src = '../assets/title.png';
    title_img.onload = function() {
        ctx.drawImage(title_img, canvas.width / 2 - canvas.width * 0.5 / 2, canvas.height * 0.1, canvas.width * 0.5, canvas.height * 0.5);
        console.log("Title image loaded and drawn");
    };
}
// Draw the start menu  upon loading
document.addEventListener("DOMContentLoaded", (event) => {
    draw_start_menu();
});

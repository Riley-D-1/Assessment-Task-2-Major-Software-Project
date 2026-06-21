// This file contains all of the test functions and practice tests for the game 
import {inbetween_menu} from "./ui.js";

//These have to be here so the ui doesnt die
// On load function (Runs the core game on load)

window.addEventListener("load", () => {
	// Call resize function on load
    resizeGameCanvas();
	console.log("Loaded")
});

// General Functions

function resizeGameCanvas() {
	// Resize canvas 
    const canvas = document.getElementById("game_window");
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}




// Test functions
function trail_test(){
	const mousePos = getMousePos(canvas, event);
	trail(previous_coords_array, [mousePos.x, mousePos.y])
	// Test the trail function by simulating a character movement and checking if the trail is drawn correctly.
}


function ski_test(){
	/// Test the ski angle calcs and draw the skis 
}

function inbetween_menu_test(){
	// Test the inbetween menu  checking if the menu is displayed correctly.
	inbetween_menu("Test User",["../assets/items/medkit.png"])
}

function end_screen_test(){
	// Test the end screen by simulating the end of the game and checking if the end screen is displayed correctly.
	end_screen(100)

}

function ui_test(){
	let test_item_dict = [new item("Medkit","Common","main/assets/items/heart.png"), new item("Coin","Rare","main/assets/items/coin.png")]
	let test_score = 100
	// Test the obstacle and UI by simulating the generation of obstacles + having items and checking if they are displayed correctly.
	ui_draw(100, test_item_dict)

}

function obstacle_test(){
	obstacle_generator("flurry",200)
}

function  item_select_game_test(){
	item_selection_menu({})
}

const test_button = document.getElementById('test_button');
if (test_button) {
	test_button.addEventListener('click', () => {
		console.log('Button was pressed!');
		inbetween_menu_test();
	});
}

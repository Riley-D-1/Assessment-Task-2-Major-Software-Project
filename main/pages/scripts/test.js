// This file contains all of the test functions and practice tests for the game 
import {inbetween_menu} from "./ui.js";
import {Character,item} from "./classes.js";
import { character_draw, ski_calculate,check_obstacle_collion,trail, move, obstacle_generator } from "./game_logic.js";
let canvas = document.getElementById("game_window")
let ctx = canvas.getContext("2d")

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

function movement_test(){
	// Make a player
	let test_item_dict = [new item("Medkit","main/assets/items/heart.png"), new item("Coin","main/assets/items/coin.png")]
	let player = new Character(90,test_item_dict,99)
	// Make a camera
	let camera = { x: 0, y: 0 };
	// Store keys
	let keys = {};

    window.addEventListener("keydown", (e) => {
        keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key.toLowerCase()] = false;
    });

	function movement_update(){
		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//
		console.log(camera)
		if (keys["a"]){
			move(player, "a", camera);
		} 
        if (keys["d"]){
			move(player, "d", camera);
		}
		move(player,"null",camera)
		console.log(camera)
		requestAnimationFrame(movement_update)
	}
	movement_update();
}


function trail_test(){
	let previous_coord_array = [[200,0],[200,1],[200,2],[200],[200,4],[200,5],[200,6],[200,7],[200,8],[200,9],[200,10],[200,11],[200,12]]
	let y =0
	let x = 200
	function trail_test_update(){
		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Simulate movement in a line
		y+= 2
        // Add new point to trail
        // Call your trail function
        previous_coord_array = trail(previous_coord_array, [x, y]);
        requestAnimationFrame(trail_test_update);
    }
    trail_test_update();
	// Test the trail function by simulating a character movement and checking if the trail is drawn correctly.
	
}

function test_draw_player() {
	const canvas = document.getElementById("game_window");
	let ctx = canvas.getContext("2d")
    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fake test player data
	let test_item_dict = [new item("Medkit","main/assets/items/heart.png"), new item("Coin","main/assets/items/coin.png")]
	let player = new Character(90,test_item_dict,99)
    const test_sprite = "../assets/character/front.png"    

    const test_width = 32;
    const test_height = 32;

    character_draw(
        test_sprite,
        player.get_angle(),
        ski_calculate(player),
    );
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

function circle_collision_test(){
	// Test case for touching circles 
	let touch = check_obstacle_collion(0, 0, 10, 20, 0, 10);
	console.log(touch) // (should be false)
	// Test case for overlapping
	let overlap = check_obstacle_collion(0, 0, 10, 15, 0, 10); 
	console.log(overlap) // should be true 
	let seperate = check_obstacle_collion(0, 0, 10, 100, 100, 10); 
	console.log(seperate) // (should be false again)
}

function obstacle_test(){
	// Make a player
	let test_item_dict = [new item("Medkit","main/assets/items/heart.png"), new item("Coin","main/assets/items/coin.png")]
	let player = new Character(90,test_item_dict,99)
	obstacle_generator("flurry",200,player)

}

function  item_select_game_test(){
	item_selection_menu({})
}

const test_button = document.getElementById('test_button');
if (test_button) {
	test_button.addEventListener('click', () => {
		console.log('Button was pressed!');
		// Change as needed to whatever test function
		trail_test()
		
	});
}

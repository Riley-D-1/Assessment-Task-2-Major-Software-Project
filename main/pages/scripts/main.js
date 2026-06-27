// This is the main file which links all of the logic together in an appropiate game loop


// previous_coords_array = []
// for(let i =0; i< 50 ;i++)
// previous_coords_array.unshift(starting_pos)

// Import from other files
import { inbetween_menu, play_menu_music, handleMenuClick } from "./ui.js";
import { item_selection_menu, move_obstacles, handle_spawning, screen_draw } from "./game_logic.js";
import { Character } from "./classes.js";

let game_state = "menu";
let difficulty = "bluebird";
let starting_item = null;
let menu_vars = null;
let canvas = null;
let ctx = null;
let username = "";
let unlocked_items = [];
let player = null;
let previousTimeMs = 0;
const MAX_FPS = 60;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
const pressedKeys = new Set();

// On load function (Runs the core game on load)

window.addEventListener("load", () => {
	// Call resize function on load
    resizeGameCanvas();
	console.log("Loaded")
	main()
});

// General Functions

function resizeGameCanvas() {
	// Resize canvas 
    const canvas = document.getElementById("game_window");
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Check for resize and call rewsize function if canvas size changes
window.addEventListener("resize", resizeGameCanvas);

// Other Functions
function end_game(player_item_dict, unlocked_items){
 	// Check for new items and save them to supabase, then return to inbetweenmenu
	for (item_ in player_item_dict){
		if (item_  in unlocked_items == False){
			try{
				await save_item("item")
			}catch(error){
				console.log("Error saving unlocked item")
			}
		}

		
	}
}


// GAME LOOP

function update(currentTimeMs) {
	/* The core recursive game loop for my game
    Args:
		currentTimeMs(Int): The browser timestamp in ms
    Returns:
        N/A
	*/

	const deltaTimeMs = currentTimeMs - previousTimeMs;
	if (deltaTimeMs >= FRAME_INTERVAL_MS) {
		// Update physics/logic here
		if (game_state === "game") {
			move_obstacles(player);
			handle_spawning();
		}
		previousTimeMs = currentTimeMs - (deltaTimeMs % FRAME_INTERVAL_MS);
	}

	// Draw UI and Scene here
	if (game_state === "menu") {
		menu_vars = inbetween_menu(username, unlocked_items, difficulty, starting_item)
		difficulty = menu_vars[0]
		starting_item = menu_vars[0]
		game_state_ = menu_vars[3]
	} else if (game_state === "game") {
		screen_draw()
	} else if (game_state === "item_menu") {
		item_selection_menu()
	} else if (game_state === "end") {
		end_game()
		end_screen()
	}
	// Calls the loop recursively
	requestAnimationFrame(update);
}

function main(){
	/* The core for my game that calls the relevant game loop 
    Args:
		N/A
    Returns:
        N/A
	*/
	// Start getting everything ready
	// INITIALISATION 

	canvas = document.getElementById("game_window")
	ctx = canvas.getContext("2d")
	canvas.addEventListener('click', handleCanvasClick);

	// Fetch user data 
	let username = sessionStorage.getItem("username")
	let unlocked_items = JSON.parse(sessionStorage.getItem('unlocked_items'));

	// Asset lists

	const item_paths = [
		"../assets/items/apple.png",
		"../assets/items/chocolate_bar.png",
		"../assets/items/coin.png",
		"../assets/items/cola.png",
		"../assets/items/medkit.png",
		"../assets/items/mini_snowman.png",
		"../assets/items/muffin.png",
		"../assets/items/pet_rock.png",
		"../assets/items/pizza.png",
		"../assets/items/purple_googles.png",
		"../assets/items/sandwich.png",
		"../assets/items/snowball.png",
	];

	// Use the keys inside the physics function of the character 
	const isKeyDown = (key) => pressedKeys.has(key);
	document.addEventListener('keydown', handleGlobalKeydown);
	document.addEventListener('keyup', (e) => pressedKeys.delete(e.key));
	// Create the player object
	player = new Character(0, {}, 0, canvas);

	// Wait for fonts to load then start the loop
	document.fonts.ready.then(() => {
		previousTimeMs = performance.now();
		requestAnimationFrame(update);
	});
}

function handle_input(e) {
	pressedKeys.add(e.key);
	if (game_state === "item_menu") {
		handleItemMenuKey(e.key);
	}
	if (game_state === "game" && (e.key === 'Esc')) {
		game_state = "end"
	}
}

function handle_click(event) {
	if (game_state === "menu") {
		(event);
	}
}

function handle_item_select(key) {
	if (key === 'q' || key === 'Q') {
		menu_action = 'Q';
	} else if (key === 'e' || key === 'E') {
		menu_action = 'E';
	} else if (key === 'l' || key === 'L') {
		menu_action = 'pass';
	}
}

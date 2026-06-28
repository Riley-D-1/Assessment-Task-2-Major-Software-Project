// This is the main file which links all of the logic together in an appropiate game loop
// Import from other files
import { inbetween_menu, play_menu_music,end_screen,ui_draw } from "./ui.js";
import { item_selection_menu, handle_spawning, screen_draw,move,trail ,character_draw,ski_calculate, ski_draw,check_obstacle_collion,collision_detection} from "./game_logic.js";
import { Character,item } from "./classes.js";

let game_state = "menu";
let difficulty = "bluebird";
let menu_vars = null;
let canvas = null;
let ctx = null;
let username = sessionStorage.getItem("username");
let camera = { x: 0, y: 0 }
let obstacles = [];
let loaded_obstacles = [];
let trail_coords = [0,0];
let spawn_timer = 0;
// Get unlocked items from storage
let unlocked_items = JSON.parse(sessionStorage.getItem("unlocked_items")) || ["../assets/items/medkit.png"];
let previousTimeMs = 0;
const MAX_FPS = 60;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
const pressedKeys = new Set();
let last_click = null;
let starting_item = "../assets/items/medkit.png";
//
let player = new Character(90,unlocked_items,99)
// On load function (Runs the core game on load)

window.addEventListener("load", () => {
	// Call resize function on load
    resizeGameCanvas();
	console.log("Loaded")
	main()
});


window.addEventListener("keydown", (e) => {
    pressedKeys.add(e.key);
});

window.addEventListener("keyup", (e) => {
    pressedKeys.delete(e.key);
});


// General Functions

function preload_obstacles(){
	let obstacle_urls = [
		"../assets/obstacles/big_tree_1.png",
		"../assets/obstacles/big_tree_2.png",
		"../assets/obstacles/bush_1.png",
		"../assets/obstacles/bush_2.png",
		"../assets/obstacles/log_1.png",
		"../assets/obstacles/log_2.png",
		"../assets/obstacles/rock_1.png",
		"../assets/obstacles/rock_2.png",
		"../assets/obstacles/sign_1.png",
		"../assets/obstacles/sign_2.png",
		"../assets/obstacles/small_tree.png",
		"../assets/obstacles/snowman.png",
		"../assets/obstacles/tree_1.png"
	];
	for (let ob of obstacle_urls){
		const img = new Image();
		console.log(ob)
		img.src = ob;
		img.onload = () => {
			loaded_obstacles.push(img);
		};
		img.onerror= () => {
			console.log("error loading image")
			console.log(ob)
		}
	}
}

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
				//await save_item("item")
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
	// Clear 
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const deltaTimeMs = currentTimeMs - previousTimeMs;
	if (deltaTimeMs >= FRAME_INTERVAL_MS) {
		// Update physics/logic here
		if (game_state === "game") {
			for (let key of pressedKeys) {
					move(player, key, camera);
				}
				// Spawning
				const newObstacles = handle_spawning(difficulty, player.score, player,loaded_obstacles);
				obstacles.push(...newObstacles);
				// Move obstacles
				for (let obs of obstacles) {
					obs.y -= player.base_speed;
				}
				// Collision check
				for (let obs of obstacles) {
					if (collision_detection(player, obs)) {
						game_state = "end";
					}
				}

				// Trail
				trail_coords = trail(trail_coords, [canvas.width/2, canvas.height/2], camera);				
			}
			
		}
	previousTimeMs = currentTimeMs - (deltaTimeMs % FRAME_INTERVAL_MS);
	// Draw UI and Scene here
	screen_draw(obstacles,loaded_obstacles, camera);
	// Draw player
	ski_draw(player.character_angle,ski_calculate(player),player.turn_velocity)
	character_draw(player.return_sprite(), player.character_angle, ski_calculate(player));
	

	// Draw UI
	//ui_draw(player.score, player.item_dict);

	// } else if (game_state === "game") {
	// 	// Calls the loop recursively
	// 	screen_draw()
	// 	requestAnimationFrame(update);
	// } else if (game_state === "end") {
	// 	end_game()
	// 	end_screen()
	// }
	
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
	canvas.addEventListener('click', handle_click);

	// Fetch user data 
	let username = sessionStorage.getItem("username")
	let unlocked_items = JSON.parse(sessionStorage.getItem('unlocked_items'));

	// Asset lists

	preload_obstacles()
	// Use the keys inside the physics function of the character 
	// const isKeyDown = (key) => pressedKeys.has(key);
	// document.addEventListener('keydown', handleGlobalKeydown);
	// document.addEventListener('keyup', (e) => pressedKeys.delete(e.key));
	// Create the player object
	// Wait for fonts to load then start the loop
	document.fonts.ready.then(() => {
		inbetween_menu(username, unlocked_items,difficulty,starting_item)
		
		// requestAnimationFrame(update);
	});
}

function handle_input(e) {
	pressedKeys.add(e.key);
	if (game_state === "item_menu") {
		handle_item_select(e.key);
	}
	if (game_state === "game" && (e.key === 'Esc')) {
		game_state = "end"
	}
}

function handle_click(event) {
    const rect = canvas.getBoundingClientRect();
    window.last_click = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
	if (game_state === "menu") {
		const saved_difficulty = difficulty;
		const saved_start_item = starting_item;
		// G4rab the returned vals from the function
		const menu_vars = inbetween_menu(username, unlocked_items, difficulty, starting_item);
		difficulty = menu_vars.difficulty;
		starting_item = menu_vars.starting_item;
		game_state = menu_vars.game_state;
		if (game_state === "game"){
			player.add_item(starting_item)
			update(previousTimeMs = performance.now(),player)
		}
		// Only redraw if something changed
		if (saved_start_item != starting_item || saved_difficulty != difficulty){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		inbetween_menu(username, unlocked_items,difficulty,starting_item);
		}
	}else if(game_state === "end" ){

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

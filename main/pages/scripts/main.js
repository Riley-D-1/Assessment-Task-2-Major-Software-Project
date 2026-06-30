// This is the main file which links all of the logic together in an appropiate game loop
// Import from other files
import { inbetween_menu, play_menu_music,end_screen,ui_draw } from "./ui.js";
import { handle_spawning, screen_draw, move, trail, character_draw, ski_calculate, ski_draw, check_obstacle_collion, collision_detection,pick_items} from "./game_logic.js";
import { Character,item } from "./classes.js";


// Set up the game with all of the relevant global variables
// Yes this is a lot of global variables, but time constraints + procrastination lol
let game_state = "menu";
let difficulty = "bluebird";
let menu_vars = null;
let canvas = null;
let ctx = null;
let username = sessionStorage.getItem("username");
let camera = { x: 0, y: 0 }
let obstacles = [];
let loaded_obstacles = []
let loaded_items = []
let trail_coords = [];
let spawn_timer = 0;
let obstacles_dodged = 0;
let menu_action = null;
let item_menu_result = null;
let score_timer = 0;
let next_item_score = 500 - 0; 
let current_item_choices = [];
// Get unlocked items from storage
let unlocked_items = JSON.parse(sessionStorage.getItem("unlocked_items")) || ["../assets/items/medkit.png"];
let previousTimeMs = 0;
const MAX_FPS = 60;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
const pressedKeys = new Set();
let last_click = null;
let starting_item = "../assets/items/medkit.png";
//
let player = new Character(0)
// On load function (Runs the core game on load)

window.addEventListener("load", () => {
	// Call resize function on load
    resizeGameCanvas();
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

function preload_items(){
	let item_urls = [
        "../assets/items/apple.png",
        "../assets/items/chocolate_bar.png",
        "../assets/items/coin.png",
        "../assets/items/cola.png",
        "../assets/items/medkit.png",
        "../assets/items/mini_snowman.png",
        "../assets/items/muffin.png",
        "../assets/items/pet_rock.png",
        "../assets/items/pizza.png",
        "../assets/items/goggles.png",
        "../assets/items/sandwich.png",
        "../assets/items/snowball.png",
	];
	for (let item of item_urls){
		const img = new Image();
		console.log(item);
		img.src = item;
		img.onload = () => {
			loaded_items.push(img);
		}
		img.onerror= () => {
			console.log("error loading item image")
			console.log(item)
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
async function end_game(player_item_dict,unlocked_items){
    for (const item_ of player_item_dict){
        const icon = item_.icon_path;
        if (!unlocked_items.includes(icon)){
            try{
                await save_item(icon);
            }catch(error){
                console.log("Error saving unlocked item");
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
			move(player, camera, pressedKeys);
			score_timer++;
			if (score_timer >= 60) {  
				player.score += Math.floor(player.speed * player.score_mult);
				score_timer = 0;
			}
			if (player.score > 0 &&player.score >= next_item_score &&player.item_dict.length < 5) {
				current_item_choices = pick_items();
				    const items = [
					"../assets/items/apple.png",
					"../assets/items/chocolate_bar.png",
					"../assets/items/coin.png",
					"../assets/items/cola.png",
					"../assets/items/medkit.png",
					"../assets/items/mini_snowman.png",
					"../assets/items/muffin.png",
					"../assets/items/pet_rock.png",
					"../assets/items/pizza.png",
					"../assets/items/goggles.png",
					"../assets/items/sandwich.png",
					"../assets/items/snowball.png",
				];
				const random_icon = items[Math.floor(Math.random() * items.length)];
				player.add_item(random_icon);
				const added_item = player.item_dict[player.item_dict.length - 1];
				const msg = document.getElementById("msg");
				msg.textContent = `You found "${added_item.name}"!`;
				msg.style.display = "block";
				msg.style.font = '20px "Jersey 10"';
				setTimeout(() => {msg.textContent = added_item.description}, 2000);
				setTimeout(() => {msg.style.display = "none"}, 5000);
				document.getElementById("game_window").focus()
				next_item_score += (500 - player.item_luck);
			}
			// Spawning
			const newObstacles = handle_spawning(difficulty, player.score, player,loaded_obstacles,obstacles);
			obstacles.push(...newObstacles);
			// Collision check
			for (let i = obstacles.length - 1; i >= 0; i--) {
				const obs = obstacles[i];
				const collision_result = collision_detection(player, obs);
				if (collision_result === "dead") {
					game_state = "end";
					msg.style.display = "none";
					break;
				}
				if (collision_result === "saved") {
					const msg = document.getElementById("msg");
					msg.textContent = "Your life item saved you!";
					msg.style.display = "block";
					setTimeout(() => msg.style.display = "none", 3000);
					document.getElementById("game_window").focus()
					// Remove the life item from inventory
					const index = player.item_dict.findIndex(it => it.type === "life");
					if (index !== -1){
						player.item_dict.splice(index, 1);
						
					} 
					// Reset boolean
					player.life_boolean  = player.item_dict.some(it => it.type === "life");
					// Remove the obstacle that hit the player
					obstacles.splice(i, 1);
					// Continue the game
					continue;
				}
				// Check if the obstacle has passed the player and remove it from the array
				if (obs.y + obs.height < player.y -500) {
					obstacles_dodged++;
					obstacles.splice(i, 1);   // remove obstacle safely
				}
			}
		}
	}
	previousTimeMs = currentTimeMs - (deltaTimeMs % FRAME_INTERVAL_MS);
	if (game_state === "game") {
		// Draw UI and Scene here
		screen_draw(obstacles, loaded_obstacles, camera);
		ui_draw(player.score, player.item_dict,loaded_items);
		// Trail
		trail_coords = trail(trail_coords, [player.x, player.y], ski_calculate(player) * 0.75, camera, player.heading);
		// Draw player
		ski_draw(player.character_angle, ski_calculate(player), player.turn_velocity)
		character_draw(player.return_sprite(), player.character_angle, ski_calculate(player));
		requestAnimationFrame(update);
	} else if (game_state === "end") {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		end_game(player.item_dict, unlocked_items);
		end_screen(player.score, player.item_dict, obstacles_dodged);
		return; 
	}

}
	
function main(){
	/* The core for my game that calls the relevant game loop 
    Args:
		N/A
    Returns:
        N/A
	*/

	// INITIALISATION 

	canvas = document.getElementById("game_window")
	ctx = canvas.getContext("2d")
	canvas.addEventListener('click', handle_click);

	// Fetch user data 
	let username = sessionStorage.getItem("username")
	let unlocked_items = JSON.parse(sessionStorage.getItem('unlocked_items'));

	preload_obstacles()
	preload_items()
	// Wait for fonts to load then start the loop
	ctx.font = "40px 'Jersey 40'";
	document.fonts.ready.then(() => {
		game_state = "menu";
		inbetween_menu(username, unlocked_items, difficulty, starting_item);
	});

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
			player.add_item(starting_item);
			update(previousTimeMs = performance.now(),player)
			game_state = "game"
		}
		// Only redraw if something changed
		if (saved_start_item != starting_item || saved_difficulty != difficulty){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		inbetween_menu(username, unlocked_items,difficulty,starting_item);
		}
	}else if(game_state === "end" ){
		// Main Menu button
		if (
			window.last_click.x >= canvas.width * 0.78 &&
			window.last_click.x <= canvas.width * 0.78 + canvas.width * 0.2 &&
			window.last_click.y >= canvas.height * 0.78 &&
			window.last_click.y <= canvas.height * 0.78 + canvas.height * 0.12
		) {
			// Go to start
			window.location.href = "../pages/main_menu.html"
		}
	}

}
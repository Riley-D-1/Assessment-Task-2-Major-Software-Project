// This is the main file which links all of the logic together in an appropiate game loop
// Import from other files
import { inbetween_menu,end_screen,ui_draw } from "./ui.js";
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
let saved_items = []
let used_item = null
let unlocked_list= []
let previousTimeMs = 0;
const MAX_FPS = 60;
const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
const pressedKeys = new Set();
let last_click = null;
let starting_item = "../assets/items/medkit.png";
// Get unlocked items from session storage or set to default if not present
let unlocked_items = JSON.parse(sessionStorage.getItem("unlocked_items")) || ["../assets/items/medkit.png"];
let audio = new Audio();
audio.volume = 1; // optional
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

function play_game_music() {
    if (sessionStorage.getItem("audioReady")) {
		audio.loop = false;
		audio.pause();
		audio.currentTime = 0;
		audio.src = "";
        audio.src = '../assets/music/game_music.mp3'
        audio.load();
        audio.play();
    }
}

function play_menu_music(){
	/** Plays music in the menus.

    Args:
        N/A

    Returns:
        N/a
	*/
	if (sessionStorage.getItem("audioReady")) {
		audio.src = '../assets/music/menu_music.mp3';
		audio.loop = true;
		audio.volume = 1;
		audio.play();
		console.log("music playeing")
	}
}

function play_death_music(){
	/** Plays music when the player dies.
	 */
	if (sessionStorage.getItem("audioReady")) {
		audio.pause();
		audio.src = "";
		audio.loop = false;
		audio.currentTime = 0;
		audio.src = '../assets/music/death.mp3';
		audio.play();
	}
}

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
async function end_game(player_item_dict, unlocked_items, saved_items) {
    let all_items = [...player_item_dict, ...saved_items];
    let unlocked_list = [];
    for (const item_ of all_items) {
        const icon = item_.icon_path;
        if (!unlocked_items.includes(icon)) {
            try {
                console.log("Saving unlocked item: " + icon);
                await save_item(icon);
                unlocked_list.push(icon);
            } catch (error) {
                console.log(error);
                console.log("Error saving unlocked item");
            }
        }
    }
    return unlocked_list;
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
					play_death_music()
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
						used_item = player.item_dict[index];
						saved_items.push(used_item);
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
		(async () => {
			// Check login status
			const { data: userData } = await supabaseClient.auth.getUser();
			const logged_in = !!userData?.user;
			let high_score_ = 0;
			let unlocked_list_ = [];
			if (logged_in) {
				console.log("User is logged in, fetching high score and unlocked items...");
				high_score_ = await get_user_highscore();
				unlocked_list_ = await end_game(player.item_dict, unlocked_items, saved_items);
				if (player.score > high_score_) {
					await save_highscore(player.score);
					high_score_ = player.score;
				}

			} else {
				// If not logged in, use localStorage for high score
				high_score_ = parseInt(localStorage.getItem("high_score")) || 0;

				if (player.score > high_score_) {
					localStorage.setItem("high_score", player.score);
					high_score_ = player.score;
				}
				unlocked_list_ = [...item_dict, ...saved_items]
			}
			end_screen(player.score, unlocked_list_, obstacles_dodged, high_score_);

		})();

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
	unlocked_items = JSON.parse(sessionStorage.getItem("unlocked_items")) || [];
	if (!unlocked_items.includes("../assets/items/medkit.png")) {
		unlocked_items.unshift("../assets/items/medkit.png");
	}

	preload_obstacles()
	preload_items()
	// Wait for fonts to load then start the loop
	ctx.font = "40px 'Jersey 40'";
	document.fonts.ready.then(() => {
		game_state = "menu";
		play_menu_music()
		inbetween_menu(username, unlocked_items, difficulty, starting_item);
	});

}

function handle_click(event) {
    const rect = canvas.getBoundingClientRect();
    window.last_click = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
	// Refresh unlocked items before menu logic
	unlocked_items = JSON.parse(sessionStorage.getItem("unlocked_items")) || [];
	if (!unlocked_items.includes("../assets/items/medkit.png")) {
		unlocked_items.unshift("../assets/items/medkit.png");
	}
	if (game_state === "menu") {
		const saved_difficulty = difficulty;
		const saved_start_item = starting_item;
		// G4rab the returned vals from the function
		const menu_vars = inbetween_menu(username, unlocked_items, difficulty, starting_item);
		difficulty = menu_vars.difficulty;
		starting_item = menu_vars.starting_item;
		game_state = menu_vars.game_state;
		if (game_state === "game"){
			sessionStorage.setItem("audioReady", "true");
			play_game_music()
			player.add_item(starting_item)
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
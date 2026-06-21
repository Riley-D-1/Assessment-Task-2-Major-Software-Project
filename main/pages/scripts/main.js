// This is the main file which links all of the logic together in an appropiate game loop


// previous_coords_array = []
// for(let i =0; i< 50 ;i++)
// previous_coords_array.unshift(starting_pos)

// Import from other files
import { inbetween_menu, play_menu_music } from "./ui.js";
import {} from "./game_logic.js";


// INITIALISATION 

// Fetch user data 
let username = sessionStorage.getItem("username")
let unlocked_items = JSON.parse(sessionStorage.getItem('unlocked_items'));
// Asset lists
const obstacle_assets = [
	"main/assets/obstacles/big_tree_1.png",
	"main/assets/obstacles/big_tree_2.png",
	"main/assets/obstacles/bush_1.png",
	"main/assets/obstacles/bush_2.png",
	"main/assets/obstacles/log_1.png",
	"main/assets/obstacles/log_2.png",
	"main/assets/obstacles/rock_1.png",
	"main/assets/obstacles/rock_2.png",
	"main/assets/obstacles/small_tree.png",
	"main/assets/obstacles/snow_small_tree.png",
	"main/assets/obstacles/snowman.png",
	"main/assets/obstacles/stump.png",
	"main/assets/obstacles/tree_1_snow.png",
	"main/assets/obstacles/tree_1.png",
];

const item_paths = [
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

// Classes
class Character{
    constructor(character_angle,speed,item_dict,score) {
		this.position = [0,0];
		this.character_angle = direction;
		this.y_speed = speed;
		this.x_speed = x_speed
		this.item_dict = item_dict;
		this.score = score
  	}
	update_speed(updated_speed){
		this.speed= updated_speed
	}
	get_speed(){
	return this.speed
	}
	add_item(item){
		this.item_dict.push(item)
	}
	
}

class Obstacle{
	constructor(postion_x,postion_y,src,size_x,size_y) {
		this.position = [postion_x,postion_y];
		this.size_x =  size_x
		this.size_y = size_y
		this.src = src
  	}
}

class item{
    constructor(rarity,description,icon_path) {
    this.rarity = rarity;
    this.description = description;	
    this.icon_path = icon_path;
  }
  fetch_description(){
	return this.description
  }
  fetch_rarity(){
	return this.rarity
  }
  fetch_icon(){
	return this.icon_path
  }

}

class life_item extends item{
    constructor(rarity,description,icon_path) {
    super(rarity,description,icon_path);
  }
  abillity() {
	
  }
}

class luck_item extends item{
    constructor(rarity,description,icon_path) {
    super(rarity,description,icon_path);
  }
	abillity() {
	
  }
}

class mobility_item extends item{
    constructor(rarity,description,icon_path) {
    super(rarity,description,icon_path);
  }
  mobility_item_effect(){

  }
}

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

function update() {
  requestAnimationFrame((currentTimeMs) => {
    const deltaTimeMs = currentTimeMs - previousTimeMs;
    if (deltaTimeMs >= FRAME_INTERVAL_MS) {
		// Update physics here
      	// Synchronize next frame to arrive on time
      	previousTimeMs = currentTimeMs - (deltaTimeMs % FRAME_INTERVAL_MS);
    }

	// Draw UI and Scene here


	// Call the function inside to continue
    update();
  });
}

function main(){
	// Start getting everything ready
	// Intilisation 
	const pressedKeys = new Set();
	// Use the keys inside the physics function of the character 
	const isKeyDown = (key) => pressedKeys.has(key);
	document.addEventListener('keydown', (e) => pressedKeys.add(e.key));
	document.addEventListener('keyup', (e) => pressedKeys.delete(e.key));
	const MAX_FPS = 60;
	const FRAME_INTERVAL_MS = 1000 / MAX_FPS;
	let previousTimeMs = 0;

	// Wait for fonts to load
	document.fonts.ready.then(() => {
		
		menu_vars=inbetween_menu(username,unlocked_items)
		difficulty = menu_vars[0]
		starting_item = menu_vars[1]
	});
	update()
}

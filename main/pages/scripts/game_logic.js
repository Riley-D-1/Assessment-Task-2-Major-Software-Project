// This file contains all of the core game logic 

// Audio related logic
// Done
import {Character,item,Obstacle} from "./classes.js";

let canvas = document.getElementById("game_window")
let ctx = canvas.getContext("2d")
// Apparently this works acrss files
export let spawn_timer = 0

function play_game_music(){
	if (sessionStorage.getItem("audioReady")) {
		audio.loop = false;
		const game_music_urls = ['../assets/music/game_music_1.mp3','../assets/music/game_music_2.mp3']
		audio.pause();
		audio.src = game_music_urls[Math.floor(Math.random(game_music_urls))];
		audio.load()
		audio.play()
		music.addEventListener('ended',function(){
			audio.src = game_music_urls[Math.floor(Math.random(game_music_urls))];
			audio.pause();
			audio.load()
			audio.play()
		});
	}
}

// Obstacle Functions 


// Done?
export function check_obstacle_collion(loop_obstacle_x,loop_obstacle_y,loop_obstacle_radius,obstacle_x,obstacle_y,obstacle_radius){
    let dx = loop_obstacle_x - obstacle_x
    let dy = loop_obstacle_y - obstacle_y
    let distance = Math.sqrt(dx * dx + dy * dy)
    return distance < (loop_obstacle_radius + obstacle_radius)
}


// DONE
function pick_obstacle(){
	const canvas = document.getElementById("game_window");
	canvas.height
	const obstacle_assets = [
		{ src: "main/assets/obstacles/big_tree_1.png", width: (canvas.width * 0.12), height: (canvas.height * 0.16) },
		{ src: "main/assets/obstacles/big_tree_2.png", width: (canvas.width * 0.12), height: (canvas.height * 0.16) },
		{ src: "main/assets/obstacles/bush_1.png", width: (canvas.width * 0.08), height: (canvas.height * 0.08) },
		{ src: "main/assets/obstacles/bush_2.png", width: (canvas.width * 0.08), height: (canvas.height * 0.08 )},
		{ src: "main/assets/obstacles/log_1.png", width: (canvas.width * 0.10), height: (canvas.height * 0.06) },
		{ src: "main/assets/obstacles/log_2.png", width: (canvas.width * 0.10), height: (canvas.height * 0.06) },
		{ src: "main/assets/obstacles/rock_1.png", width: (canvas.width * 0.06), height: (canvas.height * 0.05) },
		{ src: "main/assets/obstacles/rocks_2.png", width: (canvas.width * 0.07), height: (canvas.height * 0.05) },
		{ src: "main/assets/obstacles/sign_1.png", width: (canvas.width * 0.07), height: (canvas.height * 0.10) },
		{ src: "main/assets/obstacles/sign_2.png", width: (canvas.width * 0.07), height: (canvas.height * 0.10) },
		{ src: "main/assets/obstacles/small_tree.png", width: (canvas.width * 0.09), height: (canvas.height * 0.12) },
		{ src: "main/assets/obstacles/snowman.png", width: (canvas.width * 0.08), height: (canvas.height * 0.12) },
		{ src: "main/assets/obstacles/tree_1.png", width: (canvas.width * 0.12), height: (canvas.height * 0.17) },

	];
	return obstacle_assets[Math.floor(Math.random() * obstacle_assets.length)];
}

//  done?
export function obstacle_generator(difficulty,score,player,loaded_obstacles){
	// Temp
	// canvas = document.getElementById("game_window")
	// ctx = canvas.getContext("2d")

	// Randomly generate obstacles, that scale with score and difficulty, and then completes the checks to see if any bump into each other
	let obstacle_count
	let obstacles = []
	if (difficulty === "blizzard"){
		// Hard difficulty
		obstacle_count = Math.floor(Math.random()*(score*0.06)+3)
	}else if (difficulty === "flurry"){
		// Medium difficulty
		obstacle_count = Math.floor(Math.random()*(score*0.04)+2)
	}else{
		obstacle_count = Math.floor(Math.random()*(score*0.02)+1)
	}
	for (let i= 0;i < obstacle_count+1;i++){
		let placed_object_bool = false
		let attempts = 0
		while (placed_object_bool === false && attempts < 50){
			// Math.random() * (canvas.width - 50);
			let obstacle = pick_obstacle()
			let radius = Math.max(obstacle.width, obstacle.height) * 0.5
			let obstacle_X = Math.random()*canvas.width
			let obstacle_Y = (Math.random()*canvas.height)+canvas.height
			let obstacle_colliosn = obstacles.some(loop_obstacle_ => {
				return check_obstacle_collion(loop_obstacle_.x,loop_obstacle_.y,loop_obstacle_.radius,obstacle_X,obstacle_Y,radius)
			}) 
			if (!obstacle_colliosn){
				obstacles.push(new Obstacle(obstacle_X, obstacle_Y,obstacle.src,obstacle.width,obstacle.height,radius,obstacle,loaded_obstacles[obstacle]));
				placed_object_bool = true
			}
		
		}

	}
	console.log(obstacles)
	return obstacles
	
}


// Undone
export function collision_detection(player, obstacle){ 
    if (player.x === obstacle.x && player.y === obstacle.y && player.life_item_bool === false){
        return "dead";
    } 
    else if (player.x === obstacle.x && player.y === obstacle.y && player.life_item_bool === true){
        return "saved";
    }
}


// Mostly done
export function item_selection_menu(player_item_dict){
	/** Displays the item selection menu during the game (in the core game)

    Args:
		username (str*) :  The current items of the player

    Returns:
        Selected item (str)
	*/

	// Getting canvas
	canvas = document.getElementById("game_window")
	console.log(canvas)
	ctx = canvas.getContext("2d")
	


	// Display the item selection menu, allowing the player to choose which items to 

	//Draw a grey round rectangle as the background for the item selection menu
	// It will leave a border around the edge of the canvas (to see score and the items) and be centered 
	ctx.fillStyle = "#343a40";
	ctx.font = '40px "Jersey 10"';
	ctx.beginPath();
	ctx.roundRect(canvas.width * 0.05, canvas.height * 0.05, canvas.width * 0.9, canvas.height * 0.9, 20);
	ctx.fill();
	// Display the 2 potential items and their descriptions, rarity and icons
	
	for(let i;i<2;i++){
		let random_num = Math.floor(Math.random() * items.length)
		ctx.fillStyle = "white"; // White
		// Name
		ctx.fillText(item_dict[random_num].fetch_name(),canvas.width / 4,canvas.height * 0.1)
		// Description
		ctx.fillText(item_dict[random_num].fetch_description(),canvas.width / 4,canvas.height * 0.1)
		// Url for image
		let url = [random_num].fetch_url()
		// Create image
		
	}
	
	// Display text to display the skip option, what to press to fill the slot and the OR seperator to make it clear to the user that its a choice.
	let random_slot_1 = Math.floor(Math.random() * 5)+1
	let random_slot_2 = Math.floor(Math.random() * 5)+1
	ctx.fillStyle = "white"; // Reset back to white for the info
	ctx.fillText(`Press Q to fill slot ${random_slot_1}`, canvas.width / 2, canvas.height * 0.1);
	ctx.fillText("OR", canvas.width / 2, canvas.height * 0.5);
	ctx.fillText(`Press E to fill slot ${random_slot_2}`, canvas.width / 2, canvas.height * 0.9);
	ctx.fillText("Press L to Pass",canvas.width / 2, canvas.height * 0.8)

	if (action === 'slotQ' || action === 'slotE' || action === 'pass') {
		return { next_state: 'game' };
	}

	return {next_state : 'item_menu' };
}

// Changed line of thinking for effiency, will instead move the screen for it to make relative sense

export function handle_spawning(difficulty, score, player,loaded_obs) {
    spawn_timer++;
    if (spawn_timer > 60) { // every ~600 frames
        let new_obstacles = obstacle_generator(difficulty, score, player,loaded_obs);
        spawn_timer = 0;
		return new_obstacles
    }
	return []
}

export function item_menu_timer(score,player) {
	if (player_score_change = true){
		
	}
    if (score % 500) { // every ~2 mins 
        item_selection_menu()
    }
}

// Player Functions


export function ski_calculate(player){
	// Fix ranges to relfect actual
	let player_angle = player.get_angle()
	// Convert to radians (just got tested on this in maths lol)
	const rad = player_angle * Math.PI / 180;
	let ski_seperation = Math.abs(Math.sin(rad));
	// Just got lucky (put 20 px in and it made my code work so converted to width measurement so if aint broke dont fix it)
	return ski_seperation+canvas.width * 0.01
}

export function move(player,key,camera){
	// Ai + Marcel + Miles helped create this system, when discussing best practice optimising as well as the best movement option.
	if (key === "a"){
		player.turn_velocity -= player.turn_acceleration
	}
	else if (key ==="d"){
		player.turn_velocity += player.turn_acceleration
	}
	//Apply friction (smooth decay) 
    player.turn_velocity *= player.friction

    // Clamp turning speed (ensure that it doesnt go over the velocity set)
    if (player.turn_velocity > player.max_turn_velocity) player.turn_velocity = player.max_turn_velocity;
    if (player.turn_velocity < -player.max_turn_velocity) player.turn_velocity = -player.max_turn_velocity;

    //Apply rotation to the player angle
	player.character_angle += player.turn_velocity
	const maxAngle = Math.PI / 4;

	if (player.character_angle > maxAngle) player.character_angle = maxAngle;
	if (player.character_angle < -maxAngle) player.character_angle = -maxAngle;

    // Move the camera through the world using trig functions
    let horizontal_change = Math.sin(player.character_angle) * player.base_speed
    let vertical_change = -Math.cos(player.character_angle) * player.base_speed
    camera.x += horizontal_change
    camera.y += vertical_change
}

// Done 
export function trail(previous_coords_array,new_coords,camera){
   	let trail_radius = 5
	let coords_array = previous_coords_array
	coords_array.unshift(new_coords)
	if (coords_array.length>=80){
		coords_array.pop()
	}
	for (let i = 0; i < coords_array.length; i++) {
		let current_array_x = coords_array[i][0];
		let current_array_y = coords_array[i][1];
		ctx.beginPath();
		let seperation = 20
 		let transperncy = 1-i*0.03
		ctx.fillStyle = `rgba(198, 236, 249, ${transperncy})`;
		ctx.arc(current_array_x - seperation - camera.x, current_array_y - camera.y, trail_radius, 0, 2 * Math.PI);
		ctx.fill();
		// Second Circle
		ctx.beginPath();
		ctx.arc(current_array_x+seperation - camera.x, current_array_y - camera.y, trail_radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	return coords_array
}


// Draw functions

export function screen_draw(obstacles,loaded_obstacles,camera){
	const canvas = document.getElementById("game_window");
	let ctx = canvas.getContext("2d")
	let background_color = "#dde7f0"
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let obstacle of obstacles) {
        // Skip if off‑screen
        if ((obstacle.y - camera.y) > canvas.height || (obstacle.y - camera.y) + obstacle.height < 0){
			continue;
		} 
        if ((obstacle.x - camera.x) > canvas.width || (obstacle.x - camera.x) + obstacle.width < 0){
			continue;
		}
		obstacle.img = obstacle.image || obstacle.img;
		if (obstacle.img) {
			ctx.drawImage(obstacle.img, (obstacle.x - camera.x), (obstacle.y - camera.y), obstacle.width, obstacle.height);
		}
    }
}


export function character_draw(sprite,player_angle,ski_seperation) {
    const canvas = document.getElementById("game_window");
    const ctx = canvas.getContext("2d");
	ctx.drawImage(sprite,(canvas.width/ 2)-(canvas.width * 0.12)/ 2,(canvas.height /2) -(canvas.height * 0.30) / 2,(canvas.width * 0.12), (canvas.height * 0.30))
}



export function ski_draw(player_angle, ski_separation, turn_velocity) {
    const canvas = document.getElementById("game_window");
    const ctx = canvas.getContext("2d");
    ctx.save();
	// Move to feet of player
    ctx.translate(canvas.width / 2, (canvas.height / 2) + (canvas.height * 0.30) * 0.3);
    ctx.rotate(player_angle);
    ctx.fillStyle = "red";
    //Left Ski
    ctx.beginPath();
    ctx.roundRect(
        (-ski_separation - canvas.width * 0.12 * 0.06 / 2), 		// x
		0,															// y
        (canvas.width * 0.12 * 0.06),								 // width
       ((canvas.height * 0.30) * 0.40)+(Math.max(0, -turn_velocity) * 120), //length
        (canvas.width * 0.12 * 0.06* 0.4)								//radius
    );
    ctx.fill();
    //Right Ski
    ctx.beginPath();
    ctx.roundRect(
        (+ski_separation - canvas.width * 0.12 * 0.06 / 2),         	 // x
        0	,															// y
       	(canvas.width * 0.12 * 0.06),									// width
        ((canvas.height * 0.30) * 0.40) +(Math.max(0, turn_velocity) * 120),//length
       	(canvas.width * 0.12 * 0.06* 0.4)								//radius
    );
    ctx.fill();
    ctx.restore();
}

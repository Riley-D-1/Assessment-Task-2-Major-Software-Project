// This file contains all of the core game logic 

// Audio related logic
// Done
import {Character,item,Obstacle} from "./classes.js";

let canvas = document.getElementById("game_window")
let ctx = canvas.getContext("2d")
// Apparently this works acrss files
export let spawn_timer = 0


// Obstacle Functions 


// Done?
export function check_obstacle_collion(loop_obstacle_x,loop_obstacle_y,loop_obstacle_radius,obstacle_x,obstacle_y,obstacle_radius){
    let dx = loop_obstacle_x - obstacle_x
    let dy = loop_obstacle_y - obstacle_y
	// OPtimised through removal of square root
	return (dx*dx + dy*dy) < (loop_obstacle_radius + obstacle_radius) ** 2

}


// DONE
function pick_obstacle(){
	const canvas = document.getElementById("game_window");
	canvas.height
	const obstacle_assets = [
		{ src: "../assets/obstacles/big_tree_1.png", width: (canvas.width * 0.08), height: (canvas.height * 0.19) },
		{ src: "../assets/obstacles/big_tree_2.png", width: (canvas.width * 0.075), height: (canvas.height * 0.18) },
		{ src: "../assets/obstacles/bush_1.png", width: (canvas.width * 0.05), height: (canvas.height * 0.10) },
		{ src: "../assets/obstacles/bush_2.png", width: (canvas.width * 0.055), height: (canvas.height * 0.105) },
		{ src: "../assets/obstacles/log_1.png", width: (canvas.width * 0.08), height: (canvas.height * 0.09) },
		{ src: "../assets/obstacles/log_2.png", width: (canvas.width * 0.075), height: (canvas.height * 0.085) },
		{ src: "../assets/obstacles/rock_1.png", width: (canvas.width * 0.05), height: (canvas.height * 0.06) },
		{ src: "../assets/obstacles/rock_2.png", width: (canvas.width * 0.055), height: (canvas.height * 0.065) },
		{ src: "../assets/obstacles/sign_1.png", width: (canvas.width * 0.06), height: (canvas.height * 0.10) },
		{ src: "../assets/obstacles/sign_2.png", width: (canvas.width * 0.06), height: (canvas.height * 0.10) },
		{ src: "../assets/obstacles/small_tree.png", width: (canvas.width * 0.065), height: (canvas.height * 0.13) },
		{ src: "../assets/obstacles/snowman.png", width: (canvas.width * 0.0425), height: (canvas.height * 0.10) },
		{ src: "../assets/obstacles/tree_1.png", width: (canvas.width * 0.075), height: (canvas.height * 0.16) },
	];
	return obstacle_assets[Math.floor(Math.random() * obstacle_assets.length)];
}

export function pick_items(){
	let items = [
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
	let choice_1 = items[Math.floor(Math.random() * items.length)]
	let choice_2 = items[Math.floor(Math.random() * items.length)]
	return [choice_1,choice_2]
}
//  done?
export function obstacle_generator(difficulty,score,player,loaded_obstacles,exisitng_obstacles){
	// Temp
	// canvas = document.getElementById("game_window")
	// ctx = canvas.getContext("2d")

	// Randomly generate obstacles, that scale with score and difficulty, and then completes the checks to see if any bump into each other
	let obstacle_count
	let obstacles = []
	let luck_factor = Math.max(1, player.obstacle_luck + 1)
	// prevents divide-by-zero and keeps scaling clean
	if (difficulty === "blizzard"){
		obstacle_count = Math.floor(Math.random()*(score*0.06)/luck_factor + 3);
	}else if (difficulty === "flurry"){
		obstacle_count = Math.floor(Math.random()*(score*0.04)/luck_factor + 2);
	}else{
		obstacle_count = Math.floor(Math.random()*(score*0.02)/luck_factor + 1);
	}
	for (let i= 0;i < obstacle_count+1;i++){
		let placed_object_bool = false
		let attempts = 0
		while (placed_object_bool === false && attempts < 50){
			attempts++;
			let obstacle = pick_obstacle()
			let radius = Math.max(obstacle.width, obstacle.height) * 0.5
			let obstacle_x = (player.x - ((canvas.width * 1.6) / 2)) + (Math.random() *  (canvas.width * 1.6))
			let obstacle_y = player.y + canvas.height + (Math.random() * canvas.height)
			// let obstacle_center_x = (obstacle_x + (obstacle.width / 2))
			// let obstacle_center_y = (obstacle_y + (obstacle.height / 2))
			let obstacle_colliosn =
				exisitng_obstacles.some(o =>check_obstacle_collion(o.x + o.width * 0.5,o.y + o.height * 0.5,Math.max(o.width, o.height) * 0.5,obstacle_x + obstacle.width * 0.5,obstacle_y + obstacle.height * 0.5,radius)) ||
				obstacles.some(o =>check_obstacle_collion(o.x + o.width * 0.5,o.y + o.height * 0.5,Math.max(o.width, o.height) * 0.5,obstacle_x + obstacle.width * 0.5,	obstacle_y + obstacle.height * 0.5,	radius));
			if (!obstacle_colliosn){
				const matched_image = loaded_obstacles.find(img => img && img.src.endsWith(obstacle.src.split('/').pop()));
				obstacles.push(new Obstacle(obstacle_x, obstacle_y, obstacle.src, obstacle.width, obstacle.height, radius, obstacle, matched_image));
				placed_object_bool = true
			}
		
		}

	}
	console.log(obstacles)
	return obstacles
	
}


// Undone
export function collision_detection(player, obstacle){ 
    const dx = player.x - (obstacle.x + (obstacle.size_x / 2))
    const dy = player.y - (obstacle.y + (obstacle.size_y / 2))
    const collision_radius =(player.radius || Math.min(canvas.width, canvas.height) * 0.017) +(ski_calculate(player) * 0.65 + canvas.width * 0.006)
    const obstacle_radius = (obstacle.radius || Math.max(obstacle.size_x, obstacle.size_y) * 0.5) * 0.55
    const distance = Math.hypot(dx, dy);
    if (distance < collision_radius + obstacle_radius) {
        if (!player.life_boolean || player.life_boolean === false) {
            return "dead";
        } else {
            player.life_boolean = false;
            console.log("Saved by life item!");
            return "saved";
        }
    }
}


// Changed line of thinking for effiency, will instead move the screen for it to make relative sense

export function handle_spawning(difficulty, score, player,loaded_ob,existing_obstacles) {
    spawn_timer++;
    if (spawn_timer > 60) { // every ~600 frames
        let new_obstacles = obstacle_generator(difficulty, score, player,loaded_ob,existing_obstacles);
        spawn_timer = 0;
		return new_obstacles
    }
	return []
}

// Player Functions


export function ski_calculate(player){
	// Fix ranges to relfect actual
	let player_angle = player.get_angle()
	let ski_seperation = Math.abs(Math.sin(player_angle));
	// Just got lucky (put 20 px in and it made my code work so converted to width measurement so if aint broke dont fix it)
	return (ski_seperation * 0.375) + canvas.width * 0.004
}

export function move(player,camera,pressedKeys){
	// Ai + Marcel + Miles helped create this system, when discussing best practice optimising as well as the best movement option.
	// Redone from orignal cause it didnt work and was awful to use
	let steer = 0;
	if (pressedKeys?.has("ArrowLeft") || pressedKeys?.has("a") || pressedKeys?.has("A")){
		steer += 1
	}
	if (pressedKeys?.has("ArrowRight") || pressedKeys?.has("d") || pressedKeys?.has("D")){
		steer -= 1	
	}
	// Turning
	player.turn_velocity += steer * player.turn_acceleration * (0.5 + player.speed * 0.02);
    player.turn_velocity *= player.friction;

    // clamp turn velocity
    if (player.turn_velocity > player.max_turn_velocity){
		player.turn_velocity = player.max_turn_velocity;
	}
    if (player.turn_velocity < -player.max_turn_velocity){
		player.turn_velocity = -player.max_turn_velocity
	} 

    player.heading += player.turn_velocity;

	// Keep the heading within the range of -π to π (-90 degrees to 90 degrees)
	const downhill = Math.PI / 2;
   	let relative = Math.max(-0.8, Math.min(0.8,( player.heading - downhill)));
    player.heading = downhill + relative;
	// Speed update
	player.speed += player.acceleration;
	const carve = Math.abs(relative);
	player.speed -= carve * carve * 0.08;
	player.speed = Math.max(0, player.speed);
	player.speed *= player.drag;
	player.speed = Math.min(player.speed, player.maxSpeed);
	// Edge grip and movement + velocity 
	player.edge_grip = Math.min(0.3, 0.08 + player.speed * 0.01);
    const targetVX = Math.cos(player.heading) * player.speed;
    const targetVY = Math.sin(player.heading) * player.speed;

    player.vx += (targetVX - player.vx) * player.edge_grip;
    player.vy += (targetVY - player.vy) * player.edge_grip;
	// Player, move and change 
	player.x += player.vx;
	player.y += player.vy;
	player.position = [player.x, player.y];
	player.character_angle = player.heading - downhill;
	player.lean += (relative - player.lean) * 0.2;
	//Move Camera
	camera.x = player.x - (canvas.width / 2);
	camera.y = player.y - (canvas.height / 2);
}

// Done 
export function trail(previous_coords_array,new_coords,ski_separation,camera,trail_angle) {
	let trail_radius = 2
	let coords_array = previous_coords_array
	coords_array.unshift([new_coords[0], new_coords[1]]);
	if (coords_array.length >= 400){
		coords_array.pop()
	}
	const sideways_x = Math.cos(trail_angle + Math.PI / 2)
	const sideways_y = Math.sin(trail_angle + Math.PI / 2)

	for (let i = 0; i < coords_array.length; i++) {
		let current_array_x = coords_array[i][0];
		let current_array_y = coords_array[i][1];
		let transperncy = Math.max(0, 1 - i * 0.03);
		ctx.beginPath();
		ctx.fillStyle = `rgba(255, 255, 255, ${transperncy})`
		// First Circle
		ctx.arc((current_array_x - camera.x) - (sideways_x * ski_separation), (current_array_y - camera.y) - (sideways_y * ski_separation), trail_radius, 0, 2 * Math.PI);
		ctx.fill();
		// Second Circle
		ctx.beginPath();
		ctx.arc((current_array_x - camera.x) + (sideways_x * ski_separation), (current_array_y - camera.y) + (sideways_y * ski_separation), trail_radius, 0, 2 * Math.PI);
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
			continue
		} 
        if ((obstacle.x - camera.x) > canvas.width || (obstacle.x - camera.x) + obstacle.width < 0){
			continue
		}
		obstacle.img = obstacle.image || obstacle.img;
		const draw_width = obstacle.width || obstacle.size_x || 0;
		const draw_height = obstacle.height || obstacle.size_y || 0;
		if (obstacle.img && draw_width && draw_height) {
			ctx.drawImage(obstacle.img, (obstacle.x - camera.x), (obstacle.y - camera.y), draw_width, draw_height);
		}
	}
}


export function character_draw(sprite) {
    const canvas = document.getElementById("game_window");
    const ctx = canvas.getContext("2d");
	ctx.drawImage(sprite,(canvas.width / 2) - ((canvas.width * 0.045) / 2),(canvas.height / 2) - (canvas.height * 0.11 / 2),canvas.width * 0.045,canvas.height * 0.11);
}



export function ski_draw(player_angle, ski_separation, turn_velocity) {
    const canvas = document.getElementById("game_window");
    const ctx = canvas.getContext("2d");
    ctx.save();
	// Move to feet of player
	ctx.translate(canvas.width / 2,(canvas.height / 2) + ((canvas.height * 0.11) * 0.26));
    ctx.rotate(player_angle);
    ctx.fillStyle = "red";
    //Left Ski
    ctx.beginPath();
	ctx.roundRect(
        (-ski_separation - (canvas.width * 0.12 * 0.02) / 2),				// x
        0,																	 // y
        (canvas.width * 0.12 * 0.02),										// width
        ((canvas.height * 0.11) * 0.40) + (Math.max(0, -turn_velocity) * 45), // length
        ((canvas.width * 0.12 * 0.02) * 0.4)								// radius
    );
    ctx.fill();
    //Right Ski
    ctx.beginPath();
	ctx.roundRect(
        (+ski_separation - (canvas.width * 0.12 * 0.02) / 2),				// x
        0,															 		// y
        (canvas.width * 0.12 * 0.02),								 		// width
        ((canvas.height * 0.11) * 0.40) + (Math.max(0, turn_velocity) * 45), // length
        ((canvas.width * 0.12 * 0.02) * 0.4)								// radius
    );
    ctx.fill();
    ctx.restore();
}

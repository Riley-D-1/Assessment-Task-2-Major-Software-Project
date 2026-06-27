// This file contains all of the core game logic 

// Audio related logic
// Done

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
function obstacle_generator(difficulty,score,player){
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
		while (attempts === false && attempts < 50){
			// Math.random() * (canvas.width - 50);
			let obstacle = pick_obstacle()
			let radius = Math.max(data.width, data.height) * 0.5
			let obstacle_X = Math.random()*canvas.width
			let obstacle_Y = (Math.random()*canvas.height)+canvas.height
			let obstacle_colliosn = false

			obstacles.forEach(obstacle_ =>{
				let ob_c =check_obstacle_collion(loop_obstacle_.width,loop_obstacle_.height,obstacle.width,obstacle.height)
				if (ob_c == true){
					obstacle_colliosn = true
					break
				}
			}) 
			if (obstacle_colliosn = false){
				obstacles.push(new Obstacle(obstacle_X, obstacle_Y,obstacle.src,obstacle.width,obstacle.height));
			}
		
		}

	}
	console.log(obstacles)
	return obstacles
	
}

// Not done
function obstacle_possible_maker(objects){
	//Loop through the objects and delete any that are too close to each other using a circle radius of the characters size


}

// Undone
function collision_detection(life_item_bool, obstacle){ 
	if (player_x == obstacle_x && player_y == obstacle_y && life_item_bool == false){
		return "dead"
	}else if (player_x == obstacle_x && player_y == obstacle_y && life_item_bool == true){
		// Remove the life item
		return "saved"
	}
}
// Mostly done
function item_selection_menu(player_item_dict){
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
		let item_rarity = item_dict[random_num].fetch_rarity()
		if (item_rarity == "Common"){
			ctx.fillStyle = "ced4da"; // Grey
		}else if (item_rarity == "Rare"){
			ctx.fillStyle = "228be6"; // Blue	
		}else if (item_rarity == "Epic"){
			ctx.fillStyle = "be4bdb"; // Purple ish
		}
		// Title and description
		ctx.fillText(item_dict[random_num].fetch_description(),canvas.width / 4,canvas.height * 0.1)
		ctx.fillText(item_dict[random_num].fetch_url(),canvas.width / 4, canvas.height * 0.1)
	}
	

	// Display text to display the skip option, what to press to fill the slot and the OR seperator to make it clear to the user that its a choice.
	
	//
	let random_slot_1 = Math.floor(Math.random() * 5)+1
	let random_slot_2 = Math.floor(Math.random() * 5)+1
	ctx.fillStyle = "white"; // Reset back to white for the info
	ctx.fillText(`Press Q to fill slot ${random_slot_1}`, canvas.width / 2, canvas.height * 0.1);
	ctx.fillText("OR", canvas.width / 2, canvas.height * 0.5);
	ctx.fillText(`Press E to fill slot ${random_slot_2}`, canvas.width / 2, canvas.height * 0.9);
	ctx.fillText("Press L to Pass",canvas.width / 2, canvas.height * 0.8)

	if (action === 'slotQ' || action === 'slotE' || action === 'pass') {
		return { nextState: 'game' };
	}

	return { nextState: 'item_menu' };
}

// Changed line of thinking for effiency, will instead move the screen for it to make relative sense

export function handle_spawning() {
    spawn_timer++;
    if (spawn_timer > 600) { // every ~600 frames
        obstacle_generator();
        spawn_timer = 0;
    }
}

export function handle_spawning(score) {
    if (spawn_timer % 500) { // every ~100 frames
        item_selection_menu()
    }
}

function handle_canvas_click(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
	if (
		(event.clientX - bounds.left) >= item.x &&
		(event.clientX - bounds.left) <= item.x + item.width &&
		(event.clientY - bounds.top) >= item.y &&
		(event.clientY - bounds.top) <= item.y + item.height
	) return "hit";
}

// Player Functions


// function player_sprite(){
// 	if (player_angle == 90){
// 		return "main/assets/character/front.png"
// 	}else if (player_angle == 90){
// 		return "main/assets/character/side_l.png"
// 	}else if (player_angle == 90){
// 		return "main/assets/character/side_r.png"
// 	}else{
// 		return "main/assets/character/front.png"
// 	}
// }

function ski_gap_calculate(player){
	// Fix ranges to relfect actual
	player.get_angle()
	if (player_angle == 90){
		let ski_seperation = 0.1
	}else if (player_angle == 180){
		let ski_seperation = 0.1
	}else{
		let ski_seperation = 0
	}
}

// Draw functions
export function screen_draw(obstacles){
	background_color = "#dde7f0"
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let obstacle of obstacles_array) {
		if (obstacle.y <= canvas.height){
			console.log("Skipped")
		}else{
			img = new Image();
			img.src = obstacle.src;
			ctx.drawImage(img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
		}
	}
	ski_draw()

}

function move(player,key){
	if (key === "A"){
		player.angle-1
	}
	else if (key ==="D"){
		player.angle+1
	}

}


function ski_draw(current_x,current_y,player_angle,ski_seperation){
	player.get
	x = current_x
	y = current_y
	// Save current canvas
	ctx.save(); 
	ctx.beginPath();
	// Rotate to player angle
	ctx.rotate(Math.PI / player_angle); 
	ctx.roundRect((x - ski_seperation), y, 10, 2);
	ctx.roundRect((x + ski_seperation), y, 10, 2);
	ctx.fill();
	// Restore to unrotated state
	ctx.restore()
}


function trail(previous_coords_array,new_coords){
   	let trail_radius = 1
	let coords_array = previous_coords_array
	coords_array.unshift(new_coords)
	coords_array.pop()
	for (let i = 0; i < length(coords_array); i++) {
		ctx.beginPath();
		let seperation = 0.1
 		let transperncy = 1/i 
		ctx.arc((current_array_x - seperation), current_array_y, trail_radius, 0, 2 * Math.PI);
		ctx.fill();
		// Second Circle
		ctx.beginPath();
		ctx.arc((current_array_x + seperation), current_array_y, trail_radius, 0, 2 * Math.PI);
		ctx.fillStyle = `rgb(198 236 249 / ${transperncy})`;
		ctx.fill();
}
}

// This file contains all of the core game logic 


// Audio related logic
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

function obstacle_generator(difficulty,score){
	// Temp
	canvas = document.getElementById("game_window")
	ctx = canvas.getContext("2d")

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
		Math.random() * (canvas.width - 50);
		let obstacle = pick_obstacle()
		let obstacle_X = Math.random()*canvas.width
		let obstacle_Y = (Math.random()*canvas.height)+canvas.height
		obstacles.push(new Obstacle(obstacle_X, obstacle_Y,obstacle.src,obstacle.width,obstacle.height));
	}
	console.log(obstacles)
	return obstacles
	
}

function collision_detection(life_item_bool){
	if (player_x == obstacle_x && player_y == obstacle_y && life_item_bool == false){
		return "dead"
	}else if (player_x == obstacle_x && player_y == obstacle_y && life_item_bool == true){
		// Remove the life item
		return "saved"
	}
}

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
	window.addEventListener('keydown', (event) => {
		if (event.key === 'Q') {
			
		}else if (event.key === 'E') {

		}else if (event.key === 'L') {
			//continue
			// Go back to the core gameplay
			
		}
	});

}

function move_obstacles(){

	let index = 0
	for(let i = obstacles_array.length; i >= 0; i--){
		obstacles_array[i].y = obstacles_array[i].y-Character.get_speed()
		obstacles_array[i].x = obstacles_array[i].x-Character.get_speed_x()
		index+=1
		if (obstacles_array[i].y > 0){
			obstacles_array.splice(i,1)
		}
	} 
	return new_obstacles_array
}






// Player Functions


function player_sprite(){
	if (player_angle == 90){
		return "main/assets/character/front.png"
	}else if (player_angle == 90){
		return "main/assets/character/side_l.png"
	}else if (player_angle == 90){
		return "main/assets/character/side_r.png"
	}else{
		return "main/assets/character/front.png"
	}
}

function ski_calculate(){
	// Fix ranges to relfect actual
	if (player_angle == 90){
		let ski_seperation = 0.1
	}else if (player_angle == 180){
		let ski_seperation = 0.1
	}else{
		let ski_seperation = 0
	}
}

// Draw functions
function screen_draw(obstacles){
	background_color = "#dde7f0"
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let obstacle of obstacles_array) {
		if (obstacle.y <= canvas.height){
			console.log(Skipped)
		}else{
			img = new Image();
			img.src = obstacle.src;
			ctx.drawImage(img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
		}
	}

}



function ski_draw(current_x,current_y,player_angle,ski_seperation){
	x = current_x
	y = current_y
	ctx.beginPath();
	ctx.rect((x - ski_seperation), y, 10, 2);
	ctx.rect((x + ski_seperation), y, 10, 2);
	ctx.fill();
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

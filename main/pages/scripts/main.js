// Initialisation function
function start_game(){
	// Get username
	username = sessionStorage.getItem("username")
	previous_coords_array = []
	for(let i =0; i< 50 ;i++)
		previous_coords_array.unshift(starting_pos)
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

	item_dict
}


// General  Helpful Functions
function resizeGameCanvas() {
	// Resize canvas 
    const canvas = document.getElementById("game_window");
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("load", () => {
	// Call resize function on load
    resizeGameCanvas();
	console.log("loaded")
	// Play menu music
    if (sessionStorage.getItem("audioReady")) {
        const audio = document.getElementById("menu_music");
		audio.loop = true;
		audio.volume = 1;
        audio.play();
		console.log("music playeing")
    }
});

// Check for resize and call rewsize function if canvas size changes
window.addEventListener("resize", resizeGameCanvas);

// Classes
class Character{
    constructor(character_angle,speed,item_dict,score) {
		this.position = [0,0];
		this.character_angle = direction;
		this.speed = speed;
		this.item_dict = item_dict;
		this.score = score
  	}
	check_speed(){
	return this.speed
	}
	add_item(item){
		this.item_dict.push(item)
	}
	
}

class obstacle{
	constructor(postion,size_x,size_y) {
		this.position = [0,0];
		this.size_x =  size_x
		this.size_y = size_y
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
}

class luck_item extends item{
    constructor(rarity,description,icon_path) {
    super(rarity,description,icon_path);
  }
}

class mobility_item extends item{
    constructor(rarity,description,icon_path) {
    super(rarity,description,icon_path);
  }
}

// Functions

// General helpful functions
//ctx.clearRect(0, 0, canvas.width, canvas.height);

// Menu functions
function inbetween_menu(username,unlocked_items){
	// Temp
	canvas = document.getElementById("game_window")
	console.log(canvas)
	ctx = canvas.getContext("2d")
	
	//Grab the unlocked items
	//const unlockedItems = await get_user_items()


	// Font styling 
	ctx.textAlign = "center";
	ctx.font = '40px "Jersey 10"';
	ctx.fillStyle = '#000000';
	ctx.textBaseline = 'middle';
	// Draw the character
	character_draw(canvas.width / 2-(canvas.width * 0.25), canvas.height * 0.06, canvas.width * 0.4, canvas.height * 0.9, "../../main/assets/character/front.png", ctx)

	ctx.fillText(username, canvas.width *.45, canvas.height * 0.9);
	// Draw the button
	ctx.beginPath();
	// (x, y, width, height, radii)
	ctx.roundRect(canvas.width * 0.78, canvas.height * 0.85, canvas.width * 0.2, canvas.height * 0.1, canvas.width * 0.015);

	// Style the outline (no fill)
	ctx.strokeStyle = '#000000'; // Button border color
	ctx.lineWidth = 3;           // Border thickness
	ctx.stroke();

	// Add text to the button

	random_saying = ["Send it →", "Good Luck! →", "Have Fun! →", "Don't Crash! →", "Ski Fast! →", "Last Lap, Best Lap →", "Ride the chair →", "Drop in →", "Remember to have fun! →", "Ski you later! →"]
	ctx.fillText(random_saying[Math.floor(Math.random() * random_saying.length)], canvas.width * 0.78+(canvas.width * 0.2/2),canvas.height * 0.85+(canvas.height * 0.1/2));



	// Difficulty 
	ctx.fillText("Difficulty", canvas.width * 0.005 + ( canvas.width * 0.125/2),canvas.height*0.03)
	// Difficulty Selector
	let selecrted_difficulty = null
	let difficulty_rects = []
	for (let i = 0; i < 3; i++) {		
		ctx.beginPath();
		// (x, y, width, height, radii)
		ctx.roundRect(canvas.width * 0.005, canvas.height * 0.08 + i * (canvas.height * 0.12), canvas.width * 0.125, canvas.height * 0.08, canvas.width * 0.005);
		difficulty_rects.push({ x: (canvas.width * 0.005), y: (canvas.height * 0.08 + i * (canvas.height * 0.12)), width: (canvas.width * 0.125), height: (canvas.height * 0.08) })
		if(i === 0){
			ctx.strokeStyle = '#2f9e44'
			if (selecrted_difficulty == "bluebird" || selecrted_difficulty === null) {
				ctx.fillStyle = '#b2f2bb';
			}else{
				ctx.fillStyle = '#ffffff'
			}
		}else if (i === 1){
			ctx.strokeStyle = '#1971c2'
			if (selecrted_difficulty == "flurry") {
				ctx.fillStyle = '#a5d8ff';
			}else{
				ctx.fillStyle = '#ffffff'
			}
		}else if (i === 2){
			ctx.strokeStyle = '#000000';
			if (selecrted_difficulty == "whiteout") {
				ctx.fillStyle = '#868e96';
			}else{
				ctx.fillStyle = '#ffffff'
			}
		}else{
			console.log("Error")
		}
		ctx.lineWidth = 3;
		ctx.stroke()		
		ctx.fill();
		ctx.closePath()
	}
	// CTX 
	// Reset text size

	let content = ""
	for (let i = 0; i < 3; i++) {
		if(i === 0){
			ctx.fillStyle = '#2f9e44'
			content = "Bluebird"
		}else if (i === 1){
			ctx.fillStyle = '#1971c2'
			content = "Flurry"
		}else if (i === 2){
			ctx.fillStyle = '#000000';
			content = "Blizzard"
		}
		//rectX+(rectWidth/2),rectY+(rectHeight/2)

		ctx.fillText(content,canvas.width * 0.005 + ( canvas.width * 0.125/2),canvas.height * 0.08 + i * (canvas.height * 0.12)+(canvas.height * 0.08/2))
	}

	// Draw items grid

	ctx.fillStyle = '#000000';
	// Items heading 
	ctx.fillText ("Starting Item Selection",canvas.width * 0.78+(canvas.width * 0.2/2),canvas.height*0.03)
	// Source links for sample grid images
	const image_urls = [
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
	const owned_items_url = image_urls.filter(url => unlocked_items.includes(url));
	while (owned_items_url.length < image_urls.length){
		owned_items_url.push("../assets/items/locked_item.png")
	}

	item_grid = []
	owned_items_url.forEach((url, index) => {
		const img = new Image();
		img.src = url;
		img.onload = () => {
			// Render the image onto the context
			//Img,  X, Y, Image Width, Image Height
			ctx.drawImage(img, (canvas.width * 0.7 + index % 4 * (canvas.width * 0.08)), (canvas.height * 0.12 +Math.floor(index / 4)*(canvas.height*0.15)), (canvas.width * 0.06), ( canvas.height * 0.14));
			console.log(url)
			item_grid.push({src: url, x: (canvas.width * 0.7 + index % 4 * (canvas.width * 0.08)), y: (canvas.height * 0.12 +Math.floor(index / 4)*(canvas.height*0.15)), width: (canvas.width * 0.06), height: ( canvas.height * 0.14) })
		};
	});
	console.log(item_grid)
	// Do corresponding click action
	canvas.addEventListener('click', function(event) {
		console.log("kachow")
		const bounds = canvas.getBoundingClientRect();
		for (let i = item_grid.length - 1; i >= 0; i--) {
   		 	const item = item_grid[i];
			if (
			(event.clientX - bounds.left) >= item.x &&
			(event.clientY - bounds.top) <= item.x + item.width &&
			(event.clientY - bounds.top) >= item.y &&
			(event.clientY - bounds.top) <= item.y + item.height
			) {
				alert(`Clicked inside ${item.src}`);
				// Draw a rectangle around the item.
				

			}
			
		}
		// Check clicks for 
		for (let i = difficulty_rects.length - 1; i >= 0; i--){
			if(
			(event.clientX - bounds.left) >= difficulty_rects.x &&
			(event.clientY - bounds.top) <= difficulty_rects.x + difficulty_rects.width &&
			(event.clientY - bounds.top) >= difficulty_rects.y &&
			(event.clientY - bounds.top) <= difficulty_rects.y + difficulty_rects.height	
			)
		}
			
		
	});

}

function item_selection_menu(player_item_dict){
	
	// Temp
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

function end_screen(score_,){
	canvas = document.getElementById("game_window")
	ctx = canvas.getContext("2d")
	ctx.globalAlpha =1;
	ctx.imageSmoothingEnabled = false;
	ctx.textAlign = "center";
	ctx.textBaseline = 'middle';

	// Title font
	ctx.font = "100px 'Jersey 10'";
	ctx.fillStyle = "#e03131";
	ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 20);
	// Regular font
	ctx.font = "60px 'Jersey 10'";
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = '#bbbbbb';
	ctx.lineWidth = 4;
	// Score, info + highscore Box 

	// Score Rounded box
	ctx.beginPath();
	// X, y , width , height, rounding
	ctx.roundRect(canvas.width * 0.5, canvas.height * 0.15, canvas.width * 0.49, canvas.height * 0.3, canvas.width * 0.015);
	ctx.stroke()
	ctx.closePath()

	ctx.fillStyle = "#000000";
	ctx.fillText("Stastics",canvas.width * 0.5+(canvas.width * 0.45/2),canvas.height * 0.2)

	//temp scores and stats
	let high_score_ = 1100
	let obstacles_spawned = 2
	let item_count = 1
	// Statistics
	ctx.font = "50px 'Jersey 10'";
	ctx.textAlign = "left";
	//+(canvas.width * 0.45/4)
	ctx.fillText(`Score: ${score_}`, canvas.width * 0.8, canvas.height * 0.35);
	ctx.fillText(`High Score: ${high_score_}`, canvas.width * 0.51, canvas.height * 0.35);
	
	ctx.fillText(`Obstacles Dodged: ${high_score_}`, canvas.width * 0.51, canvas.height * 0.25);
	ctx.fillText(`Items: ${item_count}`, canvas.width * 0.8, canvas.height * 0.25);	


	// Use a function to draw the item bar
	//draw_item_bar(x,y)
	ctx.textAlign = "center";
	ctx.fillText("You've unlocked:",canvas.width * 0.69, canvas.height * 0.6)

	// Draw all unlocked items from the run
	// temp testing 
	unlocked_items = [""]

	//rectX+(rectWidt



	
	// Red Round Rectangle button (Return to menu)
	ctx.strokeStyle = '#e03131';
	ctx.fillStyle = "#e03131";
	ctx.beginPath();

	// X, y , width , height, rounding
	ctx.roundRect(canvas.width * 0.78, canvas.height * 0.78, canvas.width * 0.2, canvas.height * 0.12, canvas.width * 0.015);
	ctx.stroke()
	ctx.closePath()
	//rectX+(rectWidth/2),rectY+(rectHeight/2)
	ctx.fillText("Main Menu", canvas.width * 0.78 +(canvas.width * 0.2 /2), canvas.height * 0.78+(canvas.height * 0.12/2));
	const end_image = new Image();
	end_image.src = "../assets/skis_end_screen.png";
	end_image.addEventListener("load", (e) => {
		ctx.drawImage(end_image, canvas.width*0.001, canvas.height*0.12, canvas.width*0.4, canvas.height*0.95);
	});

	canvas.addEventListener('click', function(event) {
	const bounds = canvas.getBoundingClientRect();

	// Check for a collision
	if (
		(event.clientX - bounds.left) >= canvas.width * 0.78 &&
		(event.clientY - bounds.top) <= canvas.width * 0.78 +  canvas.width * 0.2 &&
		(event.clientY - bounds.top) >= canvas.height * 0.78 &&
		(event.clientY - bounds.top) <= canvas.height * 0.78 + canvas.height * 0.12
		) {
		alert("Clicked inside:");
		// Perform your custom action here
		}
	});
}

// UI functions
function draw_item_bar(item_dict){
	// Items
	// Draw a light grey round rectangle as the background for the item icons
	ctx.fillStyle = "lightgrey";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.roundRect(canvas.width - (canvas.width * 0.15), 10, canvas.width * 0.1, 40, 10);
	ctx.stroke();
	for (let i = 0; i < item_dict.length; i++) {
		let item = item_dict[i];
		let img = new Image();
		img.src = item.fetch_icon();
		ctx.drawImage(img, 10 + (i * 40), 10, 30, 30);
	}
}

function ui_draw(score_, item_dict){

	// Score
	ctx.textAlign = "center";
	ctx.fillStyle = "black";
	ctx.font = "20px Arial";
	ctx.fillText(`Score: ${score_}`, canvas.width - (canvas.width * 0.05), 30);
	draw_item_bar(item_dict)
}

// Gameplay screens

function screen_draw(){
	background_color = "#dde7f0"
	ctx.fillStyle = background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let obstacle of obstacles_array) {
		img = new Image();
		img.src = "main/assets/obstacle.png";
		ctx.drawImage(img, obstacle.x, obstacle.y, 10, 10);
	}
}

function item_select_game(){
	// Temp 	
	canvas = document.getElementById("game_window")
	console.log(canvas)
	ctx = canvas.getContext("2d")
	ctx.beginPath()
	ctx.roundRect(x,y,canvas.width*0.8,height*0.7,)
	ctx.fill()
	item_1 = items[Math.floor(Math.random() * items.length)]
	item_2 = items[Math.floor(Math.random() * items.length)]
	// Draw the images 

}


// Obstacle Functions


function pick_obstacle_type(){
	const types = []
	return types[Math.floor(Math.random() * types.length)];
}

function obstacle_generator(difficulty,score){
	// Randomly generate obstacles, that scale with score and difficulty, and then completes the checks to see if any bump into each other
	let obstacle_count
	if (difficulty === ""){
		// Hard difficulty
		obstacle_count = Math.floor(Math.random()*(score*0.06))
	}else if (difficulty === ""){
		// Medium difficulty
		obstacle_count = Math.floor(Math.random()*(score*0.04))
	}else{
		obstacle_count = Math.floor(Math.random()*(score*0.02))
	}
	//for (i;i <obstacle_count){
	Math.random() * (canvas.width - 50);
	obstacles.push(new Obstacle(randomX, -canvas.height - 20));
	//}

	
}

function collision_detection(life_item_bool){
	if (player_x == obstacle_x && player_y == obstacle_y && life_item_bool == false){
		end_screen()
	}else if (player_x == obstacle_x && player_y == obstacle_y && life_item_bool == true){
		// Remove the life item
		return "saved"
	}
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


function character_draw(x,y,width,height,current_sprite_dir,ctx){
	const image = new Image();
	image.src = current_sprite_dir;
	image.addEventListener("load", (e) => {
		ctx.drawImage(image, x, y, width, height)
	});	
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

// Other Functions
function end_game(player_item_dict, unlocked_items){
 	// Check for new items and save them to supabase, then return to inbetweenmenu
	for (item_ in player_item_dict){
		//if item_  in unlocked_items == False{
		//}
		//await save_item("item")
	}
}

function play_music(){
	if (stage === "game"){
    	let audio = new Audio('../../music/assets.ogg')
	}else{
		let audio = new Audio('../../music/assets.ogg')
	}
    audio.play()
}

// Game Loop
function main(){
	// Wait for fonts to load
	document.fonts.ready.then(() => {
    
	});
	
}




// Test Functions

function run_test(){
	// Setup logic here:

	console.log("game is running")
}

function trail_test(){
	const mousePos = getMousePos(canvas, event);
	trail(previous_coords_array, [mousePos.x, mousePos.y])
	// Test the trail function by simulating a character movement and checking if the trail is drawn correctly.
}


function ski_test(){
	/// Test the ski angle calcs and draw the skis 
}

function inbetween_menu_test(){
	// Test the inbetween menu  checking if the menu is displayed correctly.
	inbetween_menu("Test User",["../assets/items/medkit.png"])
}

function end_screen_test(){
	// Test the end screen by simulating the end of the game and checking if the end screen is displayed correctly.
	end_screen(100)

}

function obstacble_ui_test(){
	let test_item_dict = [new item("Medkit","Common","main/assets/items/heart.png"), new item("Coin","Rare","main/assets/items/coin.png")]
	let test_score = 100
	// Test the obstacle and UI by simulating the generation of obstacles + having items and checking if they are displayed correctly.
	ui_draw(100, test_item_dict)
	obstacle_generator()

}

function  item_select_game_test(){
	item_selection_menu({})
}
// Initialisation 
// Start Music
window.addEventListener("load", () => {
	console.log("loaded")
    if (sessionStorage.getItem("audioReady")) {
        const audio = document.getElementById("menu_music");
		audio.loop = true;
		audio.volume = 1;
        audio.play();
		console.log("music playeing")
    }
});
score_ = 0 
starting_pos = [0,0]
character_angle = 0 
previous_coords_array = []
for(let i =0; i> 50 ;i++)
	previous_coords_array.unshift(starting_pos)
document.getElementById("myDropdown").disabled = true;
const assets = [
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

// Classes
class Character{
    constructor(postion,direction,speed,item_dict) {
		this.position = postion;
		this.direction = direction;
		this.speed = speed;
		this.item_dict = item_dict;
  	}
	check_speed(){
	return this.speed
	}
	add_item(item){
		this.item_dict.push(item)
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
class Luck_item extends item{
    constructor(rarity,description,icon_path) {
    super(rarity,description,icon_path);
  }
}
class Mobility_item extends item{
    constructor(rarity,description,icon_path) {
    super(rarity,description,icon_path);
  }
}

// Functions
function inbetween_menu(){
	document.getElementById("myDropdown").disabled = false;
	character_draw(25, 25, "main/assets/character/front.png")

}


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


function obstacle_generator(){
	if (random_generator == 0){
		let random_asset_path = assets[Math.floor(Math.random() * assets.length)];
		obstacles_array.push({x: Math.floor(Math.random() * 24), y: 0})
	}
}
//24 lanes (width of player is 2 lanes)* (Needs to be accurate)
// OBstacle system will remove lanes and if all have an obstacle

function collision_detection(life_item_bool){
	if (player_x == obstacle_x && player_y == obstacle_y && life_item_bool == false){
		end_screen()
	}
}



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

function character_draw(x,y,current_sprite_dir){
	ctx.fillRect(25, 25, x, y);
	/*
	img.src = 'image.jpg';
	const image = ;
	image.addEventListener("load", (e) => {
	// drawImage(image, x, y, width, height)
	ctx.drawImage(image, 10, 10);
	});
	*/
	
}

function ski_draw(current_x,current_y,player_angle,ski_seperation){
	x = current_x
	y = current_y
	ctx.beginPath();
	ctx.rect((x - ski_seperation), y, 10, 2);
	ctx.rect((x + ski_seperation), y, 10, 2);
	ctx.fill();
}

function end_screen(score_,){
	ctx.textAlign = "center";
	ctx.fillStyle = "red";
	ctx.font = "30px Arial";
	ctx.fillText("Game Over", canvas.width / 2, canvas.height - 50);
	ctx.fillText(`Score: ${score_}`, canvas.width / 2, canvas.height - 20);

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
function end_game(){
 	// Check for new items and save them to supabase, then return to inbetweenmenu
	
}
function play_music(stage){
	if (stage === "game"){
    	let audio = new Audio('../../music/assets.ogg')
	}else{
		let audio = new Audio('../../music/assets.ogg')
	}
    audio.play()
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

function end_screen_test(){
	// Test the end screen by simulating the end of the game and checking if the end screen is displayed correctly.
}


// Game Loop
function main(){
	
}
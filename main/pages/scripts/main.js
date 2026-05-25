// Initialisation 
score_ = 0 
starting_pos = [0,0]
character_angle = 0 
previous_coords_array = []
for(let i =0; i> 50 ;i++)
	previous_coords_array.unshift(starting_pos)

// Classes
class Character{
    constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
class item{
    constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
class life_item extends item{
    constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
class Luck_item extends item{
    constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
class Mobility_item extends item{
    constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
// Functions
function menu(){

}
function start_game(){

}

function tile_generator(){
	random_generator = Math.floor(Math.random() * 10);
	if (random_generator <= 0){

	}else if (random_generator <= 1){
		
	}
}


function player_sprite(){
	if (player_angle == 90){
		return "main/assets/character/front.png"
	}else if (player_angle == 90){
		return "main/assets/character/front.png"
	}else if (player_angle == 90){
		return "main/assets/character/front.png"
	}else{
		return "main/assets/character/front.png"
	}
}
function ski_calculate(){
	if (player_angle){
		let ski_seperation = 0.1
	}
}

function character_draw(x,y,current_sprite_dir){
	ctx.fillRect(25, 25, x, y);
	/*
	const image = ;
	image.addEventListener("load", (e) => {
	ctx.drawImage(image, 10, 10);
	});
	*/
	
}

function ski_draw(){

}

function end_screen(){
    
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

}
function play_music(stage){
	if (stage === "game"){
    	let audio = new Audio('../../music/assets.ogg')
	}else{
		let audio = new Audio('../../music/assets.ogg')
	}
    audio.play()
}

// Game Loop
function main(){
	
}
// Initialisation 
score_ = 0 

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
function start_game(){
    
}

function ski_calculate(){

}

function ski_draw(){

}

function end_screen(){
    
}

function end_game(){

}
function play_music(stage){
	if (stage === "game"){
    	const audio = new Audio('../../music/assets.ogg')
	}else{
    	const audio = new Audio('../../music/assets.ogg')
	}
    audio.play()
}

// Game Loop
function main(){

}